import { useState } from 'react';
import './App.scss';
import { Button } from './components/Button';
import { Form } from "./components/Form";
import { List } from './components/List';
import { ITask } from './types/task';

const App = () => {

  const [tasks, setTasks] = useState<ITask[]>([]);

  const [pendantFilter, setPendantFilter] = useState<boolean>(false);
  const [finishedFilter, setFinishedFilter] = useState<boolean>(false);

  const finishTask = (finishedTask: ITask) => {
    setTasks(tasks => tasks.map(task => ({
      ...task,
      finished: task.id === finishedTask?.id ? true : task.finished
    })));

    console.log(finishedTask);
  }

  const deleteTask = (deletedTask: ITask) => {
    setTasks(tasks => tasks.filter(task => task.id !== deletedTask.id));
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
              setPendantFilter(!pendantFilter)
              setFinishedFilter(false)
            }}
            className={`filter${pendantFilter ? '-selected' : ''}`}
          >
            Filtrar Pendentes
          </Button>
          <Button
            onClick={() => {
              setFinishedFilter(!finishedFilter);
              setPendantFilter(false)
            }}
            className={`filter${finishedFilter ? '-selected' : ''}`}
          >
            Filtrar Concluídas
          </Button>
          <Button className="delete" onClick={() => setTasks([])}>Excluir todas</Button>
        </div>
        <div className="quantityContainer">
          <p><strong>Total de tarefas:</strong> {tasks.length}</p>
          <p><strong>Total de pendentes:</strong> {tasks.filter(task => !task.finished).length} </p>
          <p><strong>Total de concluídas:</strong> {tasks.filter(task => task.finished).length} </p>
        </div>
        <div className="list">
          <List
            tasks={tasks}
            finishTask={finishTask}
            deleteTask={deleteTask}
            pendantFilter={pendantFilter}
            finishedFilter={finishedFilter}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
