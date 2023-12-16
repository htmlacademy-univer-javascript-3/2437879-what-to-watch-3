import {expect, it} from 'vitest';
import {AuthorizationStatus} from '../../const.ts';
import {userSlice, userSliceProps} from './user-slice.ts';

describe('User Slice', () => {
  const initialState: userSliceProps = {
    authorizationStatus: AuthorizationStatus.Unknown,
    userImage: '',
  };

  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const result = userSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const result = userSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });
});
