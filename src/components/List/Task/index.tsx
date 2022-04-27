import './style.scss';
import { ITask } from "../../../types/task";
import { Button } from '../../Button';

interface PropsTask extends ITask {
  finishTask: (task: ITask) => void;
  deleteTask: (task: ITask) => void;
}

export const Task = (props: PropsTask) => {
  const { title, description, finished, finishTask, deleteTask } = props;

  return (
    <li className={finished ? 'selectedTask' : ''}>
      <div className="textContainer">
        <h3>{title}</h3>
        <span>{description}</span>
      </div>
      {!finished && (
        <Button onClick={() => finishTask(props)}>Concluir</Button>
      )}
      <Button className="delete" onClick={() => deleteTask(props)}>Excluir</Button>
    </li>
  );
}