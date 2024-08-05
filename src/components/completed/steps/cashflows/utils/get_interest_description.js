const getInterestDescription = (statementEntry) => {
  if (statementEntry.in_extension) {
    return "Extension";
  }
  if (statementEntry.in_default) {
    return "Default";
  }
  return "";
};

export default getInterestDescription;
