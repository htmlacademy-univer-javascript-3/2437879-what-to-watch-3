import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import SetStar from './set-star';

describe('Component: Star', () => {
  it('should render correct', () => {
    const value = 5;
    const onChange = vi.fn();

    render(<SetStar value={value} onChange={onChange} />);

    expect(screen.getByLabelText(`Rating ${value}`)).toBeInTheDocument();
    expect(screen.getByRole('radio')).toBeInTheDocument();
    expect(screen.getByTestId('star')).toBeInTheDocument();
  });
});
