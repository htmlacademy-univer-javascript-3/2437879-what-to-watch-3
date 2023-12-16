import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import ShowMoreButton from './show-more-button.tsx';
import userEvent from '@testing-library/user-event';

describe('Component: ShowMoreButton', () => {
  it('should render correct', () => {
    const mockOnClick = vi.fn();

    render(<ShowMoreButton onClick={mockOnClick} />);

    expect(screen.getByText('Show more')).toBeInTheDocument();
  });

  it('should call OnClick function when user-slice clicks ', async () => {
    const mockOnClick = vi.fn();

    render(<ShowMoreButton onClick={mockOnClick} />);

    await userEvent.click(screen.getByText('Show more'));

    expect(mockOnClick).toBeCalledTimes(1);
  });
});
