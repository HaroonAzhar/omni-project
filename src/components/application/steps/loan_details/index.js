import React from "react";

import { saveLoanData } from "store/application/actions";
import { saveLoanDetails } from "utils/requests";
import { ApplicationFlowContainer } from "components/templates";

import Form1 from "./form_1";
import Form2 from "./form_2";

const forms = [
  {
    component: Form1,
  },
  {
    component: Form2,
  },
];

const LoanDetails = () => (
  <ApplicationFlowContainer
    title="Loan Details"
    flowKey="loan_details"
    forms={forms}
    flowStoreName="application_loan_details"
    savingRequest={saveLoanDetails}
    saveFlowToStore={saveLoanData}
    shouldUseApplicationData={true}
  />
);

export default LoanDetails;
