import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import { Button } from '.'
import '@testing-library/jest-dom';

describe('Button Test', () => {
  it('snapshot test button component', () => {
    const { container } = render(
      <BrowserRouter>
        <Button>
          Teste
        </Button>
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });
});