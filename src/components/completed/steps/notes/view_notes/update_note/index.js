import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Form, Field } from "react-final-form";

import { EditIcon } from "components/icons";
import { useRequestWithProgressToastRollbar, formValidation } from "utils";
import { updateNote } from "utils/requests";
import { Modal, Button, H2, TextAreaInput } from "components/atoms";

import useNotesData from "../use_notes_data";
import validationSchema from "../../add_note/validation_schema";
import { EditNoteContainer, SaveButtonContainer } from "./styled_update_note";

const EditNote = ({ note }) => {
  const { id } = useParams();
  const { fetchNotesAndStore } = useNotesData();
  const [shouldShowEditingModal, setShouldShowEditingModal] = useState();

  const onEdit = () => setShouldShowEditingModal(true);
  const onClose = () => setShouldShowEditingModal(false);
  const updateRequest = useRequestWithProgressToastRollbar(updateNote);

  const sendEditingRequest = (values) => {
    updateRequest(id, note.NoteId, values).then(() => {
      fetchNotesAndStore();
      setShouldShowEditingModal(false);
    });
  };

  const validate = async (values) => formValidation(validationSchema, values);

  return (
    <>
      <Modal isOpen={shouldShowEditingModal} onClose={onClose}>
        <EditNoteContainer>
          <H2>Edit note</H2>
          <Form
            onSubmit={sendEditingRequest}
            validate={validate}
            initialValues={note}
            render={({ handleSubmit, submitting }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Field
                    component={TextAreaInput}
                    name="Text"
                    label="Text"
                    type="text"
                  />
                  <SaveButtonContainer>
                    <div></div>
                    <Button type="submit" disabled={submitting}>
                      Save
                    </Button>
                  </SaveButtonContainer>
                </form>
              );
            }}
          />
        </EditNoteContainer>
      </Modal>
      <button type="button" onClick={onEdit}>
        <EditIcon />
      </button>
    </>
  );
};

EditNote.propTypes = {
  note: PropTypes.object.isRequired,
};

export default EditNote;
