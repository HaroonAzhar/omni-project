import React, { useState } from "react";
import PropTypes from "prop-types";
import { Field, Form } from "react-final-form";
import moment from "moment";
import * as yup from "yup";

import { Button, H2, Modal, SelectInput, TextInput } from "components/atoms";
import useCompletedData from "components/completed/use_completed_data";
import { validationMsg, formValidation } from "utils";

import { ButtonsContainer } from "../../shared_styles/styled_filter";
import useSaveManualStatus from "../hooks/use_save_manual_status";
import { StyledManualStatusForm } from "./styled_loan_status";
import { REVERT_TO_AUTOMATIC_STATUS, title } from "./consts";
import getStatusOptions from "./get_status_options";

const validationSchema = yup.object().shape({
  EffectiveFrom: yup.string().required(validationMsg.required),
  Status: yup.string().required(validationMsg.required),
});
const ManualStatusForm = ({
  onClose,
  automaticLoanStatus,
  dateOfCompletion,
  lastManualStatus,
}) => {
  const initialValues = {
    EffectiveFrom: moment().format("YYYY-MM-DD"),
  };
  const { savingRequest, deletingRequest } = useSaveManualStatus();
  const [reFetch, setRefetch] = useState(false);
  useCompletedData(() => {}, reFetch);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  const close = () => {
    setRefetch(true);
    onClose();
  };
  const onSubmit = (values) => {
    savingRequest(values).then((res) => {
      if (!res) {
        return;
      }
      if (
        moment(values.EffectiveFrom).format(moment.HTML5_FMT.DATE) ===
        moment(lastManualStatus?.EffectiveFrom).format(moment.HTML5_FMT.DATE)
      ) {
        setIsModalOpen(true);
        return;
      }
      close();
    });
  };

  const deleteLast = () => {
    deletingRequest(lastManualStatus.ManualStatusId).then(() => {
      closeModal();
      close();
    });
  };
  const validate = async (values) => formValidation(validationSchema, values);
  return (
    <StyledManualStatusForm>
      <H2>{title}</H2>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={validate}
        render={({ handleSubmit, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Modal isOpen={isModalOpen} onClose={closeModal}>
                <H2>
                  {values.Status === REVERT_TO_AUTOMATIC_STATUS
                    ? "Do you want to completely remove the previous manual status?"
                    : "Do you want to replace the previous manual status?"}
                </H2>
                <ButtonsContainer>
                  <Button kind="secondary" onClick={close} type="button">
                    No
                  </Button>
                  <Button onClick={deleteLast}>Yes</Button>
                </ButtonsContainer>
              </Modal>
              <Field
                name="EffectiveFrom"
                label="Effective From"
                component={TextInput}
                type="date"
                validate={(value) => {
                  if (moment(value).isBefore(moment(dateOfCompletion), "day")) {
                    return validationMsg.manualStatusBeforeCompletion;
                  }
                  if (lastManualStatus === undefined) {
                    return undefined;
                  }
                  if (
                    moment(value).isBefore(
                      moment(lastManualStatus?.EffectiveFrom),
                      "day"
                    )
                  ) {
                    return validationMsg.manualStatusBeforeExisting;
                  }
                }}
              />
              <Field
                name="Status"
                label="New Status"
                component={SelectInput}
                type="text"
                options={getStatusOptions(
                  automaticLoanStatus,
                  lastManualStatus
                )}
              />
              <ButtonsContainer>
                <Button kind="secondary" onClick={onClose} type="button">
                  Cancel
                </Button>
                <Button>Save</Button>
              </ButtonsContainer>
            </form>
          );
        }}
      />
    </StyledManualStatusForm>
  );
};

ManualStatusForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  automaticLoanStatus: PropTypes.string.isRequired,
  dateOfCompletion: PropTypes.string.isRequired,
  lastManualStatus: PropTypes.object,
};

export default ManualStatusForm;
