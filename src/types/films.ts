export type PromoFilmType = {
  id: number;
  title: string;
  genre: string;
  year: number;
  src: string;
  poster: string;
};

export type FilmCardType = {
  id: number;
  title: string;
  src: string;
  poster: string;
  ratingScore: number;
  ratingLevel: string;
  ratingCount: number;
  description: string;
  director: string;
  starring: string[];
  genre: string;
  runTime: number;
  releaseDate: number;
  pictureBackground: string;
  video: string;
};

export type ReviewType = {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
};
