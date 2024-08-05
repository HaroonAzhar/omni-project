import { currencyFormat } from "utils";

const formatCurrencyCell = (cellName) => ({ row }) =>
  currencyFormat(row.values[cellName]) || "-";

export default [
  {
    Header: "",
    accessor: "row_name",
  },
  {
    Header: "Gross Value",
    accessor: "gross_value",
    Cell: formatCurrencyCell("gross_value"),
  },
  {
    Header: "Debt",
    accessor: "debt",
    Cell: formatCurrencyCell("debt"),
  },
  {
    Header: "Net Value",
    accessor: "net_value",
    Cell: formatCurrencyCell("net_value"),
  },
  {
    Header: "Monthly Mortgage",
    accessor: "monthly_mortgage",
    Cell: formatCurrencyCell("monthly_mortgage"),
  },
  {
    Header: "Monthly Rental",
    accessor: "monthly_rental",
    Cell: formatCurrencyCell("monthly_rental"),
  },
];
