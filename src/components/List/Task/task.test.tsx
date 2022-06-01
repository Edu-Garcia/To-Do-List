import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import { Task } from '.'
import '@testing-library/jest-dom';

describe('Task Test', () => {
  it('snapshot test task uncompleted', () => {
    const mockTask = {
      id: '1',
      title: 'Tarefa 1',
      description: 'Descrição da tarefa 1',
      complete: false,
      user: null
    }

    const { container } = render(
      <BrowserRouter>
        <Task
          completeTask={jest.fn()}
          deleteTask={jest.fn()}
          editTask={jest.fn()}
          key={1}
          {...mockTask}
        />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it('snapshot test task completed', () => {
    const mockTask = {
      id: '1',
      title: 'Tarefa 1',
      description: 'Descrição da tarefa 1',
      complete: true,
      user: null
    }

    const { container } = render(
      <BrowserRouter>
        <Task
          completeTask={jest.fn()}
          deleteTask={jest.fn()}
          editTask={jest.fn()}
          key={1}
          {...mockTask}
        />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });
});