export const MoreLikeFilmsCount = 4;
export const ShowFilmsCount = 8;

export const PromoFilm = {
  id: 1,
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  year: 2014,
  src: '/img/bg-the-grand-budapest-hotel.jpg',
  poster: '/img/the-grand-budapest-hotel-poster.jpg',
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
}

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
