import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";

import { StyledError } from "components/atoms/text_input/styled_text_input";
import { Modal, Checkbox, TextInput } from "components/atoms";
import { validationMsg } from "utils";

import {
  StyledButtonsContainer,
  StyledButton,
} from "../data_view_page/data_entry_context_menu_with_edit/styled_data_entry_context_menu_with_edit";
import { StyledAdminField } from "../styled_admin";
import IndividualBrokers from "./individual_brokers";
import { StyledAdminCheckbox } from "./styled_broker_entry";

const BrokerEdit = ({ dataRecord, shouldShowInputs, onCancel, onSubmit }) => {
  const [submissionError, setSubmissionError] = useState("");
  const initialValues =
    dataRecord.CompanyName !== undefined ? dataRecord : { isApproved: false };
  const submit = (data) => {
    onSubmit(data).then((res) => {
      if (!res)
        setSubmissionError("Save failed - check the name is not a duplicate");
    });
  };
  return (
    <Modal isOpen={shouldShowInputs} onClose={onCancel}>
      <Form
        onSubmit={(data) => {
          submit(data);
        }}
        initialValues={initialValues}
        mutators={{ ...arrayMutators }}
        render={({ handleSubmit, form }) => {
          return (
            <form onSubmit={handleSubmit}>
              <>
                <StyledAdminField
                  component={TextInput}
                  type="text"
                  label="Broker"
                  name="CompanyName"
                  validate={(value) =>
                    value ? undefined : validationMsg.required
                  }
                />

                <StyledAdminCheckbox>
                  <Field
                    component={Checkbox}
                    type="checkbox"
                    label="Approved"
                    name="isApproved"
                  />
                </StyledAdminCheckbox>

                <IndividualBrokers form={form} />
              </>
              <StyledButtonsContainer>
                <StyledButton kind="secondary" onClick={onCancel}>
                  Cancel
                </StyledButton>
                <StyledButton>Save</StyledButton>
              </StyledButtonsContainer>
              <StyledError>{submissionError}</StyledError>
            </form>
          );
        }}
      />
    </Modal>
  );
};

export default BrokerEdit;

BrokerEdit.propTypes = {
  dataRecord: PropTypes.object.isRequired,
  shouldShowInputs: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
