export default (number) => {
  if (number === undefined) {
    return "";
  }
  return `${(+number * 100).toFixed(2)}%`;
};
