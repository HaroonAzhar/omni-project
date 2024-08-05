import { dateFormat } from "utils";

const columns = [
  {
    Header: "Effective From",
    accessor: "EffectiveFrom",
    Cell: ({ row }) => dateFormat(row.values.EffectiveFrom),
  },
  {
    Header: "Status",
    accessor: "Status",
  },

  {
    Header: "Created Date",
    accessor: "CreatedDate",
    Cell: ({ row }) => dateFormat(row.values.CreatedDate),
  },
];

export default columns;
