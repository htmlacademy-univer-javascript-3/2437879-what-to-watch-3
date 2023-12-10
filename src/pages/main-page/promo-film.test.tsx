import {describe} from 'vitest';
import {makeFakePromoFilm, makeFakeStore} from '../../mocks/mock-data.ts';
import {withHistory, withStore} from '../../mocks/mock-components.tsx';
import PromoFilm from './promo-film.tsx';
import {AuthorizationStatus, NameSpace} from '../../const.ts';
import {render, screen} from '@testing-library/react';

describe('Component: PromoFilm', () => {
  it('should render correct', () => {
    const promoFilm = makeFakePromoFilm();
    const withHistoryComponent = withHistory(<PromoFilm promoFilm={promoFilm} />);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth, userImage: '' },
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(promoFilm.name)).toBeInTheDocument();
    expect(screen.getByText(promoFilm.genre)).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText('My list')).toBeInTheDocument();
  });
});
