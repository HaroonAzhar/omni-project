import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// Source: https://gist.github.com/knowbody/578b35164b69e867ed4913423f6bed30
const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  height: ${({ size }) => `${size}px`};
  width: ${({ size }) => `${size}px`};

  & .path {
    animation: dash 1.5s ease-in-out infinite;
    stroke: ${({ theme }) => theme.colors.primary};
    stroke-linecap: round;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

const Spinner = ({ size = 30, className }) => (
  <StyledSpinner className={className} size={size} viewBox="0 0 50 50">
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="4"
    />
  </StyledSpinner>
);

Spinner.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

export default Spinner;
