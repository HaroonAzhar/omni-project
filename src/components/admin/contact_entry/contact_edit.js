import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import * as yup from "yup";
import moment from "moment";

import { Modal, TextInput } from "components/atoms";
import { validationMsg, regex } from "utils";

import {
  StyledButtonsContainer,
  StyledButton,
} from "../data_view_page/data_entry_context_menu_with_edit/styled_data_entry_context_menu_with_edit";
import { StyledAdminField } from "../styled_admin";

const ContactEdit = ({ dataRecord, shouldShowInputs, onCancel, onSubmit }) => {
  const initialValues = {
    ...dataRecord,
    DateOfBirth: dataRecord.DateOfBirth
      ? moment(dataRecord.DateOfBirth).format(moment.HTML5_FMT.DATE)
      : undefined,
  };

  return (
    <Modal isOpen={shouldShowInputs} onClose={onCancel}>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        mutators={{ ...arrayMutators }}
        render={({ handleSubmit, form }) => {
          return (
            <form onSubmit={handleSubmit}>
              <>
                <StyledAdminField
                  component={TextInput}
                  type="text"
                  label="Forename"
                  name="Forename"
                  validate={(value) =>
                    value ? undefined : validationMsg.required
                  }
                />

                <StyledAdminField
                  component={TextInput}
                  type="text"
                  label="Middle Name"
                  name="MiddleName"
                />

                <StyledAdminField
                  component={TextInput}
                  type="text"
                  label="Surname"
                  name="Surname"
                  validate={(value) =>
                    value ? undefined : validationMsg.required
                  }
                />

                <StyledAdminField
                  component={TextInput}
                  type="date"
                  label="Date Of Birth"
                  name="DateOfBirth"
                />

                <StyledAdminField
                  component={TextInput}
                  type="text"
                  label="National Insurance Number"
                  name="NationalInsuranceNumber"
                  validate={(value) => {
                    const isValid = yup
                      .string()
                      .matches(regex.nationalInsuranceNumber)
                      .isValidSync(value);

                    return !isValid && validationMsg.insuranceNumber;
                  }}
                />
              </>
              <StyledButtonsContainer>
                <StyledButton kind="secondary" onClick={onCancel}>
                  Cancel
                </StyledButton>
                <StyledButton>Save</StyledButton>
              </StyledButtonsContainer>
            </form>
          );
        }}
      />
    </Modal>
  );
};

export default ContactEdit;

ContactEdit.propTypes = {
  dataRecord: PropTypes.object.isRequired,
  shouldShowInputs: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
