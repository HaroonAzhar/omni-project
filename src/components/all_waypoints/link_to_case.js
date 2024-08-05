import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const LinkToCase = ({ row }) => (
  <Link to={`/completed/${row.original.Id}/checklist/waypoints`}>
    {row.values.CaseNr}
  </Link>
);

LinkToCase.propTypes = {
  row: PropTypes.object.isRequired,
};

export default LinkToCase;
