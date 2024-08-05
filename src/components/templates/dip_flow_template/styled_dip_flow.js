import styled from "styled-components/macro";

import {
  lightGrey,
  lightBackgroundBlue,
  lightBlue,
  errorColor,
  white,
} from "styles/colors";
import { navBar } from "styles/z_indexes";

export const DipWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledDipContainer = styled.div`
  justify-content: space-between;
  margin: auto;
  padding-bottom: 15px;
  padding-left: 5px;
  ${(props) =>
    props.phase === "dip" ? "padding-top: 60px" : "padding-top: 0px"};
  position: relative;
  width: 1120px;
`;

export const StyledFormColumn = styled.div`
  padding-right: 50px;
  width: 960px;
`;

export const StyledStepsList = styled.ul`
  padding-top: 30px;
  position: relative;
`;

export const StyledStep = styled.span`
  color: ${lightGrey};
  display: block;
  margin-bottom: 16px;
`;

export const StyledInfoBox = styled.div`
  background-color: ${(props) =>
    props.appearance === "error" ? errorColor : lightBackgroundBlue};
  color: ${(props) => (props.appearance === "error" ? white : lightBlue)};
  left: 0;
  padding: 10px;
  position: fixed;
  text-align: center;
  top: 60px;
  width: 100%;
  z-index: ${navBar};
`;
