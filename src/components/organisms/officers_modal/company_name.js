import React from "react";
import PropTypes from "prop-types";

import { H1 } from "components/atoms";

const CompanyName = ({ companyName }) => <H1>{companyName}</H1>;

export default CompanyName;

CompanyName.propTypes = {
  companyName: PropTypes.string,
};
