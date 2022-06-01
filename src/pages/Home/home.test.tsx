import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import { Home } from '.'
import '@testing-library/jest-dom';

describe('Home Test', () => {
  it('snapshot test home page', () => {
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });
})