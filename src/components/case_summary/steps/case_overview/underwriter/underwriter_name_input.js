import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import styled from "styled-components";
import { OnChange } from "react-final-form-listeners";

import { SelectInput } from "components/atoms";

const StyledForm = styled.form`
  align-items: flex-end;
  display: flex;
`;

const UnderwriterNameInput = ({
  initialState,
  save,
  fieldName,
  underwriters,
}) => {
  return (
    <Form
      onSubmit={save}
      initialValues={initialState}
      render={({ handleSubmit }) => (
        <StyledForm onSubmit={handleSubmit}>
          <Field
            component={SelectInput}
            type="select"
            name={fieldName}
            options={underwriters}
          />
          <OnChange name={fieldName}>{save}</OnChange>
        </StyledForm>
      )}
    />
  );
};

UnderwriterNameInput.propTypes = {
  initialState: PropTypes.object.isRequired,
  save: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  underwriters: PropTypes.array.isRequired,
};

export default UnderwriterNameInput;
