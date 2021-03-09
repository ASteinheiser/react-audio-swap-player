import React, { useEffect, useRef } from 'react';

const SoundBars = ({
  buffer = null,
  width = 500,
  height = 100,
  zoom = 1,
  color = 'black',
  onDone = null,
  onClick = () => {},
}) => {
  const canvasRef = useRef(null);
  const relativeWidth = width * zoom;

  useEffect(() => {
    if (!buffer || !canvasRef) return;

    const middle = height / 2;

    const channelData = buffer.getChannelData(0);
    const step = Math.ceil(channelData.length / relativeWidth);

    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = color;
    draw(relativeWidth, step, middle, channelData, ctx);

    if (onDone) onDone();
  }, [buffer, canvasRef, relativeWidth, height, color, onDone]);

  const draw = (width, step, middle, data, ctx) => {
    for (let i = 0; i < width; i++) {
      let min = 1.0;
      let max = -1.0;

      for (let j = 0; j < step; j++) {
        let datum = data[(i * step) + j];

        if (datum < min) {
          min = datum;
        } else if (datum > max) {
          max = datum;
        }

        ctx.fillRect(i, (1 + min) * middle, 1, Math.max(1, (max - min) * middle));
      }
    }
  }

  const handleClick = e => {
    e.preventDefault();
    if (!buffer) return;

    const songPositionPercentage = e.nativeEvent.offsetX / relativeWidth;
    const second = buffer.duration * songPositionPercentage;
    onClick({ second });
  }

  return (
    <canvas
      ref={canvasRef}
      width={relativeWidth}
      height={height}
      onClick={handleClick}
    />
  )
};

export default SoundBars;
