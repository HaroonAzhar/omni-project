import { currencyFormat, dateFormat } from "utils";

const columns = [
  {
    Header: "Actual Date",
    accessor: "ActualDate",
    Cell: ({ row }) => dateFormat(row.values.ActualDate),
  },
  {
    Header: "Amount",
    accessor: "Amount",
    Cell: ({ row }) => currencyFormat(row.values.Amount),
    sortType: "basic",
  },
  {
    Header: "Description",
    accessor: "Description",
  },
  {
    Header: "Created By",
    accessor: "CreatedBy",
  },

  {
    Header: "Created Date",
    accessor: "CreatedDate",
    Cell: ({ row }) => dateFormat(row.values.CreatedDate),
  },
];

export default columns;
