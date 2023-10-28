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
  starring: string;
  genre: string;
  runTime: string;
  releaseDate: number;
  pictureBackground: string;
  video: string;
};
