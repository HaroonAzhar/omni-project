import { dateFormat, timeFormat } from "utils";

import LinkToCase from "./link_to_case";
import NoteCell from "./note_cell";

const columns = [
  {
    Header: "Case No",
    accessor: "CaseNr",
    Cell: LinkToCase,
  },
  {
    Header: "Name",
    accessor: "Name",
  },
  {
    Header: "Due",
    accessor: "DueDate",
    Cell: ({ row }) =>
      `${dateFormat(row.values.DueDate)} ${timeFormat(row.original.DueTime)}`,
  },
  {
    Header: "Notes",
    accessor: "Notes",
    Cell: NoteCell,
  },
];

export default columns;
