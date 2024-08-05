import React from "react";

import { Td, Tr } from "./styled_summary_table";

const isObject = (val) => typeof val === "object" && val !== null;

const splitToColumns = (allCells) => {
  const leftColumn = allCells.splice(0, allCells.length / 2);
  const rightColumn = allCells;

  return [leftColumn, rightColumn];
};

const getCell = (label, value, isNested) => (
  <Tr nested={isNested} key={label}>
    <Td>{label}</Td>
    <Td>{value}</Td>
  </Tr>
);

const getCellsFromNestedObject = (
  acc,
  label,
  { value: parentValue, ...nestedValues }
) => {
  const nestedCells = Object.keys(nestedValues).map((key) =>
    getCell(key, nestedValues[key], true)
  );

  return [...acc, getCell(label, parentValue), nestedCells];
};

const getColumnCells = (data) => {
  const allCells = Object.entries(data).reduce((acc, [label, value]) => {
    if (isObject(value)) return getCellsFromNestedObject(acc, label, value);

    return [...acc, getCell(label, value)];
  }, []);

  return splitToColumns(allCells);
};

export default getColumnCells;
