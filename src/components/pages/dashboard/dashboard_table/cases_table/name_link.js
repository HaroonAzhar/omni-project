import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NameLink = ({ row }) => (
  <Link to={row.original.edit_link}>{row.original.name} </Link>
);

NameLink.propTypes = {
  row: PropTypes.object.isRequired,
};

export default NameLink;
