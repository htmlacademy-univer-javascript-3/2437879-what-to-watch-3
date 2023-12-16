import {ReactElement, ReactNode} from 'react';
import {createMemoryHistory, MemoryHistory} from 'history';
import HistoryRouter from '../components/history-router/history-router.tsx';
import {HelmetProvider} from 'react-helmet-async';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {State} from '../store/types';
import {createAPI} from '../services/api.ts';
import thunk from 'redux-thunk';
import {Action} from 'redux';
import {AppThunkDispatch} from './mock-data.ts';
import {Provider} from 'react-redux';

export function withHistory(component: ReactNode, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>{component}</HelmetProvider>
    </HistoryRouter>
  );
}

type ComponentWithMockStore = {
  withStoreComponent: ReactElement;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
};

export function withStore(
  component: ReactElement,
  initialState: Partial<State> = {}
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return {
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  };
}
