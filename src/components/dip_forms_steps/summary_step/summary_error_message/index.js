import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export const StyledContainer = styled.div`
  color: ${({ theme }) => theme.colors.darkError};
  position: absolute;
  right: -250px;
`;

const SummaryErrorMessage = ({ errors = [] }) => {
  return (
    <StyledContainer>
      {errors.map((error) => (
        <div>{error}</div>
      ))}
    </StyledContainer>
  );
};

SummaryErrorMessage.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default SummaryErrorMessage;
