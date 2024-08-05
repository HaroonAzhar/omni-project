import styled from "styled-components";

import { textInput } from "styles/global_blocks";

export const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 700px;
`;

export const StyledColumn = styled.div`
  display: flex;
`;

export const StyledToggleLocalContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  max-width: 660px;
`;

export const StyledName = styled.div.attrs(() => ({
  isValue: true,
}))`
  ${textInput};
  margin-right: 10px;
  width: 400px;
`;

export const StyledHeld = styled.div.attrs(() => ({
  isValue: true,
}))`
  ${textInput};
  width: 110px;
`;

export const StyledLine = styled.div`
  position: relative;
  width: 20px;

  &:before {
    background: ${(props) => {
      if (props.type === "") {
        return "white";
      } else {
        return "black";
      }
    }};
    bottom: ${(props) => {
      if (props.type === "|" || props.type === "+") {
        return 0;
      } else {
        return "50%";
      }
    }};
    content: "";
    display: block;
    left: 0;
    position: absolute;
    top: 0;
    width: 1px;
  }

  &:after {
    background: black;
    content: "";
    display: block;
    height: 1px;
    left: 0;
    position: absolute;
    top: 50%;
    width: ${(props) => {
      if (props.type === "-" || props.type === "+") {
        return "50%";
      } else {
        return 0;
      }
    }};
  }
`;

export const StyledWrap = styled.div`
  padding: 5px 0;
`;

export const StyledLabelSpan = styled.span`
  padding: 0 10px;
`;
