import { useEffect } from 'react';

const TimeIndicator = ({ height, currentTime, playing }) => {
  return (
    <div
      className='time-indicator__line'
      style={{ height }}
    />
  );
}

export default TimeIndicator;