import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Field, Form } from "react-final-form";
import * as yup from "yup";

import { EditIcon } from "components/icons";
import {
  useRequestWithProgressToastRollbar,
  validationMsg,
  formValidation,
} from "utils";
import { correctAdjustment } from "utils/requests";
import { Modal, Button, H2, PriceField, TextAreaInput } from "components/atoms";
import { ButtonsContainer } from "components/completed/steps/shared_styles/styled_filter";

import useAdjustmentsData from "./use_adjustments_data";

const validationSchema = yup.object().shape({
  CorrectedAmount: yup.number().positive().required(validationMsg.required),
  Description: yup.string().required(validationMsg.required),
});
const CorrectAdjustment = ({ adjustment }) => {
  const { id } = useParams();
  const { fetchAdjustmentsAndStore } = useAdjustmentsData(false);
  const [shouldShowEditingModal, setShouldShowEditingModal] = useState(false);

  const onEdit = () => setShouldShowEditingModal(true);
  const onClose = () => setShouldShowEditingModal(false);
  const correctRequest = useRequestWithProgressToastRollbar(correctAdjustment);

  const sendEditingRequest = (values) => {
    correctRequest(id, adjustment.AdjustmentId, values).then((res) => {
      if (res) {
        fetchAdjustmentsAndStore();
        setShouldShowEditingModal(false);
      }
    });
  };

  const validate = async (values) => formValidation(validationSchema, values);

  const initialValues = {
    CorrectedAmount: adjustment.amount,
  };
  return (
    <>
      <Modal isOpen={shouldShowEditingModal} onClose={onClose}>
        <H2>Add adjustment correction</H2>
        <Form
          onSubmit={sendEditingRequest}
          initialValues={initialValues}
          validate={validate}
          render={({ handleSubmit, submitting }) => {
            return (
              <form onSubmit={handleSubmit}>
                <PriceField label="Corrected Amount" name="CorrectedAmount" />
                <Field
                  component={TextAreaInput}
                  name="Description"
                  label="Description"
                />
                <ButtonsContainer>
                  <Button type="button" onClick={onClose} kind="secondary">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    Save
                  </Button>
                </ButtonsContainer>
              </form>
            );
          }}
        />
      </Modal>
      <button type="button" onClick={onEdit}>
        <EditIcon />
      </button>
    </>
  );
};

CorrectAdjustment.propTypes = {
  adjustment: PropTypes.object.isRequired,
};

export default CorrectAdjustment;
