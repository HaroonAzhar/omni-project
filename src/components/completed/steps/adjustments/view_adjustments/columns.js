import { currencyFormat, dateFormat } from "utils";

const optionalCurrency = (amount) =>
  amount !== undefined ? currencyFormat(amount) : null;

const optionalDate = (date) => (date !== undefined ? dateFormat(date) : null);

const columns = [
  {
    Header: "Date",
    accessor: "ActualDate",
    Cell: ({ row }) => optionalDate(row.values.ActualDate),
  },
  {
    Header: "Amount",
    accessor: "signedAmount",
    Cell: ({ row }) => optionalCurrency(row.values.signedAmount),
    sortType: "basic",
  },
  {
    Header: "Transaction Type",
    accessor: "TransactionType",
  },
  {
    Header: "Date Created",
    accessor: "Date",
    Cell: ({ row }) => optionalDate(row.values.Date),
  },
  {
    Header: "Created By",
    accessor: "CreatedBy",
  },
  {
    Header: "Description",
    accessor: "Description",
  },
  {
    accessor: "cancel",
    disableSortBy: true,
  },

  {
    accessor: "correct",
    disableSortBy: true,
  },
];

export default columns;
