import {Genre} from '../const';

export type FilmType = {
  id: number;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  genre: Genre;
}

export type PromoFilmType = {
  id: number;
  title: string;
  genre: Genre;
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
  genre: Genre;
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
