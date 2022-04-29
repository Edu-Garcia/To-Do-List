import './style.scss';
import { ITask } from "../../interfaces/ITask";
import { Task } from "./Task";

interface IList {
  tasks: ITask[];
  completeTask: (task: ITask) => void;
  deleteTask: (task: ITask) => void;
  editTask: (task: ITask) => void;
  pendantFilter: boolean;
  completeFilter: boolean;
}

export const List = ({ tasks, completeTask, deleteTask, editTask, pendantFilter, completeFilter }: IList) => {

  let localTasks = tasks;

  if (pendantFilter) {
    localTasks = tasks.filter(task => !task.complete);
  }

  if (completeFilter) {
    localTasks = tasks.filter(task => task.complete);
  }

  return (
    (localTasks.length && (
      <ul>
        {localTasks.map(task => (
          <Task
            completeTask={completeTask}
            deleteTask={deleteTask}
            editTask={editTask}
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