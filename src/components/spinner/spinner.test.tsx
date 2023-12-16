import {render, screen} from '@testing-library/react';
import {expect} from 'vitest';
import Spinner from './spinner.tsx';

describe('Component: Spinner', () => {
  it('should render correct', () => {
    render(<Spinner />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
