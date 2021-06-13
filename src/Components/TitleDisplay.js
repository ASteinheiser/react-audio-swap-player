const TitleDisplay = ({
  width,
  name,
  currentTime,
  totalTime
}) => {
  const formatTime = timeSeconds => {
    timeSeconds = Math.floor(timeSeconds);
    const timeMinutes = Math.floor(timeSeconds / 60);
    const timeSecondsRemainder = timeSeconds % 60;
    const timeMinutesFormatted = timeMinutes < 10 ? '0' + timeMinutes : timeMinutes;
    const timeSecondsFormatted = timeSecondsRemainder < 10 ? '0' + timeSecondsRemainder : timeSecondsRemainder;

    return `${timeMinutesFormatted}:${timeSecondsFormatted}`;
  }

  const PADDING = 12;
  return (
    <div
      className='title-display__container'
      style={{
        width: width - (2 * PADDING),
        padding: PADDING
      }}>
      <div>{name}</div>
      <div>{`${formatTime(currentTime)} / ${formatTime(totalTime)}`}</div>
    </div>
  )
}

export default TitleDisplay;