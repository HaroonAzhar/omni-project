import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Form } from "react-final-form";
import { Link } from "react-router-dom";

import { Button, H1 } from "components/atoms";
import { stepsWithNames } from "components/templates/dip_flow_template/steps_names";
import useDipProgress from "components/templates/dip_flow_template/use_dip_progress";
import { StyledStepListElem } from "components/molecules/steps_navigation/styled_steps_navigation";
import { CaseTags } from "components/molecules";

import {
  StyledButtonsContainer,
  StyledMainFormContent,
  TitleWrapper,
} from "../styled_dip_steps";
import DipActions from "./dip_actions";

const StepsSummary = ({ savedSteps = [] }) => {
  const { getLinkToForm, progressBarData } = useDipProgress(
    stepsWithNames,
    0,
    savedSteps
  );

  return (
    <ul>
      {progressBarData.map(({ key, stepIndex, stepName, active, edited }) => (
        <StyledStepListElem key={key} active={active} edited={edited}>
          {edited ? (
            <Link to={getLinkToForm(stepIndex)}>{stepName}</Link>
          ) : (
            stepName
          )}
        </StyledStepListElem>
      ))}
    </ul>
  );
};

StepsSummary.propTypes = {
  savedSteps: PropTypes.array,
};

const DipSummary = ({ finalizeStep }) => {
  const onSubmit = (data) =>
    finalizeStep({
      data,
      stepId: "dip_summary",
    });

  const { IntroducerType, FkOriginatorId, steps: savedSteps } = useSelector(
    ({ dip }) => dip
  );
  const { CaseNr } = useSelector((state) => state.case);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ IntroducerType, FkOriginatorId }}
      render={({ handleSubmit, submitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <StyledMainFormContent>
              <TitleWrapper>
                <H1>{CaseNr ? CaseNr : "DIP"}</H1>
                <DipActions />
              </TitleWrapper>
              <CaseTags />
              <StepsSummary savedSteps={savedSteps} />
            </StyledMainFormContent>

            <StyledButtonsContainer>
              <Button type="submit" disabled={submitting}>
                Continue
              </Button>
            </StyledButtonsContainer>
          </form>
        );
      }}
    />
  );
};

export default DipSummary;

DipSummary.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
};
