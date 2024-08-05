import React from "react";
import PropTypes from "prop-types";
import { Field, Form } from "react-final-form";

import { formValidation } from "utils";
import { Button, H2, TextAreaInput } from "components/atoms";

import { ButtonsContainer } from "../../../shared_styles/styled_filter";
import { AddContainer } from "../../../shared_styles/styled_add";
import useSaveSecurityNote from "./use_save_security_note";
import validationSchema from "./validation_schema";
import useCompletedSecuritiesData from "../use_completed_securities_data";

function AddSecurityNote({ security, closeAdd }) {
  const saveSecurityNewNote = useSaveSecurityNote(security);
  const { fetchSecuritiesAndStore } = useCompletedSecuritiesData();

  const validate = async (values) => formValidation(validationSchema, values);

  const submit = (values) => {
    saveSecurityNewNote(values).then((res) => {
      if (res) {
        fetchSecuritiesAndStore();
        closeAdd();
      }
    });
  };
  return (
    <>
      <H2>Add Security Note</H2>
      <Form
        onSubmit={submit}
        validate={validate}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <AddContainer>
                <Field component={TextAreaInput} label="Text" name="Text" />
                <ButtonsContainer>
                  <Button kind="secondary" onClick={closeAdd}>
                    Cancel
                  </Button>

                  <Button>Save</Button>
                </ButtonsContainer>
              </AddContainer>
            </form>
          );
        }}
      />
    </>
  );
}

AddSecurityNote.propTypes = {
  security: PropTypes.object.isRequired,
  closeAdd: PropTypes.func.isRequired,
};

export default AddSecurityNote;
