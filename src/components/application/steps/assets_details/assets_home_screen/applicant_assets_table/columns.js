import { humanize } from "inflected";

import currencyFormat from "utils/currency_format";

const formatCurrencyCell = (cellName) => ({ row }) =>
  currencyFormat(row.values[cellName]) || "-";

export default [
  {
    Header: "Asset Type",
    accessor: "type",
    Cell: ({ row }) => humanize(row.values.type),
  },
  {
    Header: "Description",
    accessor: "description",
  },
  {
    Header: "Gross Value",
    accessor: "gross_value",
    Cell: formatCurrencyCell("gross_value"),
  },
  {
    Header: "Debt",
    accessor: "outstanding_debt",
    Cell: formatCurrencyCell("outstanding_debt"),
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
  {
    Header: "",
    accessor: "_buttons",
  },
];
