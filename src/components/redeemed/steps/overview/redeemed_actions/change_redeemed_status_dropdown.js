import React from "react";
import PropTypes from "prop-types";

import { changeStatusOfCase } from "utils/requests";
import { ChangeStatusDropdown } from "components/molecules";
const ChangeRedeemedStatusDropdown = ({ status }) => {
  return (
    <ChangeStatusDropdown
      status={status}
      changeStatus={changeStatusOfCase}
      statuses={["In full", "With Shortfall"]}
    />
  );
};
ChangeRedeemedStatusDropdown.propTypes = {
  status: PropTypes.string.isRequired,
};
export default ChangeRedeemedStatusDropdown;
