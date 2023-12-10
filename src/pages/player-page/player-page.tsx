import {useAppSelector, useAppDispatch} from '../../components/hooks/hooks';
import {getFilmCard} from '../../services/films/selectors';
import {useParams} from 'react-router-dom';
import {useEffect, useCallback, useRef, useState} from 'react';
import {fetchFilmAction} from '../../services/api-actions';
import PlayButton from '../../components/video-player/play-button/play-button';
import PauseButton from '../../components/video-player/pause-button/pause-button';
import ExitLink from '../../components/video-player/exit-link/exit-link';
import ProgressBar from '../../components/video-player/progress-bar/progress-bar';
import FullScreenButton from '../../components/video-player/full-screen-button/full-screen-button';
import {Helmet} from 'react-helmet-async';

function PlayerPage() {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilmCard);

  const playerRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const handleDataLoaded = () => {
    setIsLoaded(true);
  };

  const handlePlayPauseClick = useCallback(() => {
    setIsPlaying((prevState) => !prevState);
  }, []);

  const handleFullScreenClick = useCallback(() => {
    const playerElement = playerRef.current;

    if (!playerElement || !isLoaded) {
      return;
    }

    playerElement.requestFullscreen();
  }, [isLoaded]);

  const getFilmDuration = () => {
    const playerElement = playerRef.current;

    if (!playerElement || !isLoaded) {
      return 0;
    }

    return playerElement.duration;
  };

  const getFilmCurrentTime = () => {
    const playerElement = playerRef.current;

    if (!playerElement || !isLoaded) {
      return 0;
    }

    return playerElement.currentTime;
  };

  const videoPlaying = () => {
    setCurrentTime(getFilmCurrentTime());
  };

  useEffect(() => {
    const playerElement = playerRef.current;

    if (!playerElement || !isLoaded) {
      return;
    }

    if (isPlaying) {
      playerElement.play();
    } else {
      playerElement.pause();
    }
  }, [isLoaded, isPlaying]);

  useEffect(() => {
    if (id && id !== film?.id) {
      dispatch(fetchFilmAction(id));
    }

    const playerElement = playerRef.current;

    if (!playerElement) {
      return;
    }

    playerElement.addEventListener('loadeddata', handleDataLoaded);

    return () =>
      playerElement.removeEventListener('loadeddata', handleDataLoaded);
  }, [dispatch, film?.id, id]);

  if (!film) {
    return null;
  }

  return (
    <div className="player">
      <Helmet>
        <title>{film.name} | Проигрыватель</title>
      </Helmet>
      <video ref={playerRef} src={film.videoLink} className="player__video" poster={film.backgroundImage} onTimeUpdate={videoPlaying}></video>

      <ExitLink />

      <div className="player__controls">
        <ProgressBar duration={getFilmDuration()} currentTime={currentTime} />

        <div className="player__controls-row">
          {isPlaying ? (
            <PauseButton onClick={handlePlayPauseClick} />
          ) : (
            <PlayButton onClick={handlePlayPauseClick} />
          )}
          <div className="player__name">{film.name}</div>
          <FullScreenButton onClick={handleFullScreenClick} />
        </div>
      </div>
    </div>
  );
}

export default PlayerPage;
