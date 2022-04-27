import './style.scss';
import { ITask } from "../../types/task";
import { Task } from "./Task";

interface IList {
  tasks: ITask[];
  finishTask: (task: ITask) => void;
  deleteTask: (task: ITask) => void;
  pendantFilter: boolean;
  finishedFilter: boolean;
}

export const List = ({ tasks, finishTask, deleteTask, pendantFilter, finishedFilter }: IList) => {

  let localTasks = tasks;

  if (pendantFilter) {
    localTasks = tasks.filter(task => !task.finished);
  }

  if (finishedFilter) {
    localTasks = tasks.filter(task => task.finished);
  }

  return (
    (localTasks.length && (
      <ul>
        {localTasks.map(task => (
          <Task
            finishTask={finishTask}
            deleteTask={deleteTask}
            key={task.id}
            {...task}
          />
        ))}
      </ul>
    )) || (
      <div className="emptyList">
        <h2>Nenhuma tarefa encontrada</h2>
      </div>
    )
  );
}