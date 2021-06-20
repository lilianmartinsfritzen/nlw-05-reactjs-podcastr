import Image from 'next/image'
import { useContext, useRef, useEffect } from 'react';
import Slider from 'rc-slider'

import 'rc-slider/assets/index.css';

import { PlayerContext } from '../../contexts/PlayerContext';

import styles from './styles.module.scss';

export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null)

  const { 
    episodeList, 
    currentEpisodeIndex, 
    isPlaying, 
    togglePlay,
    setPlayingState
  } = useContext(PlayerContext)

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying])

  const episode = episodeList[currentEpisodeIndex]

  return (
    <div className={styles.playerContainer}>
        <header>
            <Image
            src="/playing.svg" 
            alt="Tocando agora"
            width={32}
            height={32} /> 
            <strong>Tocando agora</strong>
        </header>

        { episode ? (
          <div className={styles.currentEpisode}>
            <Image
              src={episode.thumbnail} 
              alt=""
              objectFit="cover"
              width={592}
              height={592}
            /> 
            <strong>{episode.title}</strong>
            <span>{episode.members}</span>
          </div>
        ) : (
          <div className={styles.emptyPlayer}>
            <strong>Selecione um podcast para ouvir</strong>   
          </div>
        )}

        <footer className={!episode ? styles.empty : ''}>
            <div className={styles.progress}>
                <span>00:00</span>
                <div className={styles.slider}>
                  { episode ? (
                    <Slider 
                      trackStyle={{ backgroundColor: '#04d361' }} // progresso do áudio
                      railStyle={{ backgroundColor: '#9f75ff' }} // restante do áudio
                      handleStyle={{ borderColor: '#04d361', borderWidth: 4 }} // bolinha
                    />
                  ) : (
                    <div className={styles.emptySlider} />
                  )}
                </div>
                <span>00:00</span>
            </div>

            { episode && (
              <audio 
                src={episode.url}
                ref={audioRef}
                autoPlay
                onPlay={() => setPlayingState(true)}
                onPause={() => setPlayingState(false)}
              />
            )}

            <div className={styles.buttons}>
                <button type="button" disabled={!episode}>
                    <Image
                    src="/shuffle.svg" 
                    alt="Embaralhar"
                    width={24}
                    height={24} />                         
                </button>
                <button type="button" disabled={!episode}>
                    <Image
                    src="/play-previous.svg" 
                    alt="Tocar anterior"
                    width={24}
                    height={24} />  
                </button>
                <button 
                  type="button" 
                  className={styles.playButton} 
                  disabled={!episode}
                  onClick={togglePlay}
                  >
                  { isPlaying ? 
                    <Image
                    src="/pause.svg" 
                    alt="Tocar"
                    width={32}
                    height={32} /> : 
                    <Image
                    src="/play.svg" 
                    alt="Tocar"
                    width={32}
                    height={32} /> 
                  }
                </button>
                <button type="button" disabled={!episode}>
                <Image
                    src="/play-next.svg" 
                    alt="Tocar próxima"
                    width={24}
                    height={24} /> 
                </button>
                <button type="button" disabled={!episode}>
                    <Image
                    src="/repeat.svg" 
                    alt="Repetir"
                    width={24}
                    height={24} />                     
                </button>
            </div>
        </footer>
    </div> 
  );
}