import {combineReducers} from '@reduxjs/toolkit';
import {userSlice} from '../services/user-slice/user-slice';
import {filmsSlice} from '../services/films-slice/films-slice';

export const reducer = combineReducers({
  User: userSlice.reducer,
  Films: filmsSlice.reducer,
});
