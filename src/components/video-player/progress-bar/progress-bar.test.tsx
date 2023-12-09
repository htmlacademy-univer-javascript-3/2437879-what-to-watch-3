import { render, screen } from '@testing-library/react';
import ProgressBar from './progress-bar.tsx';
import { expect } from 'vitest';
import {getTimeLeft} from '../../../functions';

describe('Component: ProgressBar', () => {
  it('should render correct', () => {
    const duration = 3600;
    const currentTime = 60;
    const timeLeft = getTimeLeft(duration - currentTime);

    render(<ProgressBar duration={duration} currentTime={currentTime} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText(timeLeft)).toBeInTheDocument();
  });
});
