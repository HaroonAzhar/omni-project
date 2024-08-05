import { dateFormat } from "utils";

const columns = [
  {
    Header: "Type",
    accessor: "Type",
  },
  {
    Header: "Date",
    accessor: "Date",
    Cell: ({ row }) => dateFormat(row.values.Date),
  },
  {
    Header: "Created Date",
    accessor: "CreatedDate",
    Cell: ({ row }) => dateFormat(row.values.CreatedDate),
  },
  {
    Header: "",
    accessor: "delete",
    disableSortBy: true,
  },
];

export default columns;
