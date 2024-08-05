import React from "react";
import PropTypes from "prop-types";

import { Table } from "components/molecules";
import { dateFormat } from "utils";

function ViewSecurityNotes({ notes = [] }) {
  return (
    <Table
      columns={[
        {
          Header: "Text",
          accessor: "Text",
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
      data={notes}
      shouldShowHeaders
      sortable
    />
  );
}

ViewSecurityNotes.propTypes = {
  notes: PropTypes.array,
};

export default ViewSecurityNotes;
