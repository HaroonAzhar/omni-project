import styled from "styled-components";

export const StyledIcon = styled.button`
  background: none;
  height: 40px;
  width: 40px;

  &:hover {
    background: ${({ theme }) => theme.colors.lightBackgroundBlue};
  }
`;
