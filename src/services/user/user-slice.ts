import {AuthorizationStatus} from '../../const';
import {createSlice} from '@reduxjs/toolkit';
import {checkAuth, login, logOut} from '../api-actions';
import {ImageUrl} from '../../types/users';

type userSliceProps = {
  authorizationStatus: AuthorizationStatus;
  userImage: ImageUrl;
};

const initialState: userSliceProps = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userImage: '',
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userImage = action.payload;
      })

      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userImage = action.payload;
      })

      .addCase(login.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })

      .addCase(logOut.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});
