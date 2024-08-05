import styled from "styled-components/macro";

import { shadow } from "styles/colors";
import { H2 } from "components/atoms";

export const StyledMainFormContent = styled.div`
  min-height: 380px;

  & input[type="text"],
  & input[type="number"],
  & input[type="date"],
  & textarea {
    max-width: 550px;
  }

  & textarea {
    min-width: 550px;
  }
`;

export const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  position: relative;
  width: 350px;
`;

export const StyledMultipleEntriesTitle = styled(H2)``;

export const StyledMultipleEntry = styled.div`
  border-top: 1px solid ${shadow};
  padding: 30px 0 30px 0;

  :first-of-type {
    border-top: none;
    padding-top: 0;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;

  justify-content: space-between;
`;
