import React from "react";

import { AssignUserDropdown, AddTagDropdown } from "components/molecules";

import { CaseSummaryActionsWrapper } from "./styled_case_summary_actions";
import BackToApplicationButton from "./back_to_application_button";
import CompletedButton from "./completed_button";
import DocumentGeneratingCaseSummaryDropdown from "./document_generating_case_summary_dropdown";
import ChangeCaseSummaryStatusDropdown from "./change_case_summary_status_dropdown";

const CaseSummaryActions = () => {
  return (
    <CaseSummaryActionsWrapper>
      <BackToApplicationButton />
      <AssignUserDropdown />
      <AddTagDropdown />
      <ChangeCaseSummaryStatusDropdown />
      <DocumentGeneratingCaseSummaryDropdown />
      <CompletedButton />
    </CaseSummaryActionsWrapper>
  );
};

export default CaseSummaryActions;
