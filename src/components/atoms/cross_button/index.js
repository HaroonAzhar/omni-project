import styled from "styled-components";

import { lightGrey } from "styles/colors";

export default styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  position: absolute;
  right: 20px;
  top: 10px;

  :before,
  :after {
    background: ${lightGrey};
    border-radius: 1px;
    content: "";
    height: 1px;
    position: absolute;
    width: 16px;
  }
  :before {
    transform: rotate(45deg);
  }
  :after {
    transform: rotate(-45deg);
  }

  :hover:after,
  :hover:before {
    background: black;
  }
`;
