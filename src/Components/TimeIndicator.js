const TimeIndicator = ({ height, position }) => {
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