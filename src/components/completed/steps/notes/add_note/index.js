import React, { useRef } from "react";
import { Form, Field } from "react-final-form";

import { Button, H2, TextAreaInput } from "components/atoms";
import { formValidation } from "utils";

import { AddContainer } from "../../shared_styles/styled_add";
import useSaveNote from "./use_save_note";
import validationSchema from "./validation_schema";
import useNotesData from "../view_notes/use_notes_data";

const AddNote = () => {
  const { fetchNotesAndStore } = useNotesData();

  const saveNewNote = useSaveNote();

  const formRef = useRef();

  const submit = (values) => {
    saveNewNote(values).then((res) => {
      if (res) {
        fetchNotesAndStore();
        formRef.current.reset();
      }
    });
  };
  const validate = async (values) => formValidation(validationSchema, values);
  return (
    <AddContainer>
      <H2>Add Note</H2>
      <Form
        onSubmit={submit}
        validate={validate}
        render={({ handleSubmit, submitting, form }) => {
          formRef.current = form;
          return (
            <form onSubmit={handleSubmit}>
              <Field
                component={TextAreaInput}
                name="Text"
                label="Text"
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

export default AddNote;
