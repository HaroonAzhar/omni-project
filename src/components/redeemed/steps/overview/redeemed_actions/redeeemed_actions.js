import React from "react";
import PropTypes from "prop-types";

import { AddTagDropdown } from "components/molecules";

import { RedeemedActionsWrapper } from "./styled_redeemed_actions";
import BackToCompleted from "./back_to_completed_button";
import DocumentGeneratingRedeemeddDropdown from "./document_generating_redeemed_dropdown";
import ChangeRedeemedStatusDropdown from "./change_redeemed_status_dropdown";

const RedeemedActions = ({ completedData, applicationData }) => {
  return (
    <RedeemedActionsWrapper>
      <BackToCompleted redeemedData={completedData} />
      <AddTagDropdown />
      <ChangeRedeemedStatusDropdown status={applicationData.Status} />
      <DocumentGeneratingRedeemeddDropdown />
    </RedeemedActionsWrapper>
  );
};

RedeemedActions.propTypes = {
  applicationData: PropTypes.object.isRequired,
  completedData: PropTypes.object.isRequired,
};
export default RedeemedActions;
