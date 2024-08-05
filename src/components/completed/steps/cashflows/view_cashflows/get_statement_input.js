import moment from "moment";

import getCalculatorInput from "components/dip_forms_steps/financial_details_calculator/get_calculator_input";

import { getTransactions } from "../../adjustments/add_adjustment/get_transactions";
import signedAmount from "../../adjustments/helpers/signed_amount";

const getGroupOfAdjustment = (transactionType) => {
  const transactions = getTransactions();

  for (const transaction of transactions) {
    if (transaction.value === transactionType) {
      return transaction.groupName;
    }
  }
};

const getStatementInput = ({
  dip,
  adjustments = [],
  defaultEventsPeriods = [],
  completed,
  CaseNr,
  endDate = new Date(),
  totalValuations,
  totalGDV,
}) => {
  const input = getCalculatorInput({
    values: dip,
    dip,
  });
  const delayedEndDate = moment(endDate, moment.HTML5_FMT.DATE)
    .add(1, "days")
    .format(moment.HTML5_FMT.DATE);
  input.arrangement_fee_value = +dip.ArrangementFee;
  input.first_advance = +dip.InitialNetLoanAmount;
  input.end_date = delayedEndDate;
  input.additional_cashflows = adjustments.map((adjustment) => ({
    amount: signedAmount(adjustment, adjustment.amount),
    category: adjustment.TransactionType,
    group: getGroupOfAdjustment(adjustment.TransactionType),
    date: adjustment.ActualDate,
  }));
  input.initial_date = completed?.DateOfCompletion ?? new Date();
  input.default_events = defaultEventsPeriods;
  input.extensions = completed?.extensions?.map((extension) => ({
    start_from: extension.FromDate,
    to: extension.Date,
    interest_rate: extension.InterestRate / 100,
  }));
  input.case_number = CaseNr;
  if (totalValuations !== undefined) {
    input.total_valuations = totalValuations;
  }
  if (totalGDV !== undefined) {
    input.gdv = totalGDV;
  }
  return input;
};

export default getStatementInput;
