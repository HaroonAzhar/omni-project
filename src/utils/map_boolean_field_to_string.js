const mapBooleanFieldsToStrings = (value) => {
  if (value === true) return "yes";
  if (value === false) return "no";
  else return undefined;
};

export default mapBooleanFieldsToStrings;
