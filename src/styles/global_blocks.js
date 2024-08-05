import { css } from "styled-components/macro";

import {
  lightBackgroundBlue,
  mainBlue,
  errorColor,
  successColor,
  white,
  darkGrey,
  lightGrey,
  darkBlue,
  shadow,
  inputBackground,
} from "styles/colors";

export const input = css`
  color: ${darkGrey};
  font-size: 14px;
  line-height: 22px;
`;

export const textInput = css`
  background-color: ${inputBackground};
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: 18px;
  line-height: 22px;
  max-height: 40px;
  padding: 3px;
  width: 100%;

  ${({ isValue }) =>
    isValue &&
    `
    border: 1px solid ${lightGrey};
    background-color: ${white};
  `}
  ${({ isCorrect }) =>
    isCorrect &&
    `
    border: 2px solid ${successColor};
  `}
  ${({ isError }) =>
    isError &&
    `
    border: 2px solid ${errorColor};
    background-color: ${white};
  `}

  :focus {
    background-color: ${lightBackgroundBlue};
    border: 2px solid ${mainBlue};
    outline: 0;
  }

  ::placeholder {
    color: ${lightGrey};
  }
`;

export const popUpBasicCss = css`
  border-radius: 8px;
  box-shadow: 0px 5px 14px ${shadow};
`;

export const basicButton = css`
  align-items: center;
  border-radius: 8px;
  cursor: pointer;

  display: flex;
  font-size: 16px;
  justify-content: center;

  min-width: 160px;
  padding-bottom: 3px;
  text-decoration: none;
`;

export const primaryButton = css`
  ${basicButton}
  background-color: ${mainBlue};
  border: 0;
  color: white;

  height: 30px;

  :focus{
    background-color: ${darkBlue};
    color: ${lightBackgroundBlue};
    outline: none;
  }

  :hover{
    background-color: ${darkBlue};
  }

  :disabled{
    background: ${inputBackground};
    color: ${lightGrey};
    cursor: default;
  }
`;

export const secondaryButton = css`
  ${basicButton}
  border: 2px solid ${mainBlue};
  color: ${mainBlue};

  height: 30px;

  :focus{
    color: ${mainBlue};
    outline: none;
  }

  :hover{
    background-color: ${lightBackgroundBlue};
    border: 2px solid transparent;
    color: black;
  }
`;

export const fadeButton = css`
  ${basicButton}
  background: none;
  border: none;
  color: ${lightGrey};

  height: 30px;

  :focus {
    background-color: ${lightBackgroundBlue};
    color: ${mainBlue};
    outline: none;
  }

  :hover {
    background-color: ${lightBackgroundBlue};
    color: ${darkGrey};
  }

  :disabled {
    color: ${shadow};
    :hover {
      background: none;
    }
  }
`;

export const extraButton = css`
  background: none;
  border: 0;
  border-bottom: 1.5px solid ${mainBlue};
  color: ${mainBlue};
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;

  :focus {
    color: ${mainBlue};
    outline: none;
  }

  :hover {
    border-bottom: 1.5px solid ${darkGrey};
    color: ${darkGrey};
  }
`;

export const linkButton = css`
  background: none;
  border: 0;
  border-bottom: 1.5px solid transparent;
  color: ${darkGrey};
  cursor: pointer;
  font-size: 20px;
  height: 32px;
  text-decoration: none;

  :focus {
    color: ${darkGrey};
    outline: none;
  }

  :hover {
    border-bottom: 1.5px solid ${darkGrey};
    color: ${darkGrey};
  }
`;

export const actionButton = css`
  ${basicButton}
  border: 2px solid ${darkGrey};
  color: ${darkGrey};

  height: 30px;
  margin-left: 20px;
  min-width:0px;

  :focus{
    color: ${darkGrey};
    outline: none;
  }

  :hover{
    background-color: ${lightGrey};
    border: 2px solid transparent;
    color: black;
  }
`;
