import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import { List } from '.'
import '@testing-library/jest-dom';

describe('List Tasks Tests', () => {
  it('if you have an item in the list, show the list', () => {
    const mockTasks = [
      {
        id: '1',
        title: 'Tarefa 1',
        description: 'Descrição da tarefa 1',
        complete: false,
        user: null
      }
    ]

    const { container } = render(
      <BrowserRouter>
        <List
          tasks={mockTasks}
          completeTask={jest.fn()}
          deleteTask={jest.fn()}
          editTask={jest.fn()}
          pendingFilter={false}
          completeFilter={false}
        />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it('if you do not have any item in the list, show a text informing', () => {
    const { container } = render(
      <BrowserRouter>
        <List
          tasks={[]}
          completeTask={jest.fn()}
          deleteTask={jest.fn()}
          editTask={jest.fn()}
          pendingFilter={false}
          completeFilter={false}
        />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });
});