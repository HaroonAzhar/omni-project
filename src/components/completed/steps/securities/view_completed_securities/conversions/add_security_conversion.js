import React from "react";
import PropTypes from "prop-types";
import { Field, Form } from "react-final-form";

import { formValidation } from "utils";
import { Button, H2, TextAreaInput } from "components/atoms";

import { ButtonsContainer } from "../../../shared_styles/styled_filter";
import { AddContainer } from "../../../shared_styles/styled_add";
import useSaveSecurityConversion from "./use_save_security_conversion";
import validationSchema from "./validation_schema";
import useCompletedSecuritiesData from "../use_completed_securities_data";

function AddSecurityConversion({ security, closeAdd }) {
  const saveSecurityNewConversion = useSaveSecurityConversion(security);
  const { fetchSecuritiesAndStore } = useCompletedSecuritiesData();

  const validate = async (values) => formValidation(validationSchema, values);

  const submit = (values) => {
    saveSecurityNewConversion(values).then((res) => {
      if (res) {
        fetchSecuritiesAndStore();
        closeAdd();
      }
    });
  };
  return (
    <>
      <H2>Add Security Conversion</H2>
      <Form
        onSubmit={submit}
        validate={validate}
        render={({ handleSubmit, submitting }) => {
          return (
            <form onSubmit={handleSubmit}>
              <AddContainer>
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

AddSecurityConversion.propTypes = {
  security: PropTypes.object.isRequired,
  closeAdd: PropTypes.func.isRequired,
};

export default AddSecurityConversion;
