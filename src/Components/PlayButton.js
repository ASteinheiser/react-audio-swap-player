import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PlayButton = ({
  isPlaying = false,
  onPlay = () => {},
  onPause = () => {},
  size = 28
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
        <FontAwesomeIcon icon='pause' style={{ fontSize: size }} /> 
      ) : (
        <FontAwesomeIcon icon='play' style={{ fontSize: size }} /> 
      )}
    </div>
  );
};

export default PlayButton;