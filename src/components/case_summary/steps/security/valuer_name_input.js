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

const valuers = [
  " ",
  "Alexander Lawson Surveyors Ltd",
  "Bruton Knowles LLP",
  "CH (Norwich) Ltd T/A Humberts",
  "Musson Liggins Limited",
  "Savills (UK) Limited",
  "Vpanel T/A VAS Panel Limited",
];

const ValuerNameInput = ({ initialState, save, name }) => {
  return (
    <Form
      onSubmit={save}
      initialValues={initialState}
      render={({ handleSubmit }) => (
        <StyledForm onSubmit={handleSubmit}>
          <Field
            component={SelectInput}
            type="select"
            name={name}
            options={valuers}
            label="Valuer name"
          />
          <OnChange name={name}>
            {(valuer_name) => save({ valuer_name })}
          </OnChange>
        </StyledForm>
      )}
    />
  );
};

ValuerNameInput.propTypes = {
  initialState: PropTypes.object.isRequired,
  save: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default ValuerNameInput;
