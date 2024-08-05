import styled from "styled-components";

import { H1, Button } from "components/atoms";

export const SignWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 20px 0px;
`;

export const SpacedButton = styled(Button)`
  margin: 0px 15px;
`;

export const ValidateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

export const SingleValidationWrapper = styled.div`
  margin-bottom: 40px;
`;

export const ValidationTitle = styled(H1)`
  margin-bottom: 80px;
  margin-top: 40px;
`;

export const BackButton = styled(Button)`
  align-self: flex-end;
`;
