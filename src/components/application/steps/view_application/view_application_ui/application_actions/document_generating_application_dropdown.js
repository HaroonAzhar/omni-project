import React, { useState } from "react";
import { useParams } from "react-router";

import { Modal } from "components/atoms";
import { DocumentGeneratingDropdown } from "components/molecules";
import { FacilityLetterContent } from "components/application/facility_letter_page";
import { useRequestWithProgressToastRollbar } from "utils";
import { generateFacilityLetterDocument } from "utils/requests";

const DocumentGeneratingApplicationDropdown = () => {
  const [facilityOpen, setFacilityOpen] = useState(false);
  const closeFacility = () => setFacilityOpen(false);
  const openFacility = () => setFacilityOpen(true);

  const { id } = useParams();
  const facilityLetterDocumentRequest = useRequestWithProgressToastRollbar(
    (facilityLetterForm) =>
      generateFacilityLetterDocument(id, facilityLetterForm)
  );

  const documentActions = {
    "Generate Loan Facility page": openFacility,
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
