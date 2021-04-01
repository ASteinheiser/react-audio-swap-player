import React, { useEffect, useRef } from 'react';

const STEP_WIDTH = 10;

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
    draw({
      data: channelData,
      width: relativeWidth,
      step,
      middle,
      ctx,
    });

    if (onDone) onDone();
  }, [buffer, canvasRef, relativeWidth, height, color, onDone]);

  const draw = ({ width, step, middle, data, ctx }) => {
    for (let i = 0; i < width; i++) {
      let min = 1.0;
      let max = -1.0;

      for (let j = 0; j < step / STEP_WIDTH; j++) {
        let datumSum = 0;
        for (let k = 0; k < STEP_WIDTH; k++) {
          datumSum += data[(i * step) + j + k];
        }
        const datumAvg = datumSum / 10;

        if (datumAvg < min) {
          min = datumAvg;
        } else if (datumAvg > max) {
          max = datumAvg;
        }

        ctx.fillRect(i, (1 + min) * middle, STEP_WIDTH, Math.max(1, (max - min) * middle));
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
