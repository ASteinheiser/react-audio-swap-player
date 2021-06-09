const TimeIndicator = ({ height, position }) => {
  if (isNaN(position)) position = 0;
  return (
    <div
      className='time-indicator__line'
      style={{
        height,
        left: position,
      }}
    />
  );
}

export default TimeIndicator;