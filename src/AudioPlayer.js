import React from 'react';

import SoundBars from './SoundBars';

const AudioPlayer = ({ buffer = null }) => {
  const width = 1000;
  const height = 100;
  const zoom = 1;
  const color = 'black';

  return (
    <SoundBars
      buffer={buffer}
      width={width}
      height={height}
      zoom={zoom}
      color={color}
      onClick={(e) => console.log(e)}
    />
  );
};

export default AudioPlayer;
