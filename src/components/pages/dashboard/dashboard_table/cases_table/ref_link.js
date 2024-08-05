import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const RefLink = ({ row, target = "_self" }) => (
  <Link to={row.original.edit_link} target={target}>
    {row.original.ref_number}
  </Link>
);

RefLink.propTypes = {
  row: PropTypes.object.isRequired,
  target: PropTypes.string,
};

export default RefLink;
