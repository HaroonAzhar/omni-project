import styled from "styled-components/macro";

import { label } from "styles/global_texts";
import { textInput } from "styles/global_blocks";
import { errorColor, white, lightGrey } from "styles/colors";

export const StyledTextInput = styled.input`
  ${textInput}
  ${({ disabled }) => disabled && `background: ${white};`}
`;

export const StyledTextAreaInput = styled.textarea`
  ${textInput};
  height: auto;
  max-height: none;
  ${({ disabled }) => disabled && `background: ${white};`}
`;

export const StyledLabel = styled.label`
  display: block;
  padding-bottom: 5px;
  position: relative;
`;

export const StyledLabelText = styled.span`
  display: block;
  margin-bottom: 5px;
  ${label}
  ${({ disabled }) => disabled && `color: ${lightGrey}`}
`;

export const StyledError = styled.span`
  color: ${errorColor};
  display: block;
  height: 1em;
  margin-top: 5px;
`;
