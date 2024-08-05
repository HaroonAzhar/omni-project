import { dateFormat } from "utils";

const columns = [
  {
    Header: "Date",
    accessor: "Date",
    Cell: ({ row }) => dateFormat(row.values.Date),
  },
  {
    Header: "Interest Rate",
    accessor: "InterestRate",
  },

  {
    Header: "Created Date",
    accessor: "CreatedDate",
    Cell: ({ row }) => dateFormat(row.values.CreatedDate),
  },
];

export default columns;
