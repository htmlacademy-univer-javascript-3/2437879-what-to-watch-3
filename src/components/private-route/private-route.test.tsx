import {beforeAll, beforeEach, describe} from 'vitest';
import {createMemoryHistory, MemoryHistory} from 'history';
import {withHistory, withStore} from '../../mocks/mock-components.tsx';
import {Route, Routes} from 'react-router-dom';
import PrivateRoute from './private-route.tsx';
import {AppRoute, AuthorizationStatus, NameSpace} from '../../const.ts';
import {render, screen} from '@testing-library/react';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push('/mylist');
  });

  it('should render component for public route, when user not authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.SignIn} element={<span>{expectedText}</span>} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute>
              <span>{notExpectedText}</span>
            </PrivateRoute>
          }
        />
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withStore(preparedComponent, {
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.NoAuth, userImage: '' },
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const notExpectedText = 'public route';
    const expectedText = 'private route';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.SignIn} element={<span>{notExpectedText}</span>} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute>
              <span>{expectedText}</span>
            </PrivateRoute>
          }
        />
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withStore(preparedComponent, {
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth, userImage: '' },
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
