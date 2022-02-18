const timeUnits = { minute: 60 };

const formatNumberToTwoDigit = (number = 0) => number.toLocaleString('en-US', {
  minimumIntegerDigits: 2,
  useGrouping: false,
});

const formatTime = (time) => {
  const minutes = Math.floor(time / timeUnits.minute) || 0;
  const seconds = Math.round((time - minutes * timeUnits.minute)) || 0;
  return `${formatNumberToTwoDigit(minutes)}:${formatNumberToTwoDigit(seconds)}`;
};

export { formatTime, formatNumberToTwoDigit };
export default formatTime;
