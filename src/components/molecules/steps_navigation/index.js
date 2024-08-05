import styled from "styled-components";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { titleize } from "inflected";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { H1, Modal } from "components/atoms";
import Summary from "components/dip_forms_steps/summary_step/summary";

import {
  StyledStepListElem,
  StyledStepsNavigation,
  StyledDipSummaryButton,
  StyledModalContent,
} from "./styled_steps_navigation";

const WhiteBackground = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  padding: 10px;
`;

const StepsNavigation = ({
  storeName = "application",
  steps,
  getLinkToStep,
  applicationHomepage,
  caseNrSelector = (store) => store[storeName].case_nr,
  dipStoreName = "application",
}) => {
  const caseNr = useSelector(caseNrSelector);
  const { flowName: currentFlowName } = useParams();
  const [isDipSummaryModalShown, setIsDipSummaryModalShown] = useState(false);

  const stepNames = steps.map((step) => ({
    label: step.part || titleize(step),
    key: step.stepName || step,
  }));

  return (
    <StyledStepsNavigation>
      <Modal
        isOpen={isDipSummaryModalShown}
        onClose={() => setIsDipSummaryModalShown(false)}
      >
        <StyledModalContent>
          <H1>DIP Summary</H1>
          <Summary storeName={dipStoreName} />
        </StyledModalContent>
      </Modal>
      <WhiteBackground>
        <H1>
          {applicationHomepage !== undefined ? (
            <Link to={applicationHomepage}>{caseNr}</Link>
          ) : (
            caseNr
          )}
        </H1>
        <ul>
          {stepNames.map(({ label, key }) => (
            <StyledStepListElem
              key={`steps-navigation-${key}`}
              active={currentFlowName === key}
            >
              <Link to={getLinkToStep(key)}>{label}</Link>
            </StyledStepListElem>
          ))}
        </ul>
      </WhiteBackground>
      <StyledDipSummaryButton onClick={() => setIsDipSummaryModalShown(true)}>
        Show DIP Summary
      </StyledDipSummaryButton>
    </StyledStepsNavigation>
  );
};

export default StepsNavigation;

StepsNavigation.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ).isRequired,
  getLinkToStep: PropTypes.func.isRequired,
  applicationHomepage: PropTypes.string,
  storeName: PropTypes.string,
  caseNrSelector: PropTypes.func,
  dipStoreName: PropTypes.string,
};
