import FullScreenButton from './full-screen-button.tsx';
import {vi} from 'vitest';
import {render, screen} from '@testing-library/react';

describe('Component: FullScreenButton', () => {
  it('should render correct', () => {
    const onClick = vi.fn;

    render(<FullScreenButton onClick={onClick} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
