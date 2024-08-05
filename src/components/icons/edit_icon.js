import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as EditSvg } from "./svg/edit.svg";

const EditIcon = ({ stroke }) => <EditSvg stroke={stroke || "#4B4B4B"} />;

EditIcon.propTypes = {
  stroke: PropTypes.string,
};

export default EditIcon;
