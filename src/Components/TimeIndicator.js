import { keyframes } from 'styled-components';

const TimeIndicator = ({ timeOffsetPx, secondsRemaining, playing }) => {
  const animation = keyframes`
    0% { left: 12px; }
    100% { left: calc(100% - 12px); }
  `;

  return (
    <div
      className='time-indicator__line'
      style={{
        animationName: animation,
        animationDuration: `${secondsRemaining}s`,
        animationTimingFunction: 'linear',
        animationPlayState: playing ? 'running' : 'paused',
      }}
    />
  );
}

export default TimeIndicator;