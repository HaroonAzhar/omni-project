import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { Button, H1 } from "components/atoms";

import selectDipName from "./select_dip_name";
import useCheckDipErrors from "./use_check_dip_errors";
import Summary from "./summary";
import {
  StyledButtonsContainer,
  StyledMainFormContent,
} from "../styled_dip_steps";
import SummaryErrorMessage from "./summary_error_message";
import useUpdateCalculatorData from "./use_update_calculator_data";

const SummaryStep = ({ finalizeStep, goStepBack }) => {
  const onSubmit = () => finalizeStep({ stepId: "summary" });
  const dipName = useSelector(selectDipName);

  const errors = useCheckDipErrors();
  useUpdateCalculatorData();

  return (
    <div>
      <StyledMainFormContent>
        <H1>Summary - {dipName}</H1>
        <Summary />
      </StyledMainFormContent>

      <StyledButtonsContainer>
        <Button kind="fade" type="button" onClick={goStepBack}>
          Back
        </Button>

        <Button onClick={onSubmit} disabled={errors}>
          Complete
        </Button>
        <SummaryErrorMessage errors={errors} />
      </StyledButtonsContainer>
    </div>
  );
};

export default SummaryStep;

SummaryStep.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
