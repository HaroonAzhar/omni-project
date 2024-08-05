const buildRowsForPercents = (tree = [], multiply = 1, rows = []) => {
  for (let i = 0; i < tree.length; i += 1) {
    const item = tree[i];

    const held = (parseFloat(item.held.toString()) * multiply) / 100;

    if (!item.isCompany) {
      rows.push({
        lines: [],
        name: item.name,
        held,
      });
    } else {
      buildRowsForPercents(item.company, held, rows);
    }
  }

  return rows;
};

export default buildRowsForPercents;
