import browserHistory from '../../services/browser-history.ts';
import {Middleware, PayloadAction} from '@reduxjs/toolkit';
import {reducer} from '../../store/reducer';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  () => (next) => (action: PayloadAction<string>) => {
    if (action.type === 'films/redirectToRoute') {
      browserHistory.push(action.payload);
    }

    return next(action);
  };
