import React, { useState, useRef, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import TimeIndicator from './TimeIndicator';
import SoundBars from './SoundBars';
import SwitchButton from './SwitchButton';
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
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSong, setCurrentSong] = useState(null);
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const playerRef = useRef();

  useEffect(() => {
    if (currentSong === null && data[0] !== null) {
      setCurrentSong(data[0]);
    }
  }, [currentSong, data])

  useEffect(() => {
    if (currentSong !== null && playerRef.current) {
      playerRef.current.audio.current.currentTime = currentTime;
    }
  }, [currentSong, currentTime])

  if (loading || !currentSong) return <LoadingSpinner />;

  const handleChangeSong = () => {
    if (!playerRef.current) return;
    setCurrentTime(playerRef.current.audio.current.currentTime)

    if (currentSong.url === data[0].url) {
      setCurrentSong(data[1]);
    } else {
      setCurrentSong(data[0]);
    }
  }

  const updateTimeIndicator = (curTime, totalTime) => {
    const songTimePercentage = curTime / totalTime;
    let indicatorPositionPx = songTimePercentage * WIDTH;
    if (indicatorPositionPx > WIDTH - INDICATOR_WIDTH) {
      indicatorPositionPx = WIDTH - INDICATOR_WIDTH;
    }
    setIndicatorPosition(indicatorPositionPx);
  }

  const onAudioTimeUpdate = ({ target }) => {
    updateTimeIndicator(target.currentTime, target.duration);
  }

  const onClickSoundBars = ({ second }) => {
    if (!playerRef.current) return;
    playerRef.current.audio.current.currentTime = second;

    updateTimeIndicator(second, currentSong.buffer.duration);
  }

  const renderProgressBar = () => (
    <>
      <SoundBars
        buffer={currentSong.buffer}
        width={WIDTH}
        height={SOUND_BAR_HEIGHT}
        onClick={onClickSoundBars}
      />
      <TimeIndicator
        height={SOUND_BAR_HEIGHT + INDICATOR_HEIGHT_PADDING}
        position={indicatorPosition}
      />
    </>
  )

  const renderSwitchTrackButton = () => (
    <SwitchButton onClick={handleChangeSong} />
  )

  return (
    <AudioPlayer
      src={currentSong.url}
      ref={playerRef}
      style={{
        width: WIDTH,
        height: SOUND_BAR_HEIGHT + CONTROLS_HEIGHT,
        padding: '12px 0'
      }}
      listenInterval={250}
      onListen={onAudioTimeUpdate}
      customProgressBarSection={[renderProgressBar()]}
      customAdditionalControls={[renderSwitchTrackButton()]}
    />
  );
};

export default _AudioPlayer;
