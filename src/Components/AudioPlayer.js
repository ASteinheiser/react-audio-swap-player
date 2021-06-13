import React, { useState, useRef, useEffect } from 'react';
import throttle from 'lodash.throttle';

import PlayButton from './PlayButton';
import SwapButton from './SwapButton';
import SoundBars from './SoundBars';
import TimeIndicator from './TimeIndicator';
import LoadingSpinner from './LoadingSpinner';

const WIDTH = 1000;
const SOUND_BAR_HEIGHT = 100;
const CONTROLS_HEIGHT = 70;
const INDICATOR_WIDTH = 4;
const INDICATOR_HEIGHT_PADDING = 10;

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
    let indicatorPositionPx = songTimePercentage * WIDTH;
    if (indicatorPositionPx > WIDTH - INDICATOR_WIDTH) {
      indicatorPositionPx = WIDTH - INDICATOR_WIDTH;
    }
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
      <div style={{ position: 'relative', ...extraStyles }}>
        <audio
          src={data[dataIndex].url}
          autoPlay={false}
          ref={data[dataIndex].playerRef}
        />

        <SoundBars
          buffer={data[dataIndex].buffer}
          width={WIDTH}
          height={SOUND_BAR_HEIGHT}
          onClick={onClickSoundBars}
        />

        <TimeIndicator
          height={SOUND_BAR_HEIGHT + INDICATOR_HEIGHT_PADDING}
          position={indicatorPosition}
        />
      </div>
    );
  }

  const audioPlayerDimensions = {
    width: WIDTH,
    height: SOUND_BAR_HEIGHT + CONTROLS_HEIGHT,
  };

  return (
    <>
      {(loading || currentSong === undefined)
        ? <LoadingSpinner style={audioPlayerDimensions} />
        : (
          <>
            {renderAudioBars(0)}

            {renderAudioBars(1)}

            <PlayButton
              isPlaying={isAudioPlaying}
              onPlay={handlePlayButtonClick}
              onPause={handlePauseButtonClick}
            />

            <SwapButton onClick={handleSwapButtonClick} />
          </>
        )
      }
    </>
  );
};

export default _AudioPlayer;
