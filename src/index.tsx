import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {films} from './mocks/films';
import {store} from './store';
import {Provider} from 'react-redux';
import {fetchFilmsAction, fetchPromoFilmAction} from './services/api-actions';

store.dispatch(fetchFilmsAction());
store.dispatch(fetchPromoFilmAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App films={films} />
    </Provider>
  </React.StrictMode>
);
