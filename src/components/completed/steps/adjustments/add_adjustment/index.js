import React, { useRef } from "react";
import { Field, Form } from "react-final-form";

import {
  Button,
  H2,
  PriceField,
  SelectInput,
  TextAreaInput,
  TextInput,
} from "components/atoms";
import { formValidation } from "utils";
import { saveAdjustment } from "utils/requests";

import getTransactionTypeOptions from "./get_transaction_type_options";
import validationSchema from "./validation_schema";
import useSaveAdjustment from "./use_save_adjustment";
import { AddContainer } from "../../shared_styles/styled_add";
import mapTransactionToBalance from "./map_transaction_to_balance";
import useAdjustmentsData from "../view_adjustments/use_adjustments_data";

const AddAdjustment = () => {
  const validate = async (values) => formValidation(validationSchema, values);

  const { fetchAdjustmentsAndStore } = useAdjustmentsData(false);
  const saveNewAdjustment = useSaveAdjustment(saveAdjustment);
  const formRef = useRef();

  const submit = (values) => {
    const sendData = {
      ...values,
      ...mapTransactionToBalance(values.TransactionType),
    };
    saveNewAdjustment(sendData).then((res) => {
      if (res) {
        fetchAdjustmentsAndStore();
        formRef.current.reset();
      }
    });
  };
  return (
    <AddContainer>
      <H2>Add Adjustment</H2>
      <Form
        onSubmit={submit}
        validate={validate}
        render={({ handleSubmit, submitting, form }) => {
          formRef.current = form;
          return (
            <form onSubmit={handleSubmit}>
              <Field
                component={SelectInput}
                name="TransactionType"
                label="Transaction Type"
                type="text"
                optionsWithGroups={getTransactionTypeOptions()}
              />
              <Field
                component={TextInput}
                name="ActualDate"
                label="Actual Date"
                type="date"
              />
              <PriceField label="Amount" name="Amount" />
              <Field
                component={TextAreaInput}
                name="Description"
                label="Description"
                type="text"
              />
              <Field
                component={TextAreaInput}
                name="InternalNote"
                label="Internal Notes"
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

export default AddAdjustment;
