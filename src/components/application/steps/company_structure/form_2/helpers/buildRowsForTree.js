const buildRowsForTree = (
  tree = [],
  _multiply = 1,
  treeStructureMarks = [],
  rows = []
) => {
  for (let i = 0; i < tree.length; i += 1) {
    const item = tree[i];

    const held = parseFloat(item.held.toString()) / 100;
    const rowTreeStructureMarks = [
      ...treeStructureMarks,
      i < tree.length - 1 ? "+" : "-",
    ];
    const childTreeStructureMarks = [
      ...treeStructureMarks,
      i < tree.length - 1 ? "|" : "",
    ];

    rows.push({
      lines: rowTreeStructureMarks,
      name: item.name,
      held,
    });

    if (item.isCompany) {
      buildRowsForTree(item.company, held, childTreeStructureMarks, rows);
    }
  }

  return rows;
};

export default buildRowsForTree;
