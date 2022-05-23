import { ITask } from "../../interfaces/ITask"
import { Button } from "../Button"

interface IEditFormProps {
  task: ITask,
  setTask: (task: ITask | null) => void,
  onSubmit: (task: ITask) => void,
}

export const EditForm = ({ task, setTask, onSubmit }: IEditFormProps) => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(task);

    setTask(null);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Adicione um título"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Descrição</label>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Adicione uma descrição"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
      </div>
      <div className="buttonsContainer" style={{ flexDirection: 'row' }}>
        <Button
          type="button"
          onClick={() => setTask(null)}
        >
          Cancelar
        </Button>
        <Button type="submit" className="edit">Alterar</Button>
      </div>
    </form>
  )
}