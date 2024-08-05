const sortByName = (a, b) => a.name.localeCompare(b.name);
const sortByHeld = (a, b) => a.held - b.held;

const accumulateByName = (rows) => {
  const sortedRows = rows.sort(sortByName);

  const accumulatedRows = [];

  let name = "";

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < sortedRows.length; i++) {
    const currentName = sortedRows[i].name;

    if (currentName !== name) {
      accumulatedRows.push({
        ...sortedRows[i],
        held: 0,
      });
    }

    accumulatedRows[accumulatedRows.length - 1].held += sortedRows[i].held;

    name = currentName;
  }

  return accumulatedRows.sort(sortByHeld);
};

export default accumulateByName;
