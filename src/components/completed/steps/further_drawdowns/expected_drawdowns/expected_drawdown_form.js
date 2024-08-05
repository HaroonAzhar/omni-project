import React from "react";
import PropTypes from "prop-types";
import { Field, Form } from "react-final-form";
import moment from "moment";

import { Button, PriceField, TextInput } from "components/atoms";
import { formValidation } from "utils";

import { ButtonsContainer } from "../../shared_styles/styled_filter";
import validationSchema from "./expected_drawdown_validation_schema";
import { FormWrapper } from "./styled_expected_drawdowns";

function ExpectedDrawdownForm({ saveRequest, initialValues, close }) {
  const validate = async (values) => formValidation(validationSchema, values);

  const initial = {
    ...initialValues,
    Date: moment(initialValues?.Date).format(moment.HTML5_FMT.DATE),
  };

  return (
    <FormWrapper>
      <Form
        onSubmit={saveRequest}
        initialValues={initial}
        validate={validate}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <PriceField label="Amount" name="Amount" />
              <Field
                component={TextInput}
                label="Date"
                name="Date"
                type="date"
              />
              <ButtonsContainer>
                <Button kind="secondary" onClick={close}>
                  Cancel
                </Button>
                <Button>Save</Button>
              </ButtonsContainer>
            </form>
          );
        }}
      />
    </FormWrapper>
  );
}

ExpectedDrawdownForm.propTypes = {
  saveRequest: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  close: PropTypes.func.isRequired,
};

export default ExpectedDrawdownForm;
