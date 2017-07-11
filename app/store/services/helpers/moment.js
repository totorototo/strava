export function convert(secondes = 0) {
  const date = new Date(null);
  date.setSeconds(secondes);
  return date.toISOString().substr(11, 8);
}
