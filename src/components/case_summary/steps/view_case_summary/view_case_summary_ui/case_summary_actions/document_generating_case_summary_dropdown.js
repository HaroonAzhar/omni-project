import React from "react";

import { Modal } from "components/atoms";
import { DocumentGeneratingDropdown } from "components/molecules";
import { FacilityLetterContent } from "components/application/facility_letter_page";

import useGenerateCallbacks from "./use_generate_callbacks";

const DocumentGeneratingApplicationDropdown = () => {
  const {
    caseSummaryDocumentRequest,
    facilityLetterDocumentRequest,
    closeFacility,
    openFacility,
    facilityOpen,
  } = useGenerateCallbacks();

  const documentActions = {
    "Generate Loan Facility page": openFacility,
    "Generate Case Summary Document": caseSummaryDocumentRequest,
  };
  return (
    <DocumentGeneratingDropdown documentActions={documentActions}>
      <Modal isOpen={facilityOpen} onClose={closeFacility}>
        <FacilityLetterContent
          facilityLetterDocumentRequest={facilityLetterDocumentRequest}
        />
      </Modal>
    </DocumentGeneratingDropdown>
  );
};

export default DocumentGeneratingApplicationDropdown;
