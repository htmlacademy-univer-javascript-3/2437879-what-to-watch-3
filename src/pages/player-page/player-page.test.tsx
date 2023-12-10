import {describe} from 'vitest';
import PlayerPage from './player-page.tsx';
import {render, screen} from '@testing-library/react';
import {withHistory, withStore} from '../../mocks/mock-components.tsx';
import {makeFakeStore} from '../../mocks/mock-data.ts';

describe('Page: Player', () => {
  it('should render correct', () => {
    const withHistoryComponent = withHistory(<PlayerPage />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText('Exit')).toBeInTheDocument();
  });
});
