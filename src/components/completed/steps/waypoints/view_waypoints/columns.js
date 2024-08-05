import { dateFormat, timeFormat } from "utils";

const columns = [
  {
    Header: "Due",
    accessor: "DueDate",
    Cell: ({ row }) =>
      `${dateFormat(row.values.DueDate)} ${timeFormat(row.original.DueTime)}`,
  },
  {
    Header: "Name",
    accessor: "Name",
  },
  {
    Header: "Category",
    accessor: "Category",
  },
  {
    Header: "Notes",
    accessor: "Notes",
  },
  {
    Header: "Completed",
    accessor: "isCompleted",
    disableSortBy: true,
  },
  {
    Header: "",
    accessor: "edit",
    disableSortBy: true,
  },
  {
    Header: "",
    accessor: "delete",
    disableSortBy: true,
  },
];

export default columns;
