import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import { Login } from '.'
import '@testing-library/jest-dom';

describe('Login Tests', () => {
  it('snapshot test login page', () => {
    const { container } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });
});