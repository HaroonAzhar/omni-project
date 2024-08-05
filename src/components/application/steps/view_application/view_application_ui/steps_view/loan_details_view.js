import React from "react";
import PropTypes from "prop-types";

import { currencyFormat, escapeTitlize, numberMonths } from "utils";

import {
  StepView,
  Rows,
  Column,
  ViewRowLeftRight,
  RenderSectionConditionally,
} from "../shared";
import { useExpandForStatus } from "./hooks";

const generateTitle = (initialNetLoan, loanTerm, loanType) => {
  const initialNetLoanText =
    initialNetLoan ?? "undefined"
      ? ` - Initial Net ${currencyFormat(initialNetLoan)}`
      : "";
  const loanTermText =
    loanTerm !== undefined ? ` - ${numberMonths(loanTerm, "Months")}` : "";
  const loanTypeText =
    loanType !== undefined ? ` - ${escapeTitlize(loanType)}` : "";

  return `Loan Details${initialNetLoanText}${loanTermText}${loanTypeText}`;
};

const LoanDetailsView = ({
  purpose_of_borrowing,
  repayment_method,
  repayment_method_details,
  source_of_deposit,
  proposed_completion_date,
  status,
  initial_net_loan,
  loan_term,
  loan_type,
  expanded,
}) => {
  const isExpanded = useExpandForStatus(status, expanded, "New");

  return (
    <StepView
      title={generateTitle(initial_net_loan, loan_term, loan_type)}
      status={status}
      expanded={isExpanded}
    >
      <RenderSectionConditionally status={status}>
        <Rows>
          <Column>
            <ViewRowLeftRight
              title="Purpose of Borrowing:"
              value={purpose_of_borrowing}
            />
            <ViewRowLeftRight
              title="Source of Deposit:"
              value={source_of_deposit}
            />
            <ViewRowLeftRight
              title="Repayment Method:"
              value={repayment_method}
            />
            <ViewRowLeftRight
              title="Proposed Completion Timescale:"
              value={`${numberMonths(proposed_completion_date, "Months")}`}
            />
          </Column>
          <Column>
            <ViewRowLeftRight
              title="Further Details:"
              value={repayment_method_details}
            />
          </Column>
        </Rows>
      </RenderSectionConditionally>
    </StepView>
  );
};

LoanDetailsView.propTypes = {
  purpose_of_borrowing: PropTypes.string,
  repayment_method: PropTypes.string,
  repayment_method_details: PropTypes.string,
  source_of_deposit: PropTypes.string,
  proposed_completion_date: PropTypes.string,
  status: PropTypes.string,
  initial_net_loan: PropTypes.number,
  loan_term: PropTypes.number,
  loan_type: PropTypes.string,
  expanded: PropTypes.bool,
};

export default LoanDetailsView;
