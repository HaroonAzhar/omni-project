import styled from "styled-components/macro";

import { Button } from "components/atoms";
import { errorColor } from "styles/colors";

export const StyledFindCompanyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
`;

export const StyledFindCompanyButton = styled(Button)`
  margin-left: 50px;
  margin-top: 30px;
`;

export const StyledErrorLabel = styled.p`
  color: ${errorColor};
`;

export const StyledNotInChCheckbox = styled.div`
  padding: 5px 25px;
`;
