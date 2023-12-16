import {describe} from 'vitest';
import {withHistory, withStore} from '../../mocks/mock-components.tsx';
import {AuthorizationStatus, NameSpace} from '../../const.ts';
import {render, screen} from '@testing-library/react';
import UserBlock from './user-block.tsx';

describe('Component: UserBlock', () => {
  it('should render Sign in when user-slice not authorized', () => {
    const withHistoryComponent = withHistory(<UserBlock />);

    const {withStoreComponent} = withStore(withHistoryComponent, {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth, userImage: ''
      },
    });

    render(withStoreComponent);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should render Sign out when user-slice authorized', () => {
    const withHistoryComponent = withHistory(<UserBlock />);

    const { withStoreComponent } = withStore(withHistoryComponent, {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth, userImage: ''
      },
    });

    render(withStoreComponent);

    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
