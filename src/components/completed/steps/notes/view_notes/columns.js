import { dateFormat } from "utils";

const columns = [
  {
    Header: "Text",
    accessor: "Text",
  },
  {
    Header: "Created Date",
    accessor: "CreatedDate",
    Cell: ({ row }) => dateFormat(row.values.CreatedDate),
  },
  {
    Header: "Created By",
    accessor: "CreatedBy",
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
