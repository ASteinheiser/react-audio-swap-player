import React, { useState, useRef, useEffect } from 'react';
import throttle from 'lodash.throttle';

import TitleDisplay from './TitleDisplay';
import PlayButton from './PlayButton';
import SwapButton from './SwapButton';
import SoundBars from './SoundBars';
import TimeIndicator from './TimeIndicator';
import LoadingSpinner from './LoadingSpinner';

const SOUND_BAR_WIDTH = 900;
const SOUND_BAR_HEIGHT = 120;
const BUTTON_SIZE = 24;
const BUTTON_PADDING = 32;
const CONTROLS_WIDTH = BUTTON_SIZE + (BUTTON_PADDING * 2);

const _AudioPlayer = ({
  data = [null, null],
  loading = true
}) => {
  const [setupListeners, setSetupListeners] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(undefined);
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  data[0].playerRef = useRef();
  data[1].playerRef = useRef();

  const handlePlayButtonClick = () => {
    setIsAudioPlaying(true);
    data[currentSong].playerRef.current.play();
  }

  const handlePauseButtonClick = () => {
    setIsAudioPlaying(false);
    data[currentSong].playerRef.current.pause();
  }

  const handleSwapButtonClick = () => {
    if (isAudioPlaying) data[currentSong].playerRef.current.pause();
    const currentTime = data[currentSong].playerRef.current.currentTime;

    const newCurrentSong = currentSong === 0 ? 1 : 0;
    data[newCurrentSong].playerRef.current.currentTime = currentTime;
    setCurrentSong(newCurrentSong);

    if (isAudioPlaying) data[newCurrentSong].playerRef.current.play();
  }

  const updateTimeIndicator = (curTime, totalTime) => {
    const songTimePercentage = curTime / totalTime;
    let indicatorPositionPx = songTimePercentage * SOUND_BAR_WIDTH;

    setIndicatorPosition(indicatorPositionPx);
  }

  const onClickSoundBars = ({ second }) => {
    data[currentSong].playerRef.current.currentTime = second;

    updateTimeIndicator(second, data[currentSong].buffer.duration);
  }

  useEffect(() => {
    if (setupListeners && data[0]?.playerRef?.current && data[1]?.playerRef?.current) {
      setSetupListeners(false);
      data[0].playerRef.current.addEventListener(
        'timeupdate',
        throttle(({ target }) => {
          updateTimeIndicator(target.currentTime, target.duration)
        }, 250)
      )
      data[1].playerRef.current.addEventListener(
        'timeupdate',
        throttle(({ target }) => {
          updateTimeIndicator(target.currentTime, target.duration)
        }, 250)
      )
    }
  }, [data, setupListeners])

  useEffect(() => {
    if (currentSong === undefined && data[0] !== null) {
      setCurrentSong(0);
    }
  }, [currentSong, data])

  useEffect(() => {
    if (indicatorPosition === SOUND_BAR_WIDTH) {
      setIsAudioPlaying(false);
      data[0].playerRef.current.pause();
      data[0].playerRef.current.currentTime = 0;
      data[1].playerRef.current.pause();
      data[1].playerRef.current.currentTime = 0;
    }
  }, [indicatorPosition, currentSong, data])

  const renderAudioBars = dataIndex => {
    let extraStyles = {};
    if (dataIndex !== currentSong) {
      extraStyles = {
        visibility: 'hidden',
        height: 0,
        width: 0,
      };
    }

    return (
      <div style={{
        position: 'relative',
        backgroundColor: '#191919',
        height: SOUND_BAR_HEIGHT,
        ...extraStyles
      }}>
        <audio
          src={data[dataIndex].url}
          autoPlay={false}
          ref={data[dataIndex].playerRef}
        />

        <SoundBars
          buffer={data[dataIndex].buffer}
          width={SOUND_BAR_WIDTH}
          height={SOUND_BAR_HEIGHT}
          onClick={onClickSoundBars}
        />

        <TimeIndicator position={indicatorPosition} />
      </div>
    );
  }

  if (loading || currentSong === undefined) {
    return (
      <LoadingSpinner
        style={{
          width: SOUND_BAR_WIDTH,
          height: SOUND_BAR_HEIGHT,
        }}
      />
    );
  }

  return (
    <div
      className='flex-column background-color'
      style={{ width: SOUND_BAR_WIDTH - CONTROLS_WIDTH }}
    >
      <div className='flex-row'>
        <div className='flex-column audio-player__buttons'>
          <PlayButton
            isPlaying={isAudioPlaying}
            onPlay={handlePlayButtonClick}
            onPause={handlePauseButtonClick}
            size={BUTTON_SIZE}
          />

          <SwapButton
            onClick={handleSwapButtonClick}
            size={BUTTON_SIZE}
          />
        </div>

        {renderAudioBars(0)}

        {renderAudioBars(1)}
      </div>

      <TitleDisplay
        name={data[currentSong].name}
        artist={data[currentSong].artist}
        currentTime={
          data[currentSong].playerRef?.current
            ? data[currentSong].playerRef.current.currentTime
            : 0
        }
        totalTime={data[currentSong].buffer.duration}
        width={SOUND_BAR_WIDTH + CONTROLS_WIDTH}
      />
    </div>
  );
};

export default _AudioPlayer;
