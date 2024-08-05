import styled from "styled-components/macro";

import { errorColor, mainBlue, shadow, darkGrey } from "styles/colors";

/*
  Radio input has been styled based on Andreas Storm codepen.
  https://codepen.io/andreasstorm/pen/jxjKGj
*/

export const StyledRadioInput = styled.input`
  ${"" /*
    This radio input need to be hidden, because we use span as replacement.
    But we can't to set display: none here, because we still want to
    keep high accessibility.
    https://webaim.org/techniques/css/invisiblecontent/
  */}
  height: 1px;
  left: -1000000px;
  position: absolute;

  :focus + span,
  :focus:checked + span {
    border-color: ${mainBlue};
  }

  :checked + span {
    border-color: ${shadow};

    :after {
      opacity: 1;
      transform: scale(1);
      transition: all 0.2s cubic-bezier(0.35, 0.9, 0.4, 0.9);
    }
  }
`;

export const StyledInputWrapper = styled.span`
  cursor: pointer;
  position: relative;
  ${({ disabled }) => disabled && `cursor: default;`}
`;

export const StyledInputReplacement = styled.span`
  -webkit-tap-highlight-color: transparent;
  border: 2px solid ${shadow};
  border-radius: 100%;
  display: block;
  float: left;
  height: 16px;
  ${({ isError }) => isError && `border: 2px solid ${errorColor};`}
  position: relative;
  width: 16px;

  :after {
    background: ${mainBlue};
    border-radius: 100%;
    content: "";
    height: 10px;
    left: 1px;
    opacity: 0.08;
    pointer-events: none;
    position: absolute;
    top: 1px;
    transform: scale(0);
    transition: all 0.2s ease;
    width: 10px;
  }

  :hover {
    :after {
      transform: scale(1.3);
    }
  }
`;

export const StyledRadioInputLabel = styled.span`
  color: ${darkGrey};
  cursor: pointer;
  font-size: 16px;
  padding-left: 8px;
  ${({ disabled, theme }) =>
    disabled && `color: ${theme.colors.lightGrey}; cursor: default;`}
`;

export const StyledLabel = styled.label`
  display: block;
  padding-bottom: 16px;
`;
