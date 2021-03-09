import React from 'react';

import SoundBars from './SoundBars';

const AudioPlayer = ({ buffer = null }) => {
  return (
    <SoundBars
      buffer={buffer}
      width={500}
      height={100}
      zoom={1}
      color={'black'}
      onDone={null}
    />
  );
};

export default AudioPlayer;
