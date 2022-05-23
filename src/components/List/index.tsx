import './style.scss';
import { ITask } from "../../interfaces/ITask";
import { Task } from "./Task";
import { useState } from 'react';
import { EditForm } from '../EditForm';

interface IList {
  tasks: ITask[];
  completeTask: (task: ITask) => void;
  deleteTask: (task: ITask) => void;
  editTask: (task: ITask) => void;
  pendingFilter: boolean;
  completeFilter: boolean;
}

export const List = ({
  tasks,
  completeTask,
  deleteTask,
  editTask,
  pendingFilter,
  completeFilter
}: IList) => {

  const [editSelect, setEditSelect] = useState<ITask | null>(null);

  let localTasks = tasks;

  if (pendingFilter) {
    localTasks = tasks.filter(task => !task.complete);
  }

  if (completeFilter) {
    localTasks = tasks.filter(task => task.complete);
  }

  return (
    (localTasks.length && (
      <ul>
        {localTasks.map(task =>
          editSelect?.id === task.id ? (
            <EditForm
              key={task.id}
              task={editSelect}
              setTask={setEditSelect}
              onSubmit={editTask}
            />
          ) : (
            <Task
              completeTask={completeTask}
              deleteTask={deleteTask}
              editTask={(task) => setEditSelect(task)}
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