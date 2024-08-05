import React from "react";
import PropTypes from "prop-types";

import { AssignUserDropdown, AddTagDropdown } from "components/molecules";

import { CompletedActionsWrapper } from "./styled_completed_actions";
import BackToCaseSummary from "./back_to_case_summary_button";
import RedeemedButton from "./redeemed_button";
import DocumentGeneratingCompletedDropdown from "./document_generating_completed_dropdown";
import StartProcessDropdown from "./start_process_dropdown";

const CompletedActions = ({ dateOfMaturity, currentInterestRate }) => {
  return (
    <CompletedActionsWrapper>
      <BackToCaseSummary />
      <AssignUserDropdown />
      <AddTagDropdown />
      <StartProcessDropdown
        currentInterestRate={currentInterestRate}
        dateOfMaturity={dateOfMaturity}
      />
      <DocumentGeneratingCompletedDropdown />
      <RedeemedButton />
    </CompletedActionsWrapper>
  );
};

CompletedActions.propTypes = {
  currentInterestRate: PropTypes.number.isRequired,
  dateOfMaturity: PropTypes.string.isRequired,
};
export default CompletedActions;
