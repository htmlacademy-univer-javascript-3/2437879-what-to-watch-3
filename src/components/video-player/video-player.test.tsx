import {render, screen} from '@testing-library/react';
import VideoPlayer from './video-player';
import {makeFakeFilm} from '../../mocks/mock-data.ts';

describe('Component: VideoPlayer', () => {
  it('should render correct', () => {
    const mockFilm = makeFakeFilm();
    const activeFilm = mockFilm.id;

    render(<VideoPlayer promoFilm={mockFilm} activeFilm={activeFilm} isMuted />);

    expect(screen.getByTestId('video-player')).toBeInTheDocument();
  });
});
