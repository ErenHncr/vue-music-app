const timeUnits = { minute: 60 };

const formatNumberToTwoDigit = (number = 0) => number.toLocaleString('en-US', {
  minimumIntegerDigits: 2,
  useGrouping: false,
});

// time param in seconds
const formatTime = (time) => {
  const minutes = Math.floor(time / timeUnits.minute) || 0;
  const seconds = Math.round((time - minutes * timeUnits.minute)) || 0;
  return `${formatNumberToTwoDigit(minutes)}:${formatNumberToTwoDigit(seconds)}`;
};

const diffTime = (d1, d2) => {
  try {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    const diffDate = Math.abs(date2 - date1);
    const seconds = Math.floor(diffDate / 1000);
    const minutes = Math.floor(seconds / timeUnits.minute);
    return { seconds, minutes };
  } catch (error) {
    return { seconds: 0, minutes: 0 };
  }
};

export {
  formatTime,
  formatNumberToTwoDigit,
  diffTime,
};
export default formatTime;
