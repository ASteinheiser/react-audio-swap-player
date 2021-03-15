import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PlayButton = ({
  active = false,
  onClick = () => {}
}) => {
  return (
    <div className='play-button__container' onClick={onClick}>
      {active ? (
        <FontAwesomeIcon icon='pause' style={{ fontSize: 36 }} /> 
      ) : (
        <FontAwesomeIcon icon='play' style={{ fontSize: 36 }} /> 
      )}
    </div>
  );
};

export default PlayButton;
