import {FilmCardType} from './types/films';

export const MoreLikeFilmsCount = 4;
export const ShowFilmsCount = 8;
export const hoverFilmCardTime = 1000;
export const ShowErrorTimeout = 2000;
export const AuthTokenName = 'wtw-token';
export const CommentLength = {
  Min: 50,
  Max: 400,
};
export enum Genre {
  All = 'All Genres',
  Comedy = 'Comedy',
  Crime = 'Crime',
  Documentary = 'Documentary',
  Drama = 'Drama',
  Horror = 'Horror',
  KidsFamily = 'Kids & Family',
  Romance = 'Romance',
  SciFi = 'Sci-Fi',
  Thriller = 'Thriller',
  Fantasy = 'Fantasy',
  Action = 'Action',
  Adventure = 'Adventure'
}

export const PromoFilm = {
  id: 'aba664c3-bdf3-4fb3-b8f3-42e007864bbf',
  name: 'The Grand Budapest Hotel',
  posterImage: 'https://url-to-image/image.jpg',
  backgroundImage: 'https://url-to-image/image.jpg',
  videoLink: 'https://url-to-video/video.mp4',
  genre: Genre.Comedy,
  released: 2014,
  isFavorite: false,
};

export const filmCard: FilmCardType = {
  id: '36b6dce1-ec9b-4b1e-8002-32b737c7da29',
  name: 'Fantastic Beasts: The Crimes of Grindelwald',
  posterImage:
    'https://13.design.pages.academy/static/film/poster/Fantastic_Beasts.jpg',
  backgroundImage:
    'https://13.design.pages.academy/static/film/background/Fantastic_Beasts.jpg',
  backgroundColor: '#B6A99F',
  videoLink: 'https://13.design.pages.academy/static/film/video/bike.mp4',
  description:
    'In an effort to thwart Grindelwalds plans of raising pure-blood wizards to rule over all non-magical beings, Albus Dumbledore enlists his former student Newt Scamander, who agrees to help, though he unaware of the dangers that lie ahead. Lines are drawn as love and loyalty are tested, even among the truest friends and family, in an increasingly divided wizarding world.',
  rating: 3.4,
  scoresCount: 160757,
  director: 'David Yates',
  starring: ['Eddie Redmayne', 'Katherine Waterston', 'Dan Fogler'],
  runTime: 134,
  genre: Genre.Fantasy,
  released: 2018,
  isFavorite: false,
};

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
  NotFound = '*',
}

export enum FilmStatus {
  Vied = 0,
  ToView = 1,
}

export const ApiRoute = {
  Films: () => '/films',
  Film: (filmId: string) => `/films/${filmId}`,
  Similar: (filmId: string) => `/films/${filmId}/similar`,
  Promo: () => '/promo',
  Favorite: () => '/favorite',
  SetFilmStatus: (filmId: string, status: FilmStatus) =>
    `/favorite/${filmId}/${status}`,
  Comments: (filmId: string) => `/comments/${filmId}`,
  Login: () => '/login',
  Logout: () => '/logout',
};

export enum TabType {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews',
}

export enum Grade {
  Bad = 'Bad',
  Normal = 'Normal',
  Good = 'Good',
  VeryGood = 'Very good',
  Awesome = 'Awesome',
}
