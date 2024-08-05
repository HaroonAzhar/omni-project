import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { StyledStepListElem } from "components/molecules/steps_navigation/styled_steps_navigation";

import { StyledStepsList } from "./styled_dip_flow";
import useDipProgress from "./use_dip_progress";

const StepsListMenu = ({
  stepsWithNames = [],
  currentStepNameIndex,
  savedSteps = [],
}) => {
  const { getLinkToForm, progressBarData } = useDipProgress(
    stepsWithNames,
    currentStepNameIndex,
    savedSteps
  );
  return (
    <StyledStepsList>
      {progressBarData.map(({ key, stepIndex, stepName, active, edited }) => (
        <StyledStepListElem key={key} active={active}>
          {edited ? (
            <Link to={getLinkToForm(stepIndex)}>{stepName}</Link>
          ) : (
            stepName
          )}
        </StyledStepListElem>
      ))}
    </StyledStepsList>
  );
};

StepsListMenu.propTypes = {
  stepsWithNames: PropTypes.arrayOf(
    PropTypes.objectOf({
      stepName: PropTypes.string.isRequired,
      stepIndex: PropTypes.number.isRequired,
    })
  ).isRequired,
  currentStepNameIndex: PropTypes.number.isRequired,
  savedSteps: PropTypes.array,
};

export default StepsListMenu;
