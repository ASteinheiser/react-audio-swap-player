import React, { useEffect, useState } from 'react';
import load from 'audio-loader';

import AudioPlayer from './Components/AudioPlayer';
import MusicData from './data.json';

const App = () => {
  const [buffers, setBuffers] = useState([null, null]);
  const [loading, setLoading] = useState(true);

  const fetchSongBuffers = async () => {
    setBuffers([
      await load(MusicData[0].url),
      await load(MusicData[1].url)
    ]);
    setLoading(false);
  };

  useEffect(() => fetchSongBuffers(), []);

  const data = [...MusicData];
  data[0].buffer = buffers[0];
  data[1].buffer = buffers[1];

  return <AudioPlayer data={data} loading={loading} />;
}

export default App;