import {describe, expect} from 'vitest';
import AddReviewPage from './add-review-page.tsx';
import {withHistory, withStore} from '../../mocks/mock-components.tsx';
import {render, screen} from '@testing-library/react';
import {makeFakeStore} from '../../mocks/mock-data.ts';
import userEvent from '@testing-library/user-event';

describe('Page: AddReview', () => {
  it('should render correct', () => {
    const withHistoryComponent = withHistory(<AddReviewPage />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText('Add review')).toBeInTheDocument();
    expect(screen.getByText('Post')).toBeInTheDocument();
  });

  it('should display entered text', async () => {
    const withHistoryComponent = withHistory(<AddReviewPage />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const mockText = 'Some review text';

    render(withStoreComponent);

    await userEvent.type(screen.getByTestId('comment'), mockText);

    expect(screen.getByDisplayValue(mockText)).toBeInTheDocument();
  });
});
