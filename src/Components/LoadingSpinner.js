import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoadingSpinner = props => {
  return (
    <div {...props}>
      <FontAwesomeIcon className='fa-pulse' icon='spinner' style={{ fontSize: 36 }} />
    </div>
  );
};

export default LoadingSpinner;
