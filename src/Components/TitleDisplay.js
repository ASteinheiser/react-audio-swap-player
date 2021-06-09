const PADDING = 12;

const TitleDisplay = ({ width, name, timeStamp }) => {
  return (
    <div
      className='title-display__container'
      style={{
        width: width - (2 * PADDING),
        padding: `${PADDING}px ${PADDING}px 0`
      }}>
      <div>{name}</div>
      <div>{timeStamp}</div>
    </div>
  )
}

export default TitleDisplay;