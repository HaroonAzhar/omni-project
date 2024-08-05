import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import {
  StyledDipContainer,
  StyledFormColumn,
  StyledStep,
} from "components/templates/dip_flow_template/styled_dip_flow";
import { H1 } from "components/atoms";

import BackToChecklistButton from "../back_to_checklist";

const StyledBackToChecklistButton = styled(BackToChecklistButton)`
  margin-bottom: 15px;
`;

export const StyledFormWrapper = styled.div`
  border-radius: 20px;
  height: 100%;
  margin: 200 auto;
  min-width: 1120px;
  padding: 10px 30px;
  ${({ theme }) => `background-color: ${theme.colors.white};`}
`;
export const StyledBackground = styled.div`
  ${({ theme }) => `background-color: ${theme.colors.lightBackgroundBlue};`}
  height: 100%;
  padding: 20px 10px 0 10px;
  width: 100%;
`;

const FormWrapper = ({
  children,
  onBackToChecklist,
  backToChecklistText,
  totalForms,
  title,
}) => {
  const { indexOfForm = 0 } = useParams();
  const currentStepIndex = +indexOfForm;

  return (
    <StyledBackground>
      <StyledFormWrapper>
        <StyledDipContainer>
          {title && <H1>{title}</H1>}
          {backToChecklistText && (
            <StyledBackToChecklistButton
              kind="extra"
              type="button"
              onClick={onBackToChecklist}
            >
              &lt;
              {backToChecklistText}
            </StyledBackToChecklistButton>
          )}

          <StyledFormColumn>
            {totalForms > 1 && (
              <StyledStep>
                {`step ${currentStepIndex + 1} of ${totalForms}`}
              </StyledStep>
            )}

            {children}
          </StyledFormColumn>
        </StyledDipContainer>
      </StyledFormWrapper>
    </StyledBackground>
  );
};

export default FormWrapper;

FormWrapper.propTypes = {
  children: PropTypes.node,
  onBackToChecklist: PropTypes.func,
  totalForms: PropTypes.number,
  title: PropTypes.string,
  backToChecklistText: PropTypes.string,
};
