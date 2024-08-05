import styled from "styled-components";

import { Button } from "components/atoms";

export const StyledAccordionHeading = styled(Button)`
  border-bottom: none;
  margin-bottom: 10px;
  padding-left: 0px;
  padding-right: 0px;
  :hover {
    border-bottom: none;
  }
  width: 100%;
  ${({ expanded }) => expanded && "font-weight:bold;margin-bottom: 0px;"}
`;

export const StyledAccordionContent = styled.div`
  ${({ borders }) =>
    borders &&
    "border-bottom: 1px solid black; border-left: 1px solid black;border-right: 1px solid black;"}
  margin-bottom: 10px;
  margin-top: -2px;
  padding: 10px;
  ${({ expanded }) => !expanded && "display: none;"}
`;
