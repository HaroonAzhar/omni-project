import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";

import { formValidation } from "utils";
import { Button, H2 } from "components/atoms";

import { ButtonsContainer } from "../../../shared_styles/styled_filter";
import { AddContainer } from "../../../shared_styles/styled_add";
import useSaveSecurityValuation from "./use_save_security_valuation";
import validationSchema from "./validation_schema";
import useCompletedSecuritiesData from "../use_completed_securities_data";
import AddSecurityValuationFields from "./add_security_valuation_fields";

function AddSecurityValuation({ security, closeAdd }) {
  const saveSecurityNewValuation = useSaveSecurityValuation(security);
  const { fetchSecuritiesAndStore } = useCompletedSecuritiesData();

  const validate = async (values) => formValidation(validationSchema, values);

  const submit = (values) => {
    saveSecurityNewValuation(values).then((res) => {
      if (res) {
        fetchSecuritiesAndStore();
        closeAdd();
      }
    });
  };
  return (
    <>
      <H2>Add Security Valuation</H2>
      <Form
        onSubmit={submit}
        validate={validate}
        render={({ handleSubmit, values, submitting }) => {
          return (
            <form onSubmit={handleSubmit}>
              <AddContainer>
                <AddSecurityValuationFields values={values} />
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

AddSecurityValuation.propTypes = {
  security: PropTypes.object.isRequired,
  closeAdd: PropTypes.func.isRequired,
};

export default AddSecurityValuation;
