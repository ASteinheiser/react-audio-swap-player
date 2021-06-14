const TitleDisplay = ({
  name,
  artist,
  currentTime,
  totalTime,
  width
}) => {
  const formatTime = timeSeconds => {
    timeSeconds = Math.floor(timeSeconds);
    const timeMinutes = Math.floor(timeSeconds / 60);
    const timeSecondsRemainder = timeSeconds % 60;
    const timeMinutesFormatted = timeMinutes < 10 ? '0' + timeMinutes : timeMinutes;
    const timeSecondsFormatted = timeSecondsRemainder < 10 ? '0' + timeSecondsRemainder : timeSecondsRemainder;

    return `${timeMinutesFormatted}:${timeSecondsFormatted}`;
  }

  const PADDING_WIDTH = 32;
  return (
    <div
      className='title-display__container'
      style={{
        width: width - (PADDING_WIDTH * 2),
        padding: `16px ${PADDING_WIDTH}px 8px`
      }}>
      <div>{`${name} - ${artist}`}</div>
      <div>{`${formatTime(currentTime)} / ${formatTime(totalTime)}`}</div>
    </div>
  )
}

export default TitleDisplay;