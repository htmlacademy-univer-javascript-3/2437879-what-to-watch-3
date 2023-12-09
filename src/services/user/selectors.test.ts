import {describe, expect} from 'vitest';
import {AuthorizationStatus, NameSpace} from '../../const.ts';
import {getAuthorizationStatus, getAuthorized, getUserImage} from './selectors.ts';

describe('UserSlice selectors', () => {
  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      userImage: '/some/path/to/image.png',
    },
  };

  it('should return authorization status from state', () => {
    const { authorizationStatus } = state[NameSpace.User];
    const result = getAuthorizationStatus(state);
    expect(result).toBe(authorizationStatus);
  });

  it('should return authorized from state if true', () => {
    const result = getAuthorized(state);
    expect(result).toBe(true);
  });

  it('should return authorized from state if false', () => {
    state[NameSpace.User].authorizationStatus = AuthorizationStatus.NoAuth;
    const result = getAuthorized(state);
    expect(result).toBe(false);
  });

  it('should return user image from state', () => {
    const { userImage } = state[NameSpace.User];
    const result = getUserImage(state);
    expect(result).toBe(userImage);
  });
});
