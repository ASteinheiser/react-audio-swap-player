import React, { useEffect, useState } from 'react';
import load from 'audio-loader';

import AudioPlayer from './AudioPlayer';

const App = () => {
  const [buffer, setBuffer] = useState(null);

  useEffect(() => {
    load('http://example.net/audio/file.mp3').then(setBuffer);
  }, []);

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