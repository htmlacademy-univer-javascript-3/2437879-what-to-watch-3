import {render, screen} from '@testing-library/react';
import {expect} from 'vitest';
import Rating from './rating.tsx';

describe('Component: Rating', () => {
  it('should render correct', () => {
    const onChange = vi.fn();

    render(<Rating setRating={onChange} />);

    expect(screen.getAllByTestId('star')).toHaveLength(10);
  });
});
