import React, { useState, useEffect, useMemo } from 'react';
import playAudio from 'audio-play';

import TimeIndicator from './TimeIndicator';
import SoundBars from './SoundBars';
import PlayButton from './PlayButton';
import SwitchButton from './SwitchButton';
import LoadingSpinner from './LoadingSpinner';

const WIDTH = 1000;
const HEIGHT = 100;

const AudioPlayer = ({ buffers = [null, null] }) => {
  const [buffer1, buffer2] = buffers;
  const [curBuffer, setCurBuffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [audioStart, setAudioStart] = useState(0);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (curBuffer === null && buffer1) {
      setCurBuffer(buffer1);
    }
  }, [buffer1, curBuffer, setCurBuffer]);

  useEffect(() => {
    if (!curBuffer) return;

    const playbackOptions = {
      start: audioStart,
      end: curBuffer.duration,
      loop: false,
      rate: 1,
      volume: 1,
      autoplay: true
    }
    const playback = playAudio(curBuffer, playbackOptions);
    setAudioPlayer(playback);

    if (audioStart > 0) {
      playback.play();
      setAudioPlaying(true);
    }

    return () => playback.pause();
  }, [audioStart, curBuffer]);

  useEffect(() => {
    if (!audioPlaying && currentTime) {
      const playbackOptions = {
        start: currentTime,
        end: curBuffer.duration,
        loop: false,
        rate: 1,
        volume: 1,
        autoplay: true
      }
      setAudioPlayer(playAudio(curBuffer, playbackOptions));
    }
  }, [audioPlaying, currentTime, curBuffer]);

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

  const handleSwitchAudio = () => {
    if (curBuffer === buffer1) {
      setCurBuffer(buffer2);
    } else {
      setCurBuffer(buffer1);
    }
  }

  const getTimeOffsetPx = useMemo(() => {
    if (!curBuffer) return;

    const currentTimePercentage = currentTime / curBuffer.duration;
    return WIDTH * currentTimePercentage;
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [curBuffer, currentTime, audioPlaying])

  return (
    <div className='audio-player__container' style={{ width: WIDTH }}>
      <div className='audio-player__buttons'>
        <PlayButton onClick={handleToggleAudio} active={audioPlaying} />

        <SwitchButton onClick={handleSwitchAudio} />
      </div>

      <div className='sound-bar__container'>
        <SoundBars
          buffer={curBuffer}
          width={WIDTH}
          height={HEIGHT}
          onClick={({ second }) => setAudioStart(second)}
          onDone={() => setLoading(false)}
        />

        {!loading && (
          <TimeIndicator
            playing={audioPlaying}
            timeOffsetPx={() => getTimeOffsetPx()}
            secondsRemaining={curBuffer.duration - currentTime}
          />
        )}

        {loading && <LoadingSpinner className='loading-spinner__container' />}
      </div>
    </div>
  );
};

export default AudioPlayer;
