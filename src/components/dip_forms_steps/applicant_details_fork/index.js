import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import CompanyDetailsForm from "../company_details_form";
import IndividualDetailsForm from "../individual_details_form";

const ApplicantDetailsFork = ({ finalizeStep, goStepBack }) => {
  const ContactType = useSelector(({ dip }) => dip.ContactType);

  return ContactType === "individual" ? (
    <IndividualDetailsForm
      finalizeStep={finalizeStep}
      goStepBack={goStepBack}
    />
  ) : (
    <CompanyDetailsForm finalizeStep={finalizeStep} goStepBack={goStepBack} />
  );
};

export default ApplicantDetailsFork;

ApplicantDetailsFork.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
