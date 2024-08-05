import React from "react";
import PropTypes from "prop-types";

import { Table } from "components/molecules";
import { percentFormat, dateFormat, currencyFormat } from "utils";

const TempResultsTable = ({
  currentStatement,
  newStatement,
  maturityStatement,
}) => {
  const statements = [
    { ...currentStatement, description: "Current" },
    { ...(newStatement ?? {}), description: "After Drawdown" },
    { ...maturityStatement, description: "At Maturity" },
  ].filter((statement) => statement.to !== undefined);
  return (
    <Table
      columns={[
        {
          Header: "",
          accessor: "description",
        },
        {
          Header: "Date",
          accessor: "to",
          Cell: ({ row }) => dateFormat(row.values.to),
          sortType: "basic",
        },
        {
          Header: "End Balance",
          accessor: "end_balance",
          Cell: ({ row }) => currencyFormat(row.values.end_balance),
          sortType: "basic",
        },
        {
          Header: "LTV",
          accessor: "ltv",
          Cell: ({ row }) => percentFormat(row.values.ltv),
          sortType: "basic",
        },
        {
          Header: "LTGDV",
          accessor: "gdv",
          Cell: ({ row }) => percentFormat(row.values.gdv),
          sortType: "basic",
        },
      ]}
      data={statements}
      shouldShowHeaders={true}
    />
  );
};

TempResultsTable.propTypes = {
  currentStatement: PropTypes.object,
  maturityStatement: PropTypes.object,
  newStatement: PropTypes.object,
};

export default TempResultsTable;
