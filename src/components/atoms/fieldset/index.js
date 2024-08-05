import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import { errorColor, darkGrey } from "styles/colors";
import { label } from "styles/global_texts";

const StyledLegend = styled.legend`
  ${label}
  color: ${darkGrey};
  display: block;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
  ${({ disabled, theme }) => disabled && `color: ${theme.colors.lightGrey};`}
`;

const StyledError = styled.span`
  color: ${errorColor};
`;

const StyledFakeFieldset = styled.div`
  ${({ isAbsolute }) => isAbsolute && "position: absolute;"}
  padding-bottom: 15px;
`;

const StyledFieldset = styled.fieldset`
  position: relative;
`;

const Div = styled.div``;

const Fieldset = ({
  children,
  title,
  touched,
  error,
  className,
  isAbsolute,
  shouldUseRadioContainer,
  disabled = false,
}) => {
  const RadioContainer = shouldUseRadioContainer ? Div : React.Fragment;

  return (
    <StyledFieldset>
      <StyledFakeFieldset className={className} isAbsolute={isAbsolute}>
        {title && <StyledLegend disabled={disabled}>{title}</StyledLegend>}

        <RadioContainer>{children}</RadioContainer>

        {touched && error && <StyledError>{error}</StyledError>}
      </StyledFakeFieldset>
    </StyledFieldset>
  );
};

export default Fieldset;

Fieldset.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node,
  touched: PropTypes.bool,
  error: PropTypes.string,
  className: PropTypes.string,
  isAbsolute: PropTypes.bool,
  shouldUseRadioContainer: PropTypes.bool,
  disabled: PropTypes.bool,
};
