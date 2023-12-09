import {describe, expect} from 'vitest';
import {MemoryHistory, createMemoryHistory} from 'history';
import {withHistory, withStore} from '../../mocks/mock-components.tsx';
import App from './app.tsx';
import {makeFakeStore} from '../../mocks/mock-data.ts';
import {render, screen} from '@testing-library/react';
import {AuthorizationStatus, NameSpace, ShowFilmsCount} from '../../const';
import {internet} from 'faker';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render the "MainPage" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push('/');

    render(withStoreComponent);

    expect(screen.getAllByTestId('film').length).toBe(ShowFilmsCount);
    expect(screen.getByText('All Genres')).toBeInTheDocument();
  });

  it('should render the "MyList" when user navigate to "/mylist"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userImage: internet.url(),
        },
      })
    );
    mockHistory.push('/mylist');

    render(withStoreComponent);

    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getAllByTestId('film')).not.toHaveLength(0);
  });

  it('should render the "SignIn" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push('/login');

    render(withStoreComponent);

    expect(screen.getAllByText('Sign in').length).toBe(2);
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should render the "Player" when user navigate to "/player"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push('/player/test');

    render(withStoreComponent);

    expect(screen.getByText('Exit')).toBeInTheDocument();
  });

  it('should render the "Movie" when user navigate to "/films"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userImage: internet.url(),
        },
      })
    );
    mockHistory.push('/films/test}');

    render(withStoreComponent);

    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getAllByText('My list')[0]).toBeInTheDocument();
  });

  it('should render the "NotFound" when user navigate to unknown route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push('/unknown');

    render(withStoreComponent);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Back to main page.')).toBeInTheDocument();
  });
});
