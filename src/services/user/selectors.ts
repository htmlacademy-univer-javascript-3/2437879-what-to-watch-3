import {State} from '../../store/types';
import {AuthorizationStatus} from '../../const';
import {ImageUrl} from '../../types/users';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state.User.authorizationStatus;
export const getAuthorized = (state: State): boolean =>
  state.User.authorizationStatus === AuthorizationStatus.Auth;
export const getUserImage = (state: State): ImageUrl => state.User.userImage;
