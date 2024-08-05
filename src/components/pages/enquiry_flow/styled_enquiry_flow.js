import { Grid } from "@material-ui/core";
import styled from "styled-components";

export const EnquiryContainer = styled.div`
  margin: 30px auto;
  padding: 10px;
  width: 100%;
`;

export const EnquiryFormContainer = styled.div``;

export const TitleWrapper = styled.div`
  display: flex;

  justify-content: space-between;
`;

export const CheckboxWrapper = styled.div`
  margin-left: 25px;
`;

export const SummaryContentWrapper = styled.div`
  min-width: 800px;
`;

export const LoanCalculationCell = styled(Grid)`
  font-size: 16px;
  padding-bottom: 25px;
  text-align: center;
`;

export const EnquiryButton = styled.div`
  button {
    margin-left: auto;
    margin-right: 0px;
  }
`;
