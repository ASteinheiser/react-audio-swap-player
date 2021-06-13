import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PlayButton = ({
  isPlaying = false,
  onPlay = () => {},
  onPause = () => {},
}) => {
  const handleClick = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  }

  return (
    <div className='play-button__container' onClick={handleClick}>
      {isPlaying ? (
        <FontAwesomeIcon icon='pause' style={{ fontSize: 32 }} /> 
      ) : (
        <FontAwesomeIcon icon='play' style={{ fontSize: 32 }} /> 
      )}
    </div>
  );
};

export default PlayButton;