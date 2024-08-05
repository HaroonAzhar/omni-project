import React from "react";
import PropTypes from "prop-types";

import { Table } from "components/molecules";
import { currencyFormat, dateFormat } from "utils";

function ViewSecurityValuations({ valuations = [] }) {
  const valuationData = valuations.map((valuation) => ({
    ...valuation,
    valuationType: valuation.ValuationType.includes("Other")
      ? `Other - ${valuation.ValuationTypeOther}`
      : valuation.ValuationType,
  }));
  return (
    <Table
      columns={[
        {
          Header: "Valuation",
          accessor: "Valuation",
          Cell: ({ row }) => currencyFormat(row.values.Valuation),
          sortType: "basic",
        },

        {
          Header: "GDV",
          accessor: "GDV",
          Cell: ({ row }) => currencyFormat(row.values.GDV),
          sortType: "basic",
        },
        {
          Header: "Valuer",
          accessor: "Valuer",
        },
        {
          Header: "Valuation Date",
          accessor: "ValuationDate",
          Cell: ({ row }) => dateFormat(row.values.ValuationDate),
        },
        {
          Header: "Report Date",
          accessor: "ReportDate",
          Cell: ({ row }) => dateFormat(row.values.ReportDate),
        },
        {
          Header: "Recipient Name",
          accessor: "RecipientName",
        },

        {
          Header: "Valuation Type",
          accessor: "valuationType",
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
      ]}
      data={valuationData}
      shouldShowHeaders
      sortable
    />
  );
}

ViewSecurityValuations.propTypes = {
  valuations: PropTypes.array,
};

export default ViewSecurityValuations;
