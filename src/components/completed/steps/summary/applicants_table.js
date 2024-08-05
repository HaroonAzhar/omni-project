import React from "react";
import PropTypes from "prop-types";

import { Table } from "components/molecules";

const MultiLineCell = ({ cell: { value } }) => {
  return (
    <>
      {(value || []).map((val) => (
        <div>{val}</div>
      ))}
    </>
  );
};

MultiLineCell.propTypes = {
  cell: PropTypes.object.isRequired,
};

const applicantColumns = [
  {
    Header: `Applicants`,
    accessor: "index",
  },
  {
    Header: "",
    accessor: "name",
  },
  {
    Header: "Address",
    accessor: "address",
    Cell: MultiLineCell,
  },
  {
    Header: "Phone",
    accessor: "phone",
    Cell: MultiLineCell,
  },
  {
    Header: "Email",
    accessor: "email",
  },
];

const ApplicantsTable = ({ applicants }) => {
  return (
    <Table
      columns={applicantColumns}
      data={applicants}
      shouldShowHeaders={true}
    />
  );
};

ApplicantsTable.propTypes = {
  applicants: PropTypes.array.isRequired,
};

export default ApplicantsTable;
