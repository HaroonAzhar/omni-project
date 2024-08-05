import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

import { GenerateDocumentModal } from "components/completed/components";
import { Checkbox } from "components/atoms";
import { CheckboxWrapper } from "components/completed/components/generate_document_modal/styled_generate_document_modal";

import generateWaterfall from "./generate_waterfall";

const GenerateWaterfallModal = ({
  caseToGenerateUuid,
  onClose,
  onGenerated,
}) => {
  return (
    <GenerateDocumentModal
      caseToGenerateUuid={caseToGenerateUuid}
      onClose={onClose}
      onGenerated={onGenerated}
      generateRequestFunc={generateWaterfall}
      title="Waterfall"
    >
      <CheckboxWrapper>
        <Field
          component={Checkbox}
          label="Full Redemption"
          name="fullRedemption"
        />
      </CheckboxWrapper>
    </GenerateDocumentModal>
  );
};

export default GenerateWaterfallModal;

GenerateWaterfallModal.propTypes = {
  caseToGenerateUuid: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onGenerated: PropTypes.func.isRequired,
};
