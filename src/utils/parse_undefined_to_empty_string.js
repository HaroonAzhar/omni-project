const parseUndefinedToEmptyString = (value) => {
  if (value === undefined) {
    return "";
  }
  return value;
};

export default parseUndefinedToEmptyString;
