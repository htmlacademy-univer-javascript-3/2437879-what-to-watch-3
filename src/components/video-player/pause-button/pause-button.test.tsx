import {vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import PauseButton from './pause-button.tsx';

describe('Component: PauseButton', () => {
  it('should render correct', () => {
    const onClick = vi.fn;

    render(<PauseButton onClick={onClick} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
