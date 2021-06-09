import React, { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import TimeIndicator from './TimeIndicator';
import SoundBars from './SoundBars';
import LoadingSpinner from './LoadingSpinner';

const WIDTH = 1000;
const INDICATOR_WIDTH = 4;
const SOUND_BAR_HEIGHT = 100;
const CONTROLS_HEIGHT = 70;

const _AudioPlayer = ({
  buffers = [null, null],
  urls = [null, null]
}) => {
  const [indicatorPosition, setIndicatorPosition] = useState(0);

  if (!buffers[1] || !urls[1]) {
    return <LoadingSpinner />;
  }

  const updateTimeIndicator = (curTime, totalTime) => {
    const songTimePercentage = curTime / totalTime;
    let indicatorPositionPx = songTimePercentage * WIDTH;
    if (indicatorPositionPx > WIDTH - INDICATOR_WIDTH) {
      indicatorPositionPx = WIDTH - INDICATOR_WIDTH;
    }
    setIndicatorPosition(indicatorPositionPx);
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
            position={indicatorPosition}
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
