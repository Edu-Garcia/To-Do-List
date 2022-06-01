import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import { Form } from '.'
import '@testing-library/jest-dom';

describe('Form Test', () => {
  it('snapshot test form component', () => {
    const { container } = render(
      <BrowserRouter>
        <Form addTask={jest.fn()} />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });
});