import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

import { generateCompletedStatementReport } from "utils/requests";
import { GenerateDocumentModal } from "components/completed/components";
import { Checkbox } from "components/atoms";
import { CheckboxWrapper } from "components/completed/components/generate_document_modal/styled_generate_document_modal";

const GenerateStatementReportForCase = ({
  caseToGenerateUuid,
  onClose,
  onGenerated,
}) => {
  return (
    <GenerateDocumentModal
      caseToGenerateUuid={caseToGenerateUuid}
      onClose={onClose}
      onGenerated={onGenerated}
      generateRequestFunc={generateCompletedStatementReport}
      title="Statement"
    >
      <CheckboxWrapper>
        <Field
          component={Checkbox}
          label="With Minimum Interest"
          name="withMinimumInterest"
          type="checkbox"
        />
      </CheckboxWrapper>
    </GenerateDocumentModal>
  );
};

export default GenerateStatementReportForCase;

GenerateStatementReportForCase.propTypes = {
  caseToGenerateUuid: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onGenerated: PropTypes.func.isRequired,
};
