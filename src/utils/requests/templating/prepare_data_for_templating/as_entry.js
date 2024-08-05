const asEntry = (name, values) => {
  // Wrap values in an array if it is a simple value
  const valueEntry = values instanceof Array ? values : [values ?? ""];
  const entry = {
    var: name,
    value: valueEntry,
  };
  return entry;
};

export default asEntry;
