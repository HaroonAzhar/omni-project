import React from "react";
import PropTypes from "prop-types";

import { currencyFormat, dateFormat } from "utils";
import { Table } from "components/molecules";

import DeleteExpectedDrawdown from "./delete_expected_drawdown";
import EditExpectedDrawdown from "./edit_expected_drawdown";
import StartDrawdown from "./start_drawdown/start_drawdown";

const columns = [
  {
    Header: "Date",
    accessor: "Date",
    Cell: ({ row }) => dateFormat(row.values.Date),
    sortType: "basic",
  },
  {
    Header: "Amount",
    accessor: "Amount",
    Cell: ({ row }) => currencyFormat(row.values.Amount),
    sortType: "basic",
  },
  {
    Header: "",
    accessor: "edit",
  },

  {
    Header: "",
    accessor: "delete",
  },

  {
    Header: "",
    accessor: "startDrawdown",
  },
];

const mapExpectedDrawdown = (expectedDrawdown) => ({
  ...expectedDrawdown,
  delete: (
    <DeleteExpectedDrawdown
      expectedDrawdown={expectedDrawdown}
      key={expectedDrawdown.ExpectedDrawdownId}
    />
  ),
  edit: (
    <EditExpectedDrawdown
      expectedDrawdown={expectedDrawdown}
      key={expectedDrawdown.ExpectedDrawdownId}
    />
  ),
  startDrawdown: (
    <StartDrawdown
      expectedDrawdown={expectedDrawdown}
      key={expectedDrawdown.ExpectedDrawdownId}
    />
  ),
});

function ViewExpectedDrawdowns({ expectedDrawdowns = [] }) {
  const data = expectedDrawdowns.map(mapExpectedDrawdown);
  return <Table shouldShowHeaders={true} columns={columns} data={data} />;
}

ViewExpectedDrawdowns.propTypes = {
  expectedDrawdowns: PropTypes.array,
};

export default ViewExpectedDrawdowns;
