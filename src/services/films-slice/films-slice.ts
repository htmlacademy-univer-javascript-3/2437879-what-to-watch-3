import {Genre, MAX_GENRES_COUNT, NameSpace} from '../../const';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchFilmDataAction, fetchFilmsAction, fetchMyListAction, fetchPromoFilmAction, sendCommentAction, setFilmStatusAction} from '../api-actions';
import {CommentType} from '../../types/users';
import {FilmCardType, FilmType, PromoFilmType, FavoriteFilmType} from '../../types/films';

export type filmsSliceProps = {
  films: FilmType[];
  promoFilm: PromoFilmType | null;
  filmCard: FilmCardType | null;
  moreLikeThis: FilmType[];
  comments: CommentType[];
  myList: FilmType[];
  genres: Genre[];
  activeGenre: Genre;
  hasError: boolean;
  isDataLoading: boolean;
};

const initialState: filmsSliceProps = {
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
};

const pending = (state: filmsSliceProps) => {
  state.isDataLoading = true;
  state.hasError = false;
};

const rejected = (state: filmsSliceProps) => {
  state.isDataLoading = false;
  state.hasError = true;
};

export const filmsSlice = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    setActiveGenre: (state, action: PayloadAction<Genre>) => {
      state.activeGenre = action.payload;
    },
    dropError: (state) => {
      state.hasError = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmDataAction.pending, pending)
      .addCase(fetchFilmDataAction.rejected, rejected)
      .addCase(fetchFilmDataAction.fulfilled, (state, action) => {
        state.filmCard = action.payload.filmCard;
        state.comments = action.payload.comments;
        state.moreLikeThis = action.payload.moreLikeThis;
        state.isDataLoading = false;
      })

      .addCase(fetchFilmsAction.pending, pending)
      .addCase(fetchFilmsAction.rejected, rejected)
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.films = action.payload;

        const newGenres = new Set<Genre>([Genre.All]);
        action.payload.forEach((film) => newGenres.add(film.genre));
        state.genres = Array.from(newGenres).slice(0, MAX_GENRES_COUNT);
      })

      .addCase(fetchPromoFilmAction.pending, pending)
      .addCase(fetchPromoFilmAction.rejected, rejected)
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.promoFilm = action.payload;
      })

      .addCase(fetchMyListAction.pending, pending)
      .addCase(fetchMyListAction.rejected, rejected)
      .addCase(fetchMyListAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.myList = action.payload;
      })

      .addCase(sendCommentAction.pending, pending)
      .addCase(sendCommentAction.rejected, rejected)
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.comments = [...state.comments, action.payload];
      })

      .addCase(setFilmStatusAction.rejected, rejected)
      .addCase(setFilmStatusAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        if (state.promoFilm?.id === action.payload.id) {
          state.promoFilm = action.payload;
        }

        if (state.filmCard?.id === action.payload.id) {
          state.filmCard = action.payload;
        }

        if (action.payload.isFavorite) {
          state.myList = [...state.myList, action.payload as FavoriteFilmType];
        } else {
          const index = state.myList.findIndex(
            (film) => film.id === action.payload.id,
          );

          if (index !== -1) {
            state.myList = [
              ...state.myList.slice(0, index),
              ...state.myList.slice(index + 1, state.myList.length),
            ];
          }
        }
      });
  },
});

export const {setActiveGenre, dropError} = filmsSlice.actions;
