import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect';
import browserHistory from '../../services/browser-history.ts';
import { AnyAction } from '@reduxjs/toolkit';
import { redirectToRoute } from '../action';
import { AppRoute } from '../../const';
import {State} from '../../store/types';

vi.mock('../../browser-history', () => ({
  default: {
    location: { pathname: '' },
    push(path: string) {
      this.location.pathname = path;
    },
  },
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to "/" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Main);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Main);
  });
});
