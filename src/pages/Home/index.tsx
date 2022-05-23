import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './styles.scss';
import { Button } from '../../components/Button';
import { Form } from "../../components/Form";
import { List } from '../../components/List';
import { ITask } from '../../interfaces/ITask';
import { useAuth } from '../../contexts/AuthContext/useAuth';
import TaskService from '../../services/task.service';

export const Home = () => {

  const [tasks, setTasks] = useState<ITask[]>([]);
  const { token, user, signOut } = useAuth()

  useEffect(() => {
    TaskService.tasks(token)
      .then(tasks => setTasks(tasks))
      .catch(err => console.log(err))
  }, [token]);

  const [pendingFilter, setPendantFilter] = useState<boolean>(false);
  const [completeFilter, setCompleteFilter] = useState<boolean>(false);

  const addTask = async (title: string, description: string) => {
    try {
      const data = await TaskService.create(token, title, description);
      setTasks(tasks => [...tasks, data]);
      toast.success('Tarefa adicionada com sucesso!');
    } catch (error: any) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || 'Ocorreu um erro ao adicionar a tarefa!');
      }
    }
  }

  const completeTask = async (completeTask: ITask) => {
    try {
      const status = await TaskService.complete(token, completeTask.id)

      if (status === 200) {
        setTasks(tasks => tasks.map(task => ({
          ...task,
          complete: task.id === completeTask.id ? true : task.complete
        })));
      }
    } catch (error) {
      console.log(error);
      toast.error('Ocorreu um erro ao concluir a tarefa!');
    }
  }

  const deleteTask = async (deletedTask: ITask) => {
    try {
      const { data, status } = await TaskService.delete(token, deletedTask.id)

      console.log(data);

      if (status === 200) {
        setTasks(tasks => tasks.filter(task => task.id !== deletedTask.id))
        toast.success('Tarefa escluída com sucesso!');
      }
    } catch (error) {
      console.log(error);
      toast.error('Ocorreu um erro ao excluir a tarefa!');
    }
  }

  const editTask = async ({ id, title, description }: ITask) => {
    try {
      const { data, status } = await TaskService.update(token, id, title, description)

      console.log(data)

      if (status === 200) {
        setTasks(tasks => tasks.map(task => ({
          ...task,
          title: task.id === id ? title : task.title,
          description: task.id === id ? description : task.description
        })))
        toast.success('Tarefa editada com sucesso!');
      }
    } catch (error) {
      console.log(error);
      toast.error('Ocorreu um erro ao editar a tarefa!');
    }
  }

  const deleteAll = async () => {
    try {
      const { data, status } = await TaskService.deleteAll(token)

      console.log(data);

      if (status === 200) {
        setTasks([]);
        toast.success('Tarefas escluídas com sucesso!');
      }
    } catch (error) {
      console.log(error);
      toast.error('Ocorreu um erro ao excluir as tarefas!');
    }
  }

  return (
    <div className="App">
      <div className="formContainer">
        <div>
          <h2>Adicione uma nova tarefa</h2>
          <Form addTask={addTask} />
        </div>
      </div>
      <div className="tasksContainer">
        <div className='tasksHeader'>
          <h2>Bem vindo {user.name}!</h2>
          <Button
            className="delete"
            onClick={() => signOut()}
          >
            Encerrar sessão
          </Button>
        </div>
        <h2>Lista de tarefas</h2>
        <div className="buttonsContainer">
          <Button
            onClick={() => {
              setPendantFilter(!pendingFilter)
              setCompleteFilter(false)
            }}
            className={`filter${pendingFilter ? '-selected' : ''}`}
          >
            Filtrar Pendentes
          </Button>
          <Button
            onClick={() => {
              setCompleteFilter(!completeFilter);
              setPendantFilter(false)
            }}
            className={`filter${completeFilter ? '-selected' : ''}`}
          >
            Filtrar Concluídas
          </Button>
          <Button
            className="delete"
            onClick={() => deleteAll()}
          >
            Excluir todas
          </Button>
        </div>
        <div className="quantityContainer">
          <p>
            <strong>Total:</strong> {tasks.length}
          </p>
          <p>
            <strong>Pendentes:</strong> {tasks.filter(task => !task.complete).length}
          </p>
          <p>
            <strong>Concluídas:</strong> {tasks.filter(task => task.complete).length}
          </p>
        </div>
        <div className="list">
          <List
            tasks={tasks}
            completeTask={completeTask}
            deleteTask={deleteTask}
            editTask={editTask}
            pendingFilter={pendingFilter}
            completeFilter={completeFilter}
          />
        </div>
      </div>
    </div>
  );
}