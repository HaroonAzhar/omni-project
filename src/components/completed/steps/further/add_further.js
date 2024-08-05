import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import moment from "moment";
import PropTypes from "prop-types";
import * as yup from "yup";

import {
  Button,
  H2,
  PriceField,
  TextInput,
  TextAreaInput,
} from "components/atoms";
import { currencyFormat, formValidation, validationMsg } from "utils";

import { ButtonsContainer } from "../shared_styles/styled_filter";
import useCashflowsData from "../cashflows/view_cashflows/use_cashflows_data";
import { getTransactions } from "../adjustments/add_adjustment/get_transactions";
import mapTransactionToBalance from "../adjustments/add_adjustment/map_transaction_to_balance";
import useCompletedSummaryData from "../summary/hooks/use_completed_summary_data";
import { AddFurtherWrapper } from "./styled_further";
import TempResultsTable from "./temp_results_table";

const useOtherStatements = ({
  totalGDV,
  totalValuations,
  requestedDate,
  additionalAdjustment,
}) => {
  const { currentDateOfMaturity } = useCompletedSummaryData();

  const { statementResults: resultAfterDrawdown } = useCashflowsData({
    totalGDV,
    totalValuations,
    endDate: moment(requestedDate).add(1, "day").format(moment.HTML5_FMT.DATE),
    additionalAdjustment,
  });
  const newStatement = resultAfterDrawdown[resultAfterDrawdown.length - 1];

  const { statementResults: resultsAtMaturity } = useCashflowsData({
    totalGDV,
    totalValuations,
    endDate: currentDateOfMaturity,
    additionalAdjustment,
  });
  const maturityStatement = resultsAtMaturity[resultsAtMaturity.length - 1];

  return { newStatement, maturityStatement };
};

function AddFurther({
  totalGDV,
  totalValuations,
  currentStatement,
  closeAdd,
  availableFunds,
  initialValues,
  saveFurther,
  successCallback = () => {},
  title,
}) {
  const [requestedDate, setRequestedDate] = useState(undefined);
  const [notes, setNotes] = useState(undefined);

  const [additionalAdjustment, setAdditionalAdjustment] = useState(undefined);

  const { newStatement, maturityStatement } = useOtherStatements({
    totalGDV,
    totalValuations,
    requestedDate,
    additionalAdjustment,
  });
  const validationSchema = yup.object().shape({
    RequestedDate: yup.date().required(validationMsg.required),
    RequestedAmount: yup
      .number()
      .required(validationMsg.required)
      .max(
        availableFunds,
        ({ max }) => `Requested Amount must be less than ${currencyFormat(max)}`
      ),
    Notes: yup.string(),
  });
  const validate = async (values) => formValidation(validationSchema, values);

  const saveRequest = () => {
    const further = {
      RequestedAmount: additionalAdjustment.amount,
      CumulativeBalance: newStatement.end_balance,
      TotalValuations: totalValuations,
      TotalGDV: totalGDV,
      LTV: newStatement.ltv,
      LTGDV: newStatement.gdv,

      RequestedDate: requestedDate,
      Notes: notes,
    };
    saveFurther(further).then((res) => {
      if (res) {
        closeAdd();
        successCallback();
      }
    });
  };

  const transactions = getTransactions();
  const drawdownTransaction = transactions.find(
    (transaction) => transaction.label === "Drawdown"
  );
  const onCalculate = ({ RequestedDate, RequestedAmount, Notes }) => {
    setRequestedDate(RequestedDate);
    setAdditionalAdjustment({
      ActualDate: RequestedDate,
      amount: +RequestedAmount,
      ...mapTransactionToBalance(drawdownTransaction.value),
    });
    setNotes(Notes);
  };

  return (
    <AddFurtherWrapper>
      <H2>Add Further {title}</H2>
      <Form
        onSubmit={onCalculate}
        validate={validate}
        initialValues={initialValues}
        render={({ handleSubmit, submitting }) => {
          return (
            <form onSubmit={handleSubmit}>
              <PriceField label="Requested Amount" name="RequestedAmount" />
              <Field
                component={TextInput}
                label="Requested Date"
                name="RequestedDate"
                type="date"
              />
              <Field component={TextAreaInput} label="Notes" name="Notes" />
              <ButtonsContainer>
                <div />
                <Button disabled={submitting}>Calculate</Button>
              </ButtonsContainer>
            </form>
          );
        }}
      />
      <div>
        <TempResultsTable
          currentStatement={currentStatement}
          newStatement={newStatement}
          maturityStatement={maturityStatement}
        />
        <ButtonsContainer>
          <Button kind="secondary" onClick={closeAdd}>
            Cancel
          </Button>
          <Button disabled={requestedDate === undefined} onClick={saveRequest}>
            Save
          </Button>
        </ButtonsContainer>
      </div>
    </AddFurtherWrapper>
  );
}

AddFurther.propTypes = {
  totalGDV: PropTypes.number,
  totalValuations: PropTypes.number,
  currentStatement: PropTypes.object,
  closeAdd: PropTypes.func.isRequired,
  availableFunds: PropTypes.number,
  initialValues: PropTypes.object,
  successCallback: PropTypes.func,
  saveFurther: PropTypes.func.isRequired,
  title: PropTypes.func.isRequired,
};
export default AddFurther;
