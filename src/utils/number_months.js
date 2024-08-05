export default (number, time) => {
  if (number === undefined || number === null) {
    return "";
  }
  return `${number} ${time}`;
};
