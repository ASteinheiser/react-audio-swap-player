import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SwapButton = ({
  onClick = () => {},
  size = 28
}) => {
  return (
    <div className='switch-button__container' onClick={onClick}>
      <FontAwesomeIcon icon='sync' style={{ fontSize: size }} />
    </div>
  );
};

export default SwapButton;
