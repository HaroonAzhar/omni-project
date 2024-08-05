import styled from "styled-components";

import { darkGrey } from "styles/colors";
import { Button } from "components/atoms";

const StyledBackToChecklistButton = styled(Button)`
  border-bottom: 1.5px solid transparent;
  color: ${darkGrey};

  font-weight: 600;

  :focus {
    color: ${darkGrey};
    outline: none;
  }

  :hover {
    border-bottom: 1.5px solid ${darkGrey};
    color: ${darkGrey};
  }
`;

export default StyledBackToChecklistButton;
