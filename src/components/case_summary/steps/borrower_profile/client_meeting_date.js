import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Field, Form } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import moment from "moment";

import { TextInput } from "components/atoms";

const StyledForm = styled.form`
  align-items: flex-end;
  display: flex;
`;

const ClientMeetingDate = ({ initialState, save, fieldName }) => {
  return (
    <Form
      onSubmit={save}
      initialValues={{
        [fieldName]: moment(initialState ?? "").format("YYYY-MM-DD"),
      }}
      render={({ handleSubmit }) => (
        <StyledForm onSubmit={handleSubmit}>
          <Field component={TextInput} type="date" name={fieldName} />
          <OnChange name={fieldName}>{save}</OnChange>
        </StyledForm>
      )}
    />
  );
};

export default ClientMeetingDate;

ClientMeetingDate.propTypes = {
  initialState: PropTypes.string,
  save: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
};
