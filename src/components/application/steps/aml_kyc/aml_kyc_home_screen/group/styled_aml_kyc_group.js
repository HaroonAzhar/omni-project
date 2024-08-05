import styled from "styled-components";

export const StyledGroupWrapper = styled.div`
  margin: 20px;
`;

export const StyledGroupHeader = styled.div`
  background-color: ${({ status, theme }) => {
    if (status === "ok") return theme.colors.darkGreen;
    if (status === "referral") return theme.colors.darkOrange;
    return theme.colors.lightGrey;
  }};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.white};
  padding: 10px;
  width: 100%;
`;

export const StyledGroupMembersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  :last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.main};
  }
`;
