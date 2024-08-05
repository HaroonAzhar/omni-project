import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { currencyFormat, percentFormat } from "utils";
import { Label } from "components/atoms";

const SingleResultWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 7px 0px;
`;
const SingleResult = ({ text, amount, formatFunction = currencyFormat }) => (
  <SingleResultWrapper>
    <div>{text}</div>
    <div>{formatFunction(amount)}</div>
  </SingleResultWrapper>
);

SingleResult.propTypes = {
  text: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  formatFunction: PropTypes.func,
};

const CalculatingResultWrapper = styled.div`
  padding: 5px 0px;
`;

const CalculatingResult = ({ calculatorResponse, error }) => (
  <CalculatingResultWrapper>
    {error && (
      <Label
        color="error"
        text="Calculator request failed"
        htmlFor="calculator-request-button"
      />
    )}
    {calculatorResponse && (
      <>
        <SingleResult
          text="Net Loan Amount:"
          amount={calculatorResponse.net_amount_of_first_advance}
        />
        <SingleResult
          text="Gross Loan Amount:"
          amount={calculatorResponse.gross_loan}
        />
        <SingleResult
          text="IRR:"
          amount={calculatorResponse.xirr}
          formatFunction={percentFormat}
        />
      </>
    )}
  </CalculatingResultWrapper>
);

CalculatingResult.propTypes = {
  calculatorResponse: PropTypes.object,
  error: PropTypes.bool.isRequired,
};

export default CalculatingResult;
