import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import { EditForm } from '.'
import '@testing-library/jest-dom';

describe('Edit form Test', () => {
  it('snapshot test edit form component', () => {

    const mockTask = {
      id: '1',
      title: 'Tarefa 1',
      description: 'Descrição da tarefa 1',
      complete: true,
      user: null
    }

    const { container } = render(
      <BrowserRouter>
        <EditForm
          task={mockTask}
          setTask={jest.fn()}
          onSubmit={jest.fn()}
        />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });
});