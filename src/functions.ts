import {Grade} from './const';

const getFormattedTime = (time: number) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  return `${hours}h ${minutes}m`;
};

const getFormattedDate = (date: string): string =>
  new Date(date).toLocaleString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });

const getFilmGrade = (rating: number): Grade => {
  if (rating <= 3) {
    return Grade.Bad;
  } else if (rating <= 5) {
    return Grade.Normal;
  } else if (rating <= 8) {
    return Grade.Good;
  } else if (rating < 10) {
    return Grade.VeryGood;
  } else {
    return Grade.Awesome;
  }
};

export {getFormattedTime, getFormattedDate, getFilmGrade};
