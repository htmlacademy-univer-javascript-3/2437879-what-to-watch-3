import {vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import PlayButton from './play-button.tsx';

describe('Component: PlayButton', () => {
  it('should render correct', () => {
    const onClick = vi.fn;

    render(<PlayButton onClick={onClick} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
