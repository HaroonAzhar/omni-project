import React, { useRef } from "react";
import { Field, Form } from "react-final-form";
import moment from "moment";

import {
  Button,
  H2,
  PriceField,
  TextAreaInput,
  TextInput,
} from "components/atoms";
import { formValidation } from "utils";

import validationSchema from "./validation_schema";
import useSaveCashflow from "./use_save_cashflow";
import { AddContainer } from "../../shared_styles/styled_add";
import useCashflowsData from "../view_cashflows/use_cashflows_data";

const AddCashflow = () => {
  const validate = async (values) => formValidation(validationSchema, values);

  const saveNewCashflow = useSaveCashflow();
  const { fetchCashflowsAndStore } = useCashflowsData();

  const formRef = useRef();

  const submit = (values) => {
    saveNewCashflow(values).then((res) => {
      if (res) {
        fetchCashflowsAndStore();
        formRef.current.reset();
      }
    });
  };

  return (
    <AddContainer>
      <H2>Set Remaining Expected Cashflow</H2>
      <Form
        onSubmit={submit}
        validate={validate}
        initialValues={{ ActualDate: moment().format(moment.HTML5_FMT.DATE) }}
        render={({ handleSubmit, submitting, form }) => {
          formRef.current = form;
          return (
            <form onSubmit={handleSubmit}>
              <PriceField label="Amount" name="Amount" />
              <Field
                component={TextInput}
                name="ActualDate"
                label="Actual Date"
                type="date"
              />
              <Field
                component={TextAreaInput}
                name="Description"
                label="Description"
                type="text"
              />
              <Button type="submit" disabled={submitting}>
                Add
              </Button>
            </form>
          );
        }}
      />
    </AddContainer>
  );
};

export default AddCashflow;
