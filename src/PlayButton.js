import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PlayButton = ({
  onClick = () => {}
}) => {
  return (
    <div className='play-button__container' onClick={onClick}>
      <FontAwesomeIcon icon='play' style={{ fontSize: 36 }} />
    </div>
  );
};

export default PlayButton;
