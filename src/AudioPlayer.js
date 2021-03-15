import React, { useState, useEffect } from 'react';
import playAudio from 'audio-play';

import SoundBars from './SoundBars';
import PlayButton from './PlayButton';
import SwitchButton from './SwitchButton';

const AudioPlayer = ({ buffer = null }) => {
  const [audioStart, setAudioStart] = useState(0);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const width = 1000;
  const height = 100;
  const zoom = 1;
  const color = 'black';

  useEffect(() => {
    if (!buffer) return;

    const playbackOptions = {
      start: audioStart,
      end: buffer.duration,
      loop: false,
      rate: 1,
      volume: 1,
      autoplay: true
    }
    const playback = playAudio(buffer, playbackOptions);
    setAudioPlayer(playback);

    if (audioStart > 0) {
      playback.play();
      setAudioPlaying(true);
    }

    return () => playback.pause();
  }, [audioStart, buffer]);

  const handleToggleAudio = () => {
    if (!audioPlayer) return;

    if (audioPlaying) {
      audioPlayer.pause();
      setAudioPlaying(false);
    } else {
      audioPlayer.play();
      setAudioPlaying(true);
    }
  }

  return (
    <div className='audio-player__container' style={{ width }}>
      <div className='audio-player__buttons'>
        <PlayButton onClick={handleToggleAudio} active={audioPlaying} />

        <SwitchButton onClick={e => console.log(e)} />
      </div>

      <div className='sound-bar__container'>
        <SoundBars
          buffer={buffer}
          width={width}
          height={height}
          zoom={zoom}
          color={color}
          onClick={({ second }) => setAudioStart(second)}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
