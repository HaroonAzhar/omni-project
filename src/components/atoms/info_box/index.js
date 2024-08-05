import styled from "styled-components";

import { lightBackgroundBlue, lightBlue } from "styles/colors";
import { navBar } from "styles/z_indexes";

export default styled.div`
  background-color: ${lightBackgroundBlue};
  color: ${lightBlue};
  left: 0;
  padding: 10px;
  position: fixed;
  text-align: center;
  top: 60px;
  width: 100%;
  z-index: ${navBar};
`;
