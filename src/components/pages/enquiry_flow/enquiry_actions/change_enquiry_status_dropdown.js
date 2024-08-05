import React from "react";
import PropTypes from "prop-types";

import { ChangeStatusDropdown } from "components/molecules";
import { changeStatusOfCase } from "utils/requests";

const ChangeEnquiryStatusDropdown = ({ status }) => {
  return (
    <ChangeStatusDropdown
      status={status}
      changeStatus={changeStatusOfCase}
      statuses={["Received", "Not proceeding", "On Hold"]}
    />
  );
};

export default ChangeEnquiryStatusDropdown;

ChangeEnquiryStatusDropdown.propTypes = {
  status: PropTypes.string,
};
