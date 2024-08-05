import React from "react";
import PropTypes from "prop-types";

import { Table } from "components/molecules";
import RefLink from "components/pages/dashboard/dashboard_table/cases_table/ref_link";

import DeleteCrossCollateralisedLoan from "./delete_cross_collateralised_loan";

const CrossLink = ({ row }) => <RefLink row={row} target="_blank" />;
CrossLink.propTypes = {
  row: PropTypes.object.isRequired,
};

const columns = [
  {
    Header: "Cross-Collateralised Loans",
    accessor: "caseRef",
    sortType: "basic",
    Cell: CrossLink,
  },

  {
    Header: "Status",
    accessor: "status",
    sortType: "basic",
  },
  {
    Header: "Stage",
    accessor: "stage",
    sortType: "basic",
  },
  {
    Header: "",
    accessor: "delete",
  },
];

const mapCrossCollateralisedLoan = (allowDelete) => (
  crossCollateralisedLoan
) => {
  return {
    ...crossCollateralisedLoan,
    ref_number: crossCollateralisedLoan.caseRef,
    edit_link: `/${crossCollateralisedLoan.stage}/${crossCollateralisedLoan.caseUuid}`,
    delete: allowDelete ? (
      <DeleteCrossCollateralisedLoan
        crossCollateralisedLoan={crossCollateralisedLoan}
        key={crossCollateralisedLoan.CrossCollateralisedLoanId}
      />
    ) : null,
  };
};

function ViewCrossCollateralisedLoans({
  crossCollateralisedLoans = [],
  allowDelete = true,
}) {
  const data = crossCollateralisedLoans.map(
    mapCrossCollateralisedLoan(allowDelete)
  );
  return <Table shouldShowHeaders={true} columns={columns} data={data} />;
}

ViewCrossCollateralisedLoans.propTypes = {
  crossCollateralisedLoans: PropTypes.array,
  allowDelete: PropTypes.bool,
};

export default ViewCrossCollateralisedLoans;
