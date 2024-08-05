import React from "react";
import styled from "styled-components";

import CrossButton from "./index";

const getColor = (colorName) => ({ theme }) =>
  theme.colors && theme.colors[colorName];

const CrossCircleButton = styled(CrossButton)`
  border: 2px solid ${getColor("primary")};
  border-radius: 50%;
  height: 32px;
  position: absolute;
  right: 0;
  top: 0;
  width: 32px;

  &::before,
  &::after {
    background: ${getColor("primary")};
    height: 2px;
    left: 21%;
  }

  &:hover {
    background: ${getColor("lightBackgroundBlue")};
    border: 2px solid transparent;
  }
`;

const Wrapper = styled.div`
  height: 32px;
  position: relative;
  width: 32px;
`;

/* eslint-disable react/jsx-props-no-spreading */

export default (props) => (
  <Wrapper>
    <CrossCircleButton {...props} />
  </Wrapper>
);
