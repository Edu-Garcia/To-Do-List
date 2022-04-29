import './style.scss';
import { ITask } from "../../../interfaces/ITask";
import { Button } from '../../Button';

interface PropsTask extends ITask {
  completeTask: (task: ITask) => void;
  deleteTask: (task: ITask) => void;
  editTask: (task: ITask) => void;
}

export const Task = (props: PropsTask) => {
  const {
    title,
    description,
    complete,
    completeTask,
    deleteTask,
    editTask
  } = props;

  return (
    <li className={complete ? 'selectedTask' : ''}>
      <div className="textContainer">
        <h3>{title}</h3>
        <span>{description}</span>
      </div>
      {!complete && (
        <>
          <Button onClick={() => completeTask(props)}>Concluir</Button>
          <Button className="edit" onClick={() => editTask(props)}>Editar</Button>
        </>
      )}
      <Button className="delete" onClick={() => deleteTask(props)}>Excluir</Button>
    </li>
  );
}