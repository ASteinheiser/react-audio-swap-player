import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import TimeIndicator from './TimeIndicator';
import SoundBars from './SoundBars';
import LoadingSpinner from './LoadingSpinner';

const WIDTH = 1000;
const SOUND_BAR_HEIGHT = 100;
const CONTROLS_HEIGHT = 70;

const _AudioPlayer = ({
  buffers = [null, null],
  urls = [null, null]
}) => {
  if (!buffers[1] || !urls[1]) {
    return <LoadingSpinner />
  }

  const updateTimeIndicator = (curTime, totalTime) => {
    console.log({ curTime, totalTime })
  }

  return (
    <AudioPlayer
      src={urls[1]}
      listenInterval={250}
      onListen={({ target }) => {
        updateTimeIndicator(target.currentTime, target.duration)
      }}
      customProgressBarSection={[
        <>
          <SoundBars
            buffer={buffers[1]}
            width={WIDTH}
            height={SOUND_BAR_HEIGHT}
          />
          <TimeIndicator
            height={SOUND_BAR_HEIGHT}
            secondsRemaining={buffers[1].duration}
          />
        </>
      ]}
      style={{
        width: WIDTH,
        height: SOUND_BAR_HEIGHT + CONTROLS_HEIGHT,
        padding: '12px 0'
      }}
    />
  );
};

export default _AudioPlayer;
