import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SwapButton = ({
  onClick = () => {}
}) => {
  return (
    <div className='switch-button__container' onClick={onClick}>
      <FontAwesomeIcon icon='sync' style={{ fontSize: 28 }} />
    </div>
  );
};

export default SwapButton;
