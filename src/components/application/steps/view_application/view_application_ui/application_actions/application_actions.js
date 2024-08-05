import React from "react";

import { AssignUserDropdown, AddTagDropdown } from "components/molecules";

import { ApplicationActionsWrapper } from "./styled_application_actions";
import BackToDipButton from "./back_to_dip_button";
import CaseSummaryButton from "./case_summary_button";
import DocumentGeneratingApplicationDropdown from "./document_generating_application_dropdown";
import ChangeApplicationStatusDropdown from "./change_application_status_dropdown";

const ApplicationActions = () => {
  return (
    <ApplicationActionsWrapper>
      <BackToDipButton />
      <AssignUserDropdown />
      <AddTagDropdown />
      <ChangeApplicationStatusDropdown />
      <DocumentGeneratingApplicationDropdown />
      <CaseSummaryButton />
    </ApplicationActionsWrapper>
  );
};

export default ApplicationActions;
