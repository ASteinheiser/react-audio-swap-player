import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SwitchButton = ({
  onClick = () => {}
}) => {
  return (
    <div className='switch-button__container' onClick={onClick}>
      <FontAwesomeIcon icon='sync' style={{ fontSize: 32 }} />
    </div>
  );
};

export default SwitchButton;
