import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import { Register } from '.'
import '@testing-library/jest-dom';

describe('Register Tests', () => {
  it('snapshot test register page', () => {
    const { container } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });
});