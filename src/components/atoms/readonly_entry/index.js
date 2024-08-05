import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import { StyledLabel, StyledLabelText } from "../text_input/styled_text_input";

export const StyledSpan = styled.span`
  font-size: 16px;
  padding-left: 24px;
`;

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable-next-line react/prop-types */

const ReadonlyEntry = ({ label, text, children }) => {
  return (
    <StyledLabel>
      <StyledLabelText>{label}</StyledLabelText>
      {text && <StyledSpan>{text}</StyledSpan>}
      {children}
    </StyledLabel>
  );
};

ReadonlyEntry.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string,
  children: PropTypes.node,
};

export default ReadonlyEntry;
