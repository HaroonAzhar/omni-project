import styled, { keyframes } from "styled-components";

const move = keyframes`
 0% {
    background-position: 0 0;
  }
  100% {
    background-position: 50px 50px;
  }
`;

const StyledProgress = styled.div`
  background: ${(props) => props.theme.colors.helper};
  height: 10px;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: ${(props) => props.theme.zIndices.progress};

  & > span {
    background-color: ${(props) => props.theme.colors.primary};

    display: block;
    height: 100%;
    overflow: hidden;
    position: relative;

    & > span,
    &::after {
      animation: ${move} 2s linear infinite;
      background-image: linear-gradient(
        -45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
      );
      background-size: 50px 50px;
      bottom: 0;
      content: "";
      left: 0;
      overflow: hidden;
      position: absolute;
      right: 0;
      top: 0;

      z-index: 1;
    }
  }

  & > span::after {
    display: none;
  }
`;

export default StyledProgress;
