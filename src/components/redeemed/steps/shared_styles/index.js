import styled from "styled-components";

export const ContentWrapper = styled.div`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 100%;
  margin: 200 auto;
  min-width: 1120px;
  padding: 10px 30px;
  ${({ theme }) => `background-color: ${theme.colors.white};`}
`;

export const Background = styled.div`
  ${({ theme }) => `background-color: ${theme.colors.lightBackgroundBlue};`}
  height: 100%;
  min-height: 100vh;
  padding: 20px 30px 0 30px;
  width: 100%;
`;
export const StepContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
