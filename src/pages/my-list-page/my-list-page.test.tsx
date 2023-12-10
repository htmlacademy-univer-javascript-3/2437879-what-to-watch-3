import {describe} from 'vitest';
import MyListPage from './my-list-page.tsx';
import {render, screen} from '@testing-library/react';
import {withHistory, withStore} from '../../mocks/mock-components.tsx';
import {makeFakeStore} from '../../mocks/mock-data.ts';

describe('Page: MyList', () => {
  it('should render correct', () => {
    const withHistoryComponent = withHistory(<MyListPage />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText('My list')).toBeInTheDocument();
  });
});
