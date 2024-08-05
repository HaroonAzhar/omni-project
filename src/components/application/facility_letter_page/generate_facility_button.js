import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { humanize } from "inflected";

import { Button, Label } from "components/atoms";

const StyledButton = styled(Button)`
  margin: 0 15px;
`;

const GenerateFacilityButton = ({ pdfData, values, caseNumber }) => {
  const { steps = [] } = pdfData;
  const requiredStepsNames = [
    "security_details",
    "applicant_details",
    "solicitor_details",
  ];

  const missingSteps = requiredStepsNames.filter(
    (stepName) =>
      steps.findIndex((x) => x.name === stepName && x.status !== "New") === -1
  );

  const disablePdfRules = [
    {
      name: "COMPULSORY_STEPS_ARE_MISSING",
      condition: missingSteps.length > 0,
      displayMessage: `The Facility Letter can only be generated once all sections of the Application have been entered.
    Required, missing steps are: ${missingSteps
      .map((stepName) => humanize(stepName))
      .join(", ")}`,
    },
    {
      name: "INDIVIDUAL_WITH_SCOTTISH_PRIIMARY_SECURITY",
      condition:
        pdfData.securities?.[0]?.security_country === "scotland" &&
        pdfData.type_of_applicant === "individual",
      displayMessage: `The Facility Letter is disabled for individual applicants with primary Security in Scotland.`,
    },
    {
      name: "UK_INDIVIDUAL_WITH_SCOTTISH_WORDS_ENABLED",
      condition:
        pdfData.securities?.[0]?.security_country === "united kingdom" &&
        values.isScottish &&
        pdfData.type_of_applicant === "individual",
      displayMessage: `UK individual applicants can't choose scottish wording`,
    },
  ];

  let reasonForDisablingPdf;

  let pdfCanNotBeGenerated;

  for (const rule of disablePdfRules) {
    if (rule.condition) {
      pdfCanNotBeGenerated = true;
      reasonForDisablingPdf = rule.displayMessage;
      break;
    }
  }

  return (
    <>
      {pdfCanNotBeGenerated > 0 && (
        <Label text={reasonForDisablingPdf} color="warn" htmlFor="button" />
      )}
      <StyledButton disabled={!caseNumber || pdfCanNotBeGenerated}>
        Generate facility
      </StyledButton>
    </>
  );
};

GenerateFacilityButton.propTypes = {
  pdfData: PropTypes.object,
  values: PropTypes.object,
  caseNumber: PropTypes.string,
};

export default GenerateFacilityButton;
