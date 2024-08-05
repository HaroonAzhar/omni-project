import styled from "styled-components";

export const CaseAssociatedTagsWrapper = styled.div`
  display: flex;
`;
export const StyledRemoveButton = styled.button`
  background-color: ${({ color }) => color};
  ${({ isBackgroundDark }) =>
    isBackgroundDark ? `color: white` : `color: black`};
  margin-left: 5px;
`;
