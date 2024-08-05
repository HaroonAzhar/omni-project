import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Button } from "components/atoms";

export const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  max-width: 350px;
`;

const FlowControlButtons = ({ onBack, isContinueDisabled }) => {
  return (
    <StyledContainer>
      <Button kind="fade" type="button" onClick={onBack} disable={!onBack}>
        Back
      </Button>

      <Button type="submit" disabled={isContinueDisabled}>
        Continue
      </Button>
    </StyledContainer>
  );
};

FlowControlButtons.propTypes = {
  onBack: PropTypes.func.isRequired,
  isContinueDisabled: PropTypes.bool.isRequired,
};

export default FlowControlButtons;
