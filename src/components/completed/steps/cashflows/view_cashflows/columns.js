import { currencyFormat, dateFormat } from "utils";

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
    Header: "Amount",
    accessor: "Amount",
    Cell: ({ row }) => currencyFormat(row.values.Amount),
    sortType: "basic",
  },

  {
    Header: "Balance",
    accessor: "Balance",
    Cell: ({ row }) => currencyFormat(row.values.Balance) ?? "-",
    sortType: "basic",
  },

  {
    Header: "Description",
    accessor: "Description",
  },
];

export default columns;
