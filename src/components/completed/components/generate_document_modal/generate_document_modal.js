import React from "react";
import PropTypes from "prop-types";
import { Field, Form } from "react-final-form";
import moment from "moment";

import { Button, Checkbox, H2, Modal, TextInput } from "components/atoms";
import { useRequestWithProgressToastRollbar } from "utils";

import {
  GenerateDocumentModalContainer,
  ButtonsContainer,
  CheckboxWrapper,
} from "./styled_generate_document_modal";

const GenerateDocumentModal = ({
  caseToGenerateUuid,
  onClose,
  onGenerated,
  generateRequestFunc,
  title,
  children,
}) => {
  const initialValues = {
    date: moment().format(moment.HTML5_FMT.DATE),
  };
  const generateRequest = useRequestWithProgressToastRollbar(
    generateRequestFunc
  );
  const onSubmit = async ({ date, useMaturityDate, ...rest }) => {
    const success = await generateRequest(
      caseToGenerateUuid,
      date,
      useMaturityDate,
      rest
    );

    if (success) {
      onGenerated();
    }
  };
  return (
    <Modal isOpen={caseToGenerateUuid !== null} onClose={onClose}>
      <GenerateDocumentModalContainer>
        <H2>Generate {title} report for date</H2>
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          render={({ handleSubmit, values }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Field
                  component={TextInput}
                  label="Date"
                  name="date"
                  type="date"
                  disabled={values.useMaturityDate}
                />
                <CheckboxWrapper>
                  <Field
                    component={Checkbox}
                    label="Use Maturity Date"
                    name="useMaturityDate"
                  />
                </CheckboxWrapper>
                {children}
                <ButtonsContainer>
                  <Button kind="secondary" onClick={onClose}>
                    Cancel
                  </Button>

                  <Button>Generate</Button>
                </ButtonsContainer>
              </form>
            );
          }}
        />
      </GenerateDocumentModalContainer>
    </Modal>
  );
};

export default GenerateDocumentModal;

GenerateDocumentModal.propTypes = {
  caseToGenerateUuid: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onGenerated: PropTypes.func.isRequired,
  generateRequestFunc: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};
