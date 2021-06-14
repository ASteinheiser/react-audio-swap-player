import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoadingSpinner = props => {
  return (
    <div {...props} className='loading-spinner__container background-color'>
      <FontAwesomeIcon
        icon='spinner'
        className='fa-pulse loading-spinner__icon'
      />
    </div>
  );
};

export default LoadingSpinner;
