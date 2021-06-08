import React, { useEffect, useState } from 'react';
import load from 'audio-loader';

import AudioPlayer from './Components/AudioPlayer';

const MusicURL1 = 'https://test-audio-file.s3-us-west-2.amazonaws.com/Bakar+-+Hell+N+Back+(Official+Video).mp3';
const MusicURL2 = 'https://test-audio-file.s3-us-west-2.amazonaws.com/Tame+Impala+-+The+Less+I+Know+the+Better+(Official+Audio).mp3';

const App = () => {
  const [buffers, setBuffers] = useState([null, null]);

  const fetchSongBuffers = async () => {
    const song1 = await load(MusicURL1);
    const song2 = await load(MusicURL2);
    setBuffers([song1, song2]);
  };

  useEffect(() => fetchSongBuffers(), []);

  return (
    <AudioPlayer
      buffers={buffers}
      urls={[MusicURL1, MusicURL2]}
    />
  );
}

export default App;