import React from "react";
import { useParams } from "react-router-dom";

import useApplicants from "../hooks/use_applicants";
import {
  CompanyPanel,
  NonUkIndividualPanel,
  UkIndividualPanel,
} from "../aml_kyc_home_screen/panels";

const panels = {
  companies: CompanyPanel,
  ukIndividuals: UkIndividualPanel,
  nonUkIndividuals: NonUkIndividualPanel,
};

const whichPanelToShow = (applicant) => {
  if (applicant.isCompany) return "companies";
  if (applicant.isIndividualFromUK) return "ukIndividuals";
  return "nonUkIndividuals";
};
const Referral = () => {
  const { id, indexOfElement } = useParams();
  const [applicants, modifyApplicant] = useApplicants(id);

  const applicant = applicants.find(
    (potentialApplicant) => potentialApplicant.index === Number(indexOfElement)
  );

  if (!applicant) return "";
  const Panel = panels[whichPanelToShow(applicant)];
  return (
    <Panel
      applicant={applicant}
      modifyApplicant={modifyApplicant}
      readOnly={true}
    />
  );
};

export default Referral;
