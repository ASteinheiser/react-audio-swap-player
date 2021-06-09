const PADDING = 12;

const TitleDisplay = ({ width, name, timeStamp }) => {
  return (
    <div
      className='title-display__container'
      style={{
        width: width - (2 * PADDING),
        padding: `${PADDING}px ${PADDING}px ${PADDING}px`
      }}>
      <div>{name}</div>
      <div>{timeStamp}</div>
    </div>
  )
}

export default TitleDisplay;