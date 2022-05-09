import { useEffect, useState } from 'react';
import './App.scss';
import { Button } from './components/Button';
import { Form } from "./components/Form";
import { List } from './components/List';
import { ITask } from './interfaces/ITask';
import TodoService from './services/todo.service';

const App = () => {

  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    TodoService.todos()
      .then(tasks => setTasks(tasks))
      .catch(err => console.log(err))
  }, []);

  const [pendingFilter, setPendantFilter] = useState<boolean>(false);
  const [completeFilter, setCompleteFilter] = useState<boolean>(false);

  const addTask = async (title: string, description: string) => {
    const data = await TodoService.create(title, description);
    setTasks(tasks => [...tasks, data]);
  }

  const completeTask = async (completeTask: ITask) => {
    const status = await TodoService.update(completeTask.id)

    if (status === 204) {
      setTasks(tasks => tasks.map(task => ({
        ...task,
        complete: task.id === completeTask.id ? true : task.complete
      })));
    }
  }

  const deleteTask = async (deletedTask: ITask) => {
    const status = await TodoService.delete(deletedTask.id)

    if (status === 204) {
      setTasks(tasks => tasks.filter(task => task.id !== deletedTask.id))
    }
  }

  const deleteAll = async (tasks: ITask[]) => {

    tasks.forEach(async task => {
      await TodoService.delete(task.id)
    })

    setTasks([]);
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
          <Button className="delete" onClick={() => deleteAll(tasks)}>Excluir todas</Button>
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
            pendingFilter={pendingFilter}
            completeFilter={completeFilter}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
