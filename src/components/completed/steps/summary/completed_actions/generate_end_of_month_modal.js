import React from "react";
import PropTypes from "prop-types";
import { Field, Form } from "react-final-form";
import moment from "moment";

import { Button, H2, Modal, TextInput } from "components/atoms";
import { useRequestWithProgressToastRollbar } from "utils";
import {
  GenerateDocumentModalContainer,
  ButtonsContainer,
} from "components/completed/components/generate_document_modal/styled_generate_document_modal";

const GenerateEndOfMonthModal = ({
  caseToGenerateUuid,
  onClose,
  onGenerated,
  generateRequestFunc,
}) => {
  const initialValues = {
    reportPeriodStart: moment().startOf("month").format(moment.HTML5_FMT.DATE),
    reportPeriodEnd: moment().endOf("month").format(moment.HTML5_FMT.DATE),
  };
  const generateRequest = useRequestWithProgressToastRollbar(
    generateRequestFunc
  );

  const onSubmit = async ({
    reportPeriodStart,
    reportPeriodEnd,
    lastGenerationTime,
    effectiveGenerationTime,
  }) => {
    const success = await generateRequest(
      caseToGenerateUuid,
      reportPeriodStart,
      reportPeriodEnd,
      lastGenerationTime,
      effectiveGenerationTime
    );

    if (success) {
      onGenerated();
    }
  };
  return (
    <Modal isOpen={caseToGenerateUuid !== null} onClose={onClose}>
      <GenerateDocumentModalContainer>
        <H2>Generate End of Month Report</H2>
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          render={({ handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Field
                  component={TextInput}
                  label="Report Period Start"
                  name="reportPeriodStart"
                  type="date"
                />
                <Field
                  component={TextInput}
                  label="Report Period End"
                  name="reportPeriodEnd"
                  type="date"
                />

                <Field
                  component={TextInput}
                  label="Last Generation Time"
                  name="lastGenerationTime"
                  type="datetime-local"
                />
                <Field
                  component={TextInput}
                  label="Effective Generation Time "
                  name="effectiveGenerationTime "
                  type="datetime-local"
                />
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

export default GenerateEndOfMonthModal;

GenerateEndOfMonthModal.propTypes = {
  caseToGenerateUuid: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onGenerated: PropTypes.func.isRequired,
  generateRequestFunc: PropTypes.func.isRequired,
};
