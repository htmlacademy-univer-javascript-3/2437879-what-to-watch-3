import {Genre} from '../const';

export type FilmType = {
  id: string;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  genre: Genre;
}

export type PromoFilmType = {
  id: string;
  name: string;
  posterImage: string;
  backgroundImage: string;
  videoLink: string;
  genre: Genre;
  released: number;
  isFavorite: boolean;
};

export type FilmCardType = {
  id: string;
  name: string;
  posterImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
  genre: Genre;
  released: number;
  isFavorite: boolean;
};

export type ReviewType = {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
};
