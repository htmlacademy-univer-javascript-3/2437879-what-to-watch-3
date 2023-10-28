import {useEffect, useRef, useState} from 'react';
import {FilmCardType} from '../../types/films';

type VideoPlayerProps = {
  promoFilm: FilmCardType;
  activeFilm: number | null;
  isMuted: boolean;
}

export default function VideoPlayer({promoFilm, activeFilm, isMuted}: VideoPlayerProps): JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoPlayer = videoRef.current;

    const dataLoadedHandle = () => {
      setIsLoaded(true);
    };

    videoPlayer?.addEventListener('loadeddata', dataLoadedHandle);

    return () => {
      videoPlayer?.removeEventListener('loadeddata', dataLoadedHandle);
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!isLoaded || !videoElement) {
      return;
    }

    if (activeFilm === promoFilm.id) {
      videoElement.play();
      return;
    }

    videoElement.pause();
    videoElement.src = promoFilm.video;
  }, [activeFilm, isLoaded, promoFilm.id, promoFilm.video]);

  return (
    <video
      width="280"
      height="175"
      poster={promoFilm.src}
      ref={videoRef}
      src={promoFilm.video}
      muted={isMuted}
    >
    </video>
  );
}
