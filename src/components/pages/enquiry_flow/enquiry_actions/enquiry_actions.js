import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { AssignUserDropdown, AddTagDropdown } from "components/molecules";
import OriginationLoanCalculator from "components/pages/dashboard/origination_loan_calculator";

import ChangeEnquiryStatusDropdown from "./change_enquiry_status_dropdown";
import DipButton from "./dip_button";

const EnquiryActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1000px;
`;

const EnquiryActions = ({ status, enquiry }) => {
  return (
    <EnquiryActionsWrapper>
      <AssignUserDropdown />
      {enquiry?.CaseNr ? <AddTagDropdown /> : <div></div>}
      <ChangeEnquiryStatusDropdown status={status} />
      <OriginationLoanCalculator />
      {enquiry?.CaseNr ? <DipButton /> : <div></div>}
    </EnquiryActionsWrapper>
  );
};

export default EnquiryActions;

EnquiryActions.propTypes = {
  status: PropTypes.string,
  enquiry: PropTypes.object,
};
