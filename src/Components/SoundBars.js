import React, { useEffect, useRef, useCallback } from 'react';

const STEP_SAMPLE_SIZE = 2;
const STEP_WIDTH = 1;

const SoundBars = ({
  buffer = null,
  width = 500,
  height = 100,
  color = 'black',
  onDone = null,
  onClick = () => {},
}) => {
  const canvasRef = useRef(null);
  const samples = Math.ceil(width / STEP_SAMPLE_SIZE);

  /**
   * Filters the AudioBuffer retrieved from an external source
   * @param {AudioBuffer} audioBuffer the AudioBuffer from drawAudio()
   * @returns {Array} an array of floating point numbers
   */
  const filterData = useCallback(audioBuffer => {
    const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
    const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
    const filteredData = [];
    for (let i = 0; i < samples; i++) {
      let blockStart = blockSize * i; // the location of the first sample in the block
      let sum = 0;
      for (let j = 0; j < blockSize; j++) {
        sum = sum + Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
      }
      filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
    }
    return filteredData;
  }, []);

  /**
   * Draws the audio file into a canvas element.
   * @param {Array} normalizedData The filtered array returned from filterData()
   * @returns {Array} a normalized array of data
   */
  const draw = useCallback(normalizedData => {
    // set up the canvas
    let canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    const padding = 8;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.translate(0, canvas.height / 4);

    // draw the line segments
    const _width = width / normalizedData.length;
    for (let i = 0; i < normalizedData.length; i++) {
      const x = _width * i;
      let height = normalizedData[i] * canvas.height;
      if (height < 0) {
          height = 0;
      } else if (height > canvas.height / 2) {
          height = height > canvas.height / 2;
      }
      drawLineSegment(ctx, x, height - padding, _width, (i + 1) % 2);
    }
  }, []);

  /**
   * A utility function for drawing our line segments
   * @param {AudioContext} ctx the audio context 
   * @param {number} x  the x coordinate of the beginning of the line segment
   * @param {number} height the desired height of the line segment
   * @param {number} width the desired width of the line segment
   * @param {boolean} isEven whether or not the segmented is even-numbered
   */
  const drawLineSegment = (ctx, x, height, width, isEven) => {
    ctx.lineWidth = STEP_WIDTH;
    ctx.strokeStyle = color;
    ctx.beginPath();
    height = isEven ? height : -height;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.arc(x + width / 2, height, width / 2, Math.PI, 0, isEven);
    ctx.lineTo(x + width, 0);
    ctx.stroke();
  };

  useEffect(() => {
    if (!buffer || !canvasRef) return;

    draw(filterData(buffer))

    if (onDone) onDone();
  }, [buffer, canvasRef, onDone, filterData, draw]);

  const handleClick = e => {
    e.preventDefault();
    if (!buffer) return;

    const songPositionPercentage = e.nativeEvent.offsetX / width;
    const second = buffer.duration * songPositionPercentage;
    onClick({ second });
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onClick={handleClick}
    />
  )
};

export default SoundBars;
