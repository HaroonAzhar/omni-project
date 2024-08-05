import React, { useRef } from "react";
import { Form, Field } from "react-final-form";
import * as yup from "yup";

import { Button, SelectInput } from "components/atoms";
import { formValidation, validationMsg } from "utils";

import useSaveCrossCollateralisedLoan from "../use_save_cross_collateralised_loan";
import useCrossCollateralisedLoansData from "../use_cross_collateralised_loans_data";
import useCompletedLoans from "./use_completed_loans";

const completedLoanAsOption = (completedLoans) => [
  { label: "Choose One", value: "" },
  ...completedLoans.map((completed) => ({
    value: completed.Id,
    label: `${completed.CaseNr} - ${completed.Applicants}`,
  })),
];

const validationSchema = yup.object().shape({
  otherCaseUuid: yup.string().required(validationMsg.required),
});

function AddCrossCollateralisedLoanContent() {
  const saveCrossCollateralisedLoan = useSaveCrossCollateralisedLoan();
  const {
    fetchCrossCollateralisedLoansAndStore,
    crossCollateralisedLoans,
  } = useCrossCollateralisedLoansData(false);

  const formRef = useRef({});
  const saveRequest = (values) => {
    saveCrossCollateralisedLoan(values).then((res) => {
      if (res) {
        fetchCrossCollateralisedLoansAndStore();
        formRef.current.reset();
      }
    });
  };

  const existingUuids = crossCollateralisedLoans.map((loan) => loan.caseUuid);
  const completedLoans = useCompletedLoans();
  const loansWithoutAlreadyAdded = completedLoans.filter(
    (completed) => !existingUuids.includes(completed.Id)
  );
  const validate = async (values) => formValidation(validationSchema, values);

  return (
    <>
      <Form
        onSubmit={saveRequest}
        validate={validate}
        render={({ handleSubmit, form }) => {
          formRef.current = form;
          return (
            <form onSubmit={handleSubmit}>
              <Field
                component={SelectInput}
                name="otherCaseUuid"
                options={completedLoanAsOption(loansWithoutAlreadyAdded)}
              />

              <Button>Add</Button>
            </form>
          );
        }}
      />
    </>
  );
}

export default AddCrossCollateralisedLoanContent;
