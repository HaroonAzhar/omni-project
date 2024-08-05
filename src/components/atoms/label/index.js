import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { capitalize } from "utils";

const getCustomLabelStyles = ({ theme, color }) => `
    background: ${theme.colors[color]};
    color: ${theme.colors[`dark${capitalize(color)}`]};
`;

const StyledLabel = styled.span`
  background: red;
  border-radius: 6px;
  display: inline-block;
  font-size: 14px;
  padding: 8px;

  ${getCustomLabelStyles}
`;

const Label = ({ text, color = "info", className }) => {
  return (
    <StyledLabel color={color} className={className}>
      {text}
    </StyledLabel>
  );
};

Label.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Label;
