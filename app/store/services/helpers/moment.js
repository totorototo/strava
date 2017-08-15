export function msToTime(duration = 0) {
  let seconds = parseInt(duration / 1000 % 60, 10);
  let minutes = parseInt(duration / (1000 * 60) % 60, 10);
  let hours = parseInt(duration / (1000 * 60 * 60) % 24, 10);
  let days = parseInt(duration / (1000 * 60 * 60 * 24) % 365, 10);

  days = days < 10 ? `0${days}` : days;
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${days}:${hours}:${minutes}:${seconds}`;
}
