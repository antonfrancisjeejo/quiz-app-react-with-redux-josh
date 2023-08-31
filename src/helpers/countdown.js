//generates timer from given seconds value
function timer(duration) {
  let seconds = duration % 60;
  let secondsInMinutes = (duration - seconds) / 60;
  let minutes = secondsInMinutes % 60;
  let hours = (secondsInMinutes - minutes) / 60;

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return {
    hours,
    minutes,
    seconds,
  };
}

export default timer;
