import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as DeleteSvg } from "./svg/delete.svg";

const DeleteIcon = ({ stroke }) => <DeleteSvg stroke={stroke || "#323232"} />;

DeleteIcon.propTypes = {
  stroke: PropTypes.string,
};

export default DeleteIcon;
