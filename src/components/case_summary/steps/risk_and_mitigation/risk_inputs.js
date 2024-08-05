import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

import { TextInput, CrossCircleButton } from "components/atoms";

const StyledRiskMitigateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const StyledEditorContainer = styled.div`
  margin-right: 15px;
  padding-right: 15px;
  width: 100%;

  &:last-child {
    border-right: 0;
    margin-right: 0;
    padding-right: 0;
  }
`;

const StyledCrossCircleButton = styled(CrossCircleButton)`
  right: 0;
  top: 2em;
`;

const StyledContainer = styled.form``;

const RiskInputs = ({ name, removeRisk }) => (
  <StyledContainer>
    <StyledRiskMitigateContainer>
      <StyledEditorContainer>
        <Field
          component={TextInput}
          type="text"
          name={`${name}risk`}
          label="Risk"
        />
      </StyledEditorContainer>
      <StyledEditorContainer>
        <Field
          component={TextInput}
          type="text"
          name={`${name}mitigation`}
          label="Mitigation"
        />
      </StyledEditorContainer>
      <StyledCrossCircleButton onClick={removeRisk} />
    </StyledRiskMitigateContainer>
  </StyledContainer>
);

RiskInputs.propTypes = {
  name: PropTypes.string.isRequired,
  removeRisk: PropTypes.func.isRequired,
};

export default RiskInputs;
