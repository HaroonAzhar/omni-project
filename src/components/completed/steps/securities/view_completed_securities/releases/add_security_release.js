import React from "react";
import PropTypes from "prop-types";
import { Field, Form } from "react-final-form";

import { formValidation, stringListAsSelectOptions } from "utils";
import {
  Button,
  H2,
  PriceField,
  SelectInput,
  TextAreaInput,
} from "components/atoms";
import { Question } from "components/molecules";

import { ButtonsContainer } from "../../../shared_styles/styled_filter";
import { AddContainer } from "../../../shared_styles/styled_add";
import useSaveSecurityRelease from "./use_save_security_release";
import validationSchema from "./validation_schema";
import useCompletedSecuritiesData from "../use_completed_securities_data";
import { saleTypes } from "./sale_type_options";

function AddSecurityRelease({ security, closeAdd }) {
  const saveSecurityNewRelease = useSaveSecurityRelease(security);
  const { fetchSecuritiesAndStore } = useCompletedSecuritiesData();

  const validate = async (values) => formValidation(validationSchema, values);

  const submit = (values) => {
    saveSecurityNewRelease(values).then((res) => {
      if (res) {
        fetchSecuritiesAndStore();
        closeAdd();
      }
    });
  };
  return (
    <>
      <H2>Add Security Release</H2>
      <Form
        onSubmit={submit}
        validate={validate}
        render={({ handleSubmit, submitting }) => {
          return (
            <form onSubmit={handleSubmit}>
              <AddContainer>
                <PriceField label="Sale Price" name="SalePrice" />

                <Field
                  component={SelectInput}
                  label="Sale Type"
                  name="SaleType"
                  options={stringListAsSelectOptions(saleTypes)}
                />

                <Question
                  label="Disposal To Connected Party"
                  name="DisposalToConnectedParty"
                />

                <Field component={TextAreaInput} label="Notes" name="Notes" />
                <ButtonsContainer>
                  <Button kind="secondary" onClick={closeAdd}>
                    Cancel
                  </Button>

                  <Button disabled={submitting}>Save</Button>
                </ButtonsContainer>
              </AddContainer>
            </form>
          );
        }}
      />
    </>
  );
}

AddSecurityRelease.propTypes = {
  security: PropTypes.object.isRequired,
  closeAdd: PropTypes.func.isRequired,
};

export default AddSecurityRelease;
