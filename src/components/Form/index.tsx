import React from 'react';
import { Button } from "../Button";
import { ITask } from '../../types/task';
import { v4 as uuid } from 'uuid';
import './style.scss';

interface IForm {
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
}

export const Form = ({ setTasks }: IForm) => {

  const [task, setTask] = React.useState<ITask>({
    title: '',
    description: '',
    selected: false,
    finished: false,
    id: ''
  });

  const newTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, description } = task;

    const defaultDescription = 'Sem descrição';

    setTasks(tasks => [...tasks, {
      title,
      description: description || defaultDescription,
      selected: false,
      finished: false,
      id: uuid(),
    }]);

    setTask({
      title: '',
      description: '',
      selected: false,
      finished: false,
      id: ''
    });
  }

  return (
    <form onSubmit={newTask}>
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
      <Button type="submit">Enviar</Button>
    </form>
  );
}