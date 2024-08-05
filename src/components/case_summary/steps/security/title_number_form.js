import React, { useState } from "react";
import PropTypes from "prop-types";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { Form, Field } from "react-final-form";
import styled from "styled-components";
import { OnChange } from "react-final-form-listeners";

import useSaveFormOnChangePath from "components/molecules/text_editor/use_save_form_on_change_path";
import { mainBlue, lightBackgroundBlue } from "styles/colors";
import { TextInput, Button, CrossButton } from "components/atoms";

const StyledTitleNumberContainer = styled.div`
  align-items: flex-end;
  display: flex;
`;

const StyledCrossButton = styled(CrossButton)`
  border: 2px solid ${mainBlue};
  border-radius: 50%;
  height: 32px;
  margin-bottom: 15px;
  margin-left: 40px;
  position: relative;
  top: 0;
  width: 32px;

  &::before,
  &::after {
    background: ${mainBlue};
    height: 2px;
    left: 21%;
  }

  &:hover {
    background: ${lightBackgroundBlue};
    border: 2px solid transparent;
  }
`;

const StyledAddNewFieldButton = styled(Button)`
  margin-bottom: 15px;
`;

const StyledTextInput = styled(TextInput)`
  & input {
    width: 350px;
  }
`;

const TitleNumberForm = ({ initialState, storeData }) => {
  const save = (values) => {
    const validValues = values.title_numbers.filter(Boolean);
    storeData({ title_numbers: validValues });
  };
  const [formData, setFormData] = useState();
  const [isPristine, setIsPristine] = useState(true);

  const changeFormData = (values) => {
    setIsPristine(false);
    setFormData(values);
  };

  useSaveFormOnChangePath({
    shouldSave: !isPristine,
    data: formData,
    onSubmit: save,
  });

  return (
    <Form
      onSubmit={save}
      initialValues={initialState}
      mutators={{ ...arrayMutators }}
      render={({ form, handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <FieldArray name="title_numbers">
            {({ fields }) =>
              fields.map((name, index) => (
                <StyledTitleNumberContainer key={`title-numbers-${index}`}>
                  <Field
                    component={StyledTextInput}
                    type="text"
                    name={name}
                    label={`Title number ${index + 1}`}
                    validate={(data) => !data}
                  />
                  <StyledCrossButton
                    onClick={() => form.mutators.remove("title_numbers", index)}
                  />
                </StyledTitleNumberContainer>
              ))
            }
          </FieldArray>

          <OnChange>{changeFormData}</OnChange>

          <StyledAddNewFieldButton
            kind="extra"
            type="button"
            onClick={() => form.mutators.push("title_numbers", null)}
          >
            + Add title number
          </StyledAddNewFieldButton>

          {values.title_numbers && values.title_numbers.length > 0 && (
            <Button>Save</Button>
          )}
        </form>
      )}
    />
  );
};

TitleNumberForm.propTypes = {
  initialState: PropTypes.object.isRequired,
  storeData: PropTypes.func.isRequired,
};

export default TitleNumberForm;
