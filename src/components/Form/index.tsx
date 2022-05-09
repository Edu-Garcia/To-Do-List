import React, { useState } from 'react';
import { Button } from "../Button";
import { ITask } from '../../interfaces/ITask';
import './style.scss';

interface IForm {
  addTask: (title: string, description: string) => Promise<void>;
}

export const Form = ({ addTask }: IForm) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [task, setTask] = useState<ITask>({
    id: '',
    title: '',
    description: '',
    complete: false,
  });

  const newTask = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);

    e.preventDefault();

    const { title } = task;

    const description = task.description ? task.description : 'Sem descrição';

    await addTask(title, description);

    setTask({
      id: '',
      title: '',
      description: '',
      complete: false,
    });

    setIsLoading(false);
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
      <Button
        type="submit"
        disabled={isLoading}
      >
        {!isLoading ? 'Enviar' : 'Carregando...'}
      </Button>
    </form>
  );
}