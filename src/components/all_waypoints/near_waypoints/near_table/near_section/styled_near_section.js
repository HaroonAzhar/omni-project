import styled from "styled-components";

export const StyledSectionHeaderCell = styled.td`
  &&& {
    text-align: center;
  }
`;
export const SectionHeader = styled.tr`
  color: ${({ color }) => color};
`;
