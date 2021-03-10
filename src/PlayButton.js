import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PlayButton = ({
  onClick = () => {}
}) => {
  return (
    <FontAwesomeIcon icon='play' onClick={onClick()} />
  );
};

export default PlayButton;
