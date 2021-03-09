import React, { useEffect, useState } from 'react';
import load from 'audio-loader';

import AudioPlayer from './AudioPlayer';

const MusicURL = 'https://test-audio-file.s3-us-west-2.amazonaws.com/Bakar+-+Hell+N+Back+(Official+Video).mp3';

const App = () => {
  const [buffer, setBuffer] = useState(null);

  useEffect(() => load(MusicURL).then(setBuffer), []);

  return (
    <AudioPlayer
      buffer={buffer}
      width={500}
      height={100}
      zoom={1}
      color={'black'}
      onDone={null}
    />
  )
}

export default App;