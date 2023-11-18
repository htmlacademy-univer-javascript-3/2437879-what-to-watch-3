import {combineReducers} from '@reduxjs/toolkit';
import {userSlice} from '../services/user/user-slice';
import {filmsSlice} from '../services/films/films-slice';

export const reducer = combineReducers({
  User: userSlice.reducer,
  Films: filmsSlice.reducer,
});
