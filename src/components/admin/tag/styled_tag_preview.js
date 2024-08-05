import styled from "styled-components";

import { shadow } from "styles/colors";

export const StyledTagPreview = styled.div`
  background-color: ${({ color }) => color};
  border: 2px solid ${shadow};
  border-radius: 5px;
  margin: 5px;
  padding: 1px 10px
    ${({ isBackgroundDark }) =>
      isBackgroundDark ? `color: white` : `color: black`};
  width: max-content;
`;
