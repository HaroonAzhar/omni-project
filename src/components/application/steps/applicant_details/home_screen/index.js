import React from "react";

import { ApplicantsHomeScreen } from "components/organisms";

const IndividualApplicantHomeScreen = () => (
  <ApplicantsHomeScreen
    allowModifications={true}
    step_id="applicant_details"
    nextStepName="credit_history"
  />
);
export default IndividualApplicantHomeScreen;
