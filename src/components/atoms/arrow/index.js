import styled from "styled-components";

import { darkGrey, shadow } from "styles/colors";

export default styled.span`
  cursor: pointer;
  left: -8px;
  position: relative;

  :before,
  :after {
    border-bottom: 2px solid ${darkGrey};
    border-bottom-left-radius: 2px;
    border-top-left-radius: 2px;
    content: "";
    height: 0;
    ${({ isActive }) => !isActive && `border-bottom: 2px solid ${shadow};`}
    position: absolute;
    width: 10px;
  }
  :before {
    transform: rotate(45deg);
    ${({ isAscending }) => isAscending && "transform: rotate(-45deg);"}
  }
  :after {
    left: 6px;
    ${({ isAscending }) => isAscending && "transform: rotate(225deg);"}
    transform: rotate(-225deg);
  }
`;
