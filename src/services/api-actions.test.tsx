import {beforeEach, describe, expect} from 'vitest';
import {createAPI} from './api';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {Action} from 'redux';
import {AppThunkDispatch, extractActionsTypes, makeFakeComments, makeFakeFilmCard, makeFakeFilmsList, makeFakePromoFilm, makeFakeUser} from '../mocks/mock-data.ts';
import {State} from '../store/types';
import {Genre, ApiRoute, AuthorizationStatus, FilmStatus, NameSpace} from '../const.ts';
import {checkAuthAction, fetchFilmDataAction, fetchFilmsAction, fetchMyListAction, fetchPromoFilmAction, loginAction, logoutAction, sendCommentAction, setFilmStatusAction} from './api-actions.ts';
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

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser = {email: 'my@my.com', password: 'qwerty1'};
      const fakeResponse = {token: 'mysecrettoken'};
      mockAxiosAdapter.onPost(ApiRoute.Login(), fakeUser).reply(200, fakeResponse);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeResponse.token);
    });

    it('should dispatch "loginAction.pending" and "loginAction.rejected" with thunk "loginAction" when server response 400', async () => {
      const fakeUser = {email: 'my@my.com', password: 'qwerty1'};
      mockAxiosAdapter.onPost(ApiRoute.Login(), fakeUser).reply(400);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([loginAction.pending.type, loginAction.rejected.type]);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending" and "logoutAction.fulfilled" with thunk "logout"', async () => {
      mockAxiosAdapter.onDelete(ApiRoute.Logout()).reply(200);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([logoutAction.pending.type, logoutAction.fulfilled.type]);
    });

    it('should call "removeToken" once', async () => {
      mockAxiosAdapter.onDelete(ApiRoute.Logout()).reply(200);
      const mockRemoveToken = vi.spyOn(tokenStorage, 'removeToken');

      await store.dispatch(logoutAction());

      expect(mockRemoveToken).toBeCalledTimes(1);
    });

    it('should dispatch "logoutAction.pending" and "logoutAction.rejected" with thunk "logout" when server response 400', async () => {
      mockAxiosAdapter.onDelete(ApiRoute.Logout()).reply(400);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([logoutAction.pending.type, logoutAction.rejected.type]);
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      const fakeUser = makeFakeUser();
      mockAxiosAdapter.onGet(ApiRoute.Login()).reply(200, fakeUser);

      await store.dispatch(checkAuthAction());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const checkAuthActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof checkAuthAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);

      expect(checkAuthActionFulfilled.payload).toBe(fakeUser.avatarUrl);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" with thunk "checkAuthAction" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Login()).reply(400);
      await store.dispatch(checkAuthAction());

      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
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

      await store.dispatch(fetchFilmDataAction(filmCard.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmDataActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchFilmDataAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchFilmDataAction.pending.type,
        fetchFilmDataAction.fulfilled.type,
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

      await store.dispatch(fetchFilmDataAction(id));

      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        fetchFilmDataAction.pending.type,
        fetchFilmDataAction.rejected.type,
      ]);
    });
  });

  describe('sendCommentAction', () => {
    it('should dispatch "sendCommentAction.pending" and "sendCommentAction.fulfilled" with thunk "sendCommentAction', async () => {
      const filmId = 'some-id';
      const [comment] = makeFakeComments();
      mockAxiosAdapter
        .onPost(ApiRoute.Comments(filmId), {
          comment: comment.comment,
          rating: comment.rating,
        })
        .reply(200, comment);

      await store.dispatch(
        sendCommentAction({
          id: filmId,
          rating: comment.rating,
          comment: comment.comment,
        })
      );

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const sendCommentFulfilled = emittedActions.at(1) as ReturnType<
        typeof sendCommentAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        sendCommentAction.pending.type,
        sendCommentAction.fulfilled.type,
      ]);

      expect(sendCommentFulfilled.payload).toEqual(comment);
    });

    it('should dispatch "sendCommentAction.pending" and "sendCommentAction.rejected" with thunk "sendCommentAction" when server response 400', async () => {
      const id = 'unknown';
      mockAxiosAdapter.onPost(ApiRoute.Film(id), {}).reply(400);

      await store.dispatch(sendCommentAction({id: id, rating: 0, comment: ''}));

      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        sendCommentAction.pending.type,
        sendCommentAction.rejected.type,
      ]);
    });
  });

  describe('fetchMyListAction', () => {
    it('should dispatch "fetchMyListAction.pending" and "fetchMyListAction.fulfilled" with thunk "fetchMyListAction"', async () => {
      const films = makeFakeFilmsList();
      mockAxiosAdapter.onGet(ApiRoute.Favorite()).reply(200, films);

      await store.dispatch(fetchMyListAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchMyListFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchMyListAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchMyListAction.pending.type,
        fetchMyListAction.fulfilled.type,
      ]);

      expect(fetchMyListFulfilled.payload).toEqual(films);
    });

    it('should dispatch "fetchMyListAction.pending" and "sendCommentAction.rejected" with thunk "fetchMyListAction" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Favorite()).reply(400);

      await store.dispatch(fetchMyListAction());

      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        fetchMyListAction.pending.type,
        fetchMyListAction.rejected.type,
      ]);
    });
  });

  describe('setFilmStatusAction', () => {
    it('should dispatch "setFilmStatusAction.pending" and "setFilmStatusAction.fulfilled" with thunk "setFilmStatusAction"', async () => {
      const film = makeFakeFilmCard();
      mockAxiosAdapter
        .onPost(ApiRoute.SetFilmStatus(film.id, FilmStatus.Viewed))
        .reply(200, { ...film, isFavorite: false });

      await store.dispatch(setFilmStatusAction({ id: film.id, filmStatus: FilmStatus.Viewed }));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const setFilmStatusFulfilled = emittedActions.at(1) as ReturnType<
        typeof setFilmStatusAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        setFilmStatusAction.pending.type,
        setFilmStatusAction.fulfilled.type,
      ]);

      expect(setFilmStatusFulfilled.payload).toEqual({
        ...film,
        isFavorite: false,
      });
    });

    it('should dispatch "setFilmStatusAction.pending" and "setFilmStatusAction.rejected" with thunk "setFilmStatusAction" when server response 400', async () => {
      const id = 'unknown';
      const filmStatus = FilmStatus.Viewed;
      mockAxiosAdapter.onPost(ApiRoute.SetFilmStatus(id, filmStatus), {}).reply(400);

      await store.dispatch(setFilmStatusAction({ id: id, filmStatus: filmStatus }));

      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        setFilmStatusAction.pending.type,
        setFilmStatusAction.rejected.type,
      ]);
    });
  });
});
