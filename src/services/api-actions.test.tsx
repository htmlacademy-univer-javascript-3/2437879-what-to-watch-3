import {beforeEach, describe, expect} from 'vitest';
import {createAPI} from './api';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {Action} from 'redux';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeComments,
  makeFakeFilmCard,
  makeFakeFilmsList,
  makeFakePromoFilm,
  makeFakeUser,
} from '../mocks/mock-data.ts';
import {State} from '../store/types';
import { Genre, ApiRoute, AuthorizationStatus, FilmStatus, NameSpace } from '../const.ts';
import {
  checkAuth,
  fetchFilmAction,
  fetchFilmsAction,
  fetchMyList,
  fetchPromoFilmAction,
  login,
  logOut,
  sendComment,
  setFilmStatus,
} from './api-actions.ts';
import * as tokenStorage from '../services/token.ts';
import {redirectToRoute} from './action.ts';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.Films]: {
        hasError: false,
        isDataLoading: false,
        films: [],
        promoFilm: null,
        filmCard: null,
        moreLikeThis: [],
        comments: [],
        myList: [],
        genres: [],
        activeGenre: Genre.All,
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userImage: '',
      },
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending" and "loginAction.fulfilled" with thunk "loginAction"', async () => {
      const fakeUser = { email: 'test@test.com', password: 'password' };
      const fakeResponse = { token: 'token' };
      mockAxiosAdapter.onPost(ApiRoute.Login(), fakeUser).reply(200, fakeResponse);

      await store.dispatch(login(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        login.pending.type,
        redirectToRoute.type,
        login.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser = { email: 'test@test.com', password: 'password' };
      const fakeResponse = { token: 'token' };
      mockAxiosAdapter.onPost(ApiRoute.Login(), fakeUser).reply(200, fakeResponse);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(login(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeResponse.token);
    });

    it('should dispatch "loginAction.pending" and "loginAction.rejected" with thunk "loginAction" when server response 400', async () => {
      const fakeUser = { email: 'test@test.com', password: 'password' };
      mockAxiosAdapter.onPost(ApiRoute.Login(), fakeUser).reply(400);

      await store.dispatch(login(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([login.pending.type, login.rejected.type]);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending" and "logoutAction.fulfilled" with thunk "logout"', async () => {
      mockAxiosAdapter.onDelete(ApiRoute.Logout()).reply(200);

      await store.dispatch(logOut());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([logOut.pending.type, logOut.fulfilled.type]);
    });

    it('should call "removeToken" once', async () => {
      mockAxiosAdapter.onDelete(ApiRoute.Logout()).reply(200);
      const mockRemoveToken = vi.spyOn(tokenStorage, 'removeToken');

      await store.dispatch(logOut());

      expect(mockRemoveToken).toBeCalledTimes(1);
    });

    it('should dispatch "logoutAction.pending" and "logoutAction.rejected" with thunk "logout" when server response 400', async () => {
      mockAxiosAdapter.onDelete(ApiRoute.Logout()).reply(400);

      await store.dispatch(logOut());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([logOut.pending.type, logOut.rejected.type]);
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      const fakeUser = makeFakeUser();
      mockAxiosAdapter.onGet(ApiRoute.Login()).reply(200, fakeUser);

      await store.dispatch(checkAuth());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const checkAuthActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof checkAuth.fulfilled
      >;
      expect(extractedActionsTypes).toEqual([
        checkAuth.pending.type,
        checkAuth.fulfilled.type,
      ]);

      expect(checkAuthActionFulfilled.payload).toBe(fakeUser.avatarUrl);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" with thunk "checkAuthAction" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Login()).reply(400);
      await store.dispatch(checkAuth());

      const extractedActionsTypes = extractActionsTypes(store.getActions());
      expect(extractedActionsTypes).toEqual([
        checkAuth.pending.type,
        checkAuth.rejected.type,
      ]);
    });
  });

  describe('fetchFilmsAction', () => {
    it('should dispatch "fetchFilmsAction.pending" and "fetchFilmsAction.fulfilled" with thunk "fetchFilmsAction', async () => {
      const filmsList = makeFakeFilmsList();
      mockAxiosAdapter.onGet(ApiRoute.Films()).reply(200, filmsList);

      await store.dispatch(fetchFilmsAction());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmsActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchFilmsAction.fulfilled
      >;
      expect(extractedActionsTypes).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.fulfilled.type,
      ]);

      expect(fetchFilmsActionFulfilled.payload).toEqual(filmsList);
    });

    it('should dispatch "fetchFilmsAction.pending" and "fetchFilmsAction.rejected" with thunk "fetchFilmsAction" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Films()).reply(400);
      await store.dispatch(fetchFilmsAction());

      const extractedActionsTypes = extractActionsTypes(store.getActions());
      expect(extractedActionsTypes).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.rejected.type,
      ]);
    });
  });

  describe('fetchPromoFilmAction', () => {
    it('should dispatch "fetchPromoFilmAction.pending" and "fetchPromoFilmAction.fulfilled" with thunk "fetchPromoFilmAction', async () => {
      const promoFilm = makeFakePromoFilm();
      mockAxiosAdapter.onGet(ApiRoute.Promo()).reply(200, promoFilm);

      await store.dispatch(fetchPromoFilmAction());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchPromoFilmActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchPromoFilmAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchPromoFilmAction.pending.type,
        fetchPromoFilmAction.fulfilled.type,
      ]);

      expect(fetchPromoFilmActionFulfilled.payload).toEqual(promoFilm);
    });

    it('should dispatch "fetchPromoFilmAction.pending" and "fetchPromoFilmAction.rejected" with thunk "fetchPromoFilmAction" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Promo()).reply(400);
      await store.dispatch(fetchPromoFilmAction());

      const extractedActionsTypes = extractActionsTypes(store.getActions());
      expect(extractedActionsTypes).toEqual([
        fetchPromoFilmAction.pending.type,
        fetchPromoFilmAction.rejected.type,
      ]);
    });
  });

  describe('fetchFilmDataAction', () => {
    it('should dispatch "fetchFilmDataAction.pending" and "fetchFilmDataAction.fulfilled" with thunk "fetchFilmDataAction', async () => {
      const filmCard = makeFakeFilmCard();
      const comments = makeFakeComments();
      const moreLikeThis = makeFakeFilmsList();
      mockAxiosAdapter.onGet(ApiRoute.Film(filmCard.id)).reply(200, filmCard);
      mockAxiosAdapter.onGet(ApiRoute.Comments(filmCard.id)).reply(200, comments);
      mockAxiosAdapter.onGet(ApiRoute.Similar(filmCard.id)).reply(200, moreLikeThis);

      await store.dispatch(fetchFilmAction(filmCard.id));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmDataActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchFilmAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchFilmAction.pending.type,
        fetchFilmAction.fulfilled.type,
      ]);

      expect(fetchFilmDataActionFulfilled.payload).toEqual({
        filmCard,
        comments,
        moreLikeThis,
      });
    });

    it('should dispatch "fetchFilmDataAction.pending" and "fetchFilmDataAction.rejected" with thunk "fetchFilmDataAction" when server response 400', async () => {
      const id = 'unknown';
      mockAxiosAdapter.onGet(ApiRoute.Film(id)).reply(400);

      await store.dispatch(fetchFilmAction(id));
      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        fetchFilmAction.pending.type,
        fetchFilmAction.rejected.type,
      ]);
    });
  });

  describe('sendComment', () => {
    it('should dispatch "sendComment.pending" and "sendComment.fulfilled" with thunk "sendComment', async () => {
      const filmId = 'some-id';
      const [comment] = makeFakeComments();
      mockAxiosAdapter
        .onPost(ApiRoute.Comments(filmId), {
          comment: comment.comment,
          rating: comment.rating,
        })
        .reply(200, comment);

      await store.dispatch(
        sendComment({
          id: filmId,
          rating: comment.rating,
          comment: comment.comment,
        })
      );
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const sendCommentFulfilled = emittedActions.at(1) as ReturnType<
        typeof sendComment.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        sendComment.pending.type,
        sendComment.fulfilled.type,
      ]);

      expect(sendCommentFulfilled.payload).toEqual(comment);
    });

    it('should dispatch "sendComment.pending" and "sendComment.rejected" with thunk "sendComment" when server response 400', async () => {
      const id = 'unknown';
      mockAxiosAdapter.onPost(ApiRoute.Film(id), {}).reply(400);

      await store.dispatch(sendComment({ id: id, rating: 0, comment: '' }));
      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        sendComment.pending.type,
        sendComment.rejected.type,
      ]);
    });
  });

  describe('fetchMyList', () => {
    it('should dispatch "fetchMyList.pending" and "fetchMyList.fulfilled" with thunk "fetchMyList', async () => {
      const films = makeFakeFilmsList();
      mockAxiosAdapter.onGet(ApiRoute.Favorite()).reply(200, films);

      await store.dispatch(fetchMyList());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchMyListFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchMyList.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchMyList.pending.type,
        fetchMyList.fulfilled.type,
      ]);

      expect(fetchMyListFulfilled.payload).toEqual(films);
    });

    it('should dispatch "fetchMyList.pending" and "sendComment.rejected" with thunk "fetchMyList" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Favorite()).reply(400);

      await store.dispatch(fetchMyList());
      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        fetchMyList.pending.type,
        fetchMyList.rejected.type,
      ]);
    });
  });

  describe('setFilmStatus', () => {
    it('should dispatch "setFilmStatus.pending" and "setFilmStatus.fulfilled" with thunk "setFilmStatus', async () => {
      const film = makeFakeFilmCard();
      mockAxiosAdapter
        .onPost(ApiRoute.SetFilmStatus(film.id, FilmStatus.Viewed))
        .reply(200, { ...film, isFavorite: false });

      await store.dispatch(setFilmStatus({ id: film.id, filmStatus: FilmStatus.Viewed }));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const setFilmStatusFulfilled = emittedActions.at(1) as ReturnType<
        typeof setFilmStatus.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        setFilmStatus.pending.type,
        setFilmStatus.fulfilled.type,
      ]);

      expect(setFilmStatusFulfilled.payload).toEqual({
        ...film,
        isFavorite: false,
      });
    });

    it('should dispatch "setFilmStatus.pending" and "setFilmStatus.rejected" with thunk "setFilmStatus" when server response 400', async () => {
      const id = 'unknown';
      const filmStatus = FilmStatus.Viewed;
      mockAxiosAdapter.onPost(ApiRoute.SetFilmStatus(id, filmStatus), {}).reply(400);

      await store.dispatch(setFilmStatus({ id: id, filmStatus: filmStatus }));
      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        setFilmStatus.pending.type,
        setFilmStatus.rejected.type,
      ]);
    });
  });
});
