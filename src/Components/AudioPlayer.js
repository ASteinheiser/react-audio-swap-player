import React, { useState, useEffect } from 'react';
import playAudio from 'audio-play';

import SoundBars from './SoundBars';
import PlayButton from './PlayButton';
import SwitchButton from './SwitchButton';
import LoadingSpinner from './LoadingSpinner';

const AudioPlayer = ({ buffer = null }) => {
  const [loading, setLoading] = useState(true);
  const [audioStart, setAudioStart] = useState(0);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

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

  useEffect(() => {
    if (!audioPlaying && currentTime) {
      const playbackOptions = {
        start: currentTime,
        end: buffer.duration,
        loop: false,
        rate: 1,
        volume: 1,
        autoplay: true
      }
      setAudioPlayer(playAudio(buffer, playbackOptions));
    }
  }, [audioPlaying, currentTime, buffer]);

  const handleToggleAudio = () => {
    if (!audioPlayer) return;
    setCurrentTime(audioPlayer.currentTime);

    if (audioPlaying) {
      audioPlayer.pause();
      setAudioPlaying(false);
    } else {
      audioPlayer.play();
      setAudioPlaying(true);
    }
  }

  const width = 1000;
  const height = 100;

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
          onClick={({ second }) => setAudioStart(second)}
          onDone={() => setLoading(false)}
        />
        {loading && (
          <LoadingSpinner
            style={{
              position: 'absolute',
              top: (height / 2) - 10,
              left: '50%',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
