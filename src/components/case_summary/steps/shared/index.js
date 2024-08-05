import styled from "styled-components";

import { mainBlue } from "styles/colors";

export { default as useSubmitCaseSummary } from "./use_submit_case_summary";

export { default as useSubmitTitleNumber } from "./use_submit_title_number";

export const StyledLabel = styled.span`
  display: block;
  padding-bottom: 20px;
`;

export const StyledTitle = styled.h2`
  color: ${mainBlue};
  font-size: 16px;
  padding-bottom: 24px;
  width: 100%;
`;
