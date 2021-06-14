const TimeIndicator = ({ position }) => {
  return (
    <div
      className='time-indicator__line'
      style={{ width: position }}
    />
  );
}

export default TimeIndicator;