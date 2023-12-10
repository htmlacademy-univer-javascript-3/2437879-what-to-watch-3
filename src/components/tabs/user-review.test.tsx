import {describe, expect} from 'vitest';
import {makeFakeComment} from '../../mocks/mock-data.ts';
import UserReview from './user-review';
import {render, screen} from '@testing-library/react';

describe('Component: UserReview', () => {
  it('should render correct', () => {
    const comment = makeFakeComment();

    render(<UserReview comment={comment} />);

    expect(screen.queryByText(comment.comment)).toBeInTheDocument();
    expect(screen.getByText(comment.user)).toBeInTheDocument();
  });
});
