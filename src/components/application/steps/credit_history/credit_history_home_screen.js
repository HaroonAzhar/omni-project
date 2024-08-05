import React from "react";

import { ApplicantsHomeScreen } from "components/organisms";

const CreditHistoryApplicantHomeScreen = () => (
  <ApplicantsHomeScreen
    step_id="credit_history"
    nextStepName="aml_kyc"
    detailsName="credit_history"
    canBeNotReady={true}
  />
);
export default CreditHistoryApplicantHomeScreen;
