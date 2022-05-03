import { useEffect, useState } from 'react';
import './App.scss';
import { Button } from './components/Button';
import { Form } from "./components/Form";
import { List } from './components/List';
import { ITask } from './interfaces/ITask';
import api from './config/api';

const App = () => {

  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    api.get('todos/')
      .then(res => {
        console.log(res);
        setTasks(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const [pendingFilter, setPendantFilter] = useState<boolean>(false);
  const [completeFilter, setCompleteFilter] = useState<boolean>(false);

  const completeTask = async (completeTask: ITask) => {
    console.log(completeTask);

    await api.put(`todos/${completeTask.id}`, { complete: true })
      .then(() => {
        setTasks(tasks => tasks.map(task => ({
          ...task,
          complete: task.id === completeTask.id ? true : task.complete
        })));
      })
      .catch(err => console.log(err));
  }

  const deleteTask = async (deletedTask: ITask) => {
    await api.delete(`todos/${deletedTask.id}`)
      .then(() => setTasks(tasks => tasks.filter(task => task.id !== deletedTask.id)))
      .catch(err => console.log(err));
  }

  const deleteAll = async (tasks: ITask[]) => {

    tasks.forEach(async task => {
      await api.delete(`todos/${task.id}`)
        .then(result => console.log(result.status))
        .catch(err => console.log(err));
    })

    setTasks([]);
  }

  return (
    <div className="App">
      <div className="formContainer">
        <div>
          <h2>Adicione uma nova tarefa</h2>
          <Form setTasks={setTasks} />
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
