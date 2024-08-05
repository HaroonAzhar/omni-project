import { useState } from "react";
import { useParams } from "react-router-dom";

import { useRequestWithProgressToastRollbar } from "utils";
import {
  generateCaseSummaryDocument,
  generateFacilityLetterDocument,
} from "utils/requests";

const useGenerateCallbacks = () => {
  const { id } = useParams();
  const caseSummaryDocumentRequest = useRequestWithProgressToastRollbar(() =>
    generateCaseSummaryDocument(id)
  );
  const facilityLetterDocumentRequest = useRequestWithProgressToastRollbar(
    (facilityLetterForm) =>
      generateFacilityLetterDocument(id, facilityLetterForm)
  );
  const [facilityOpen, setFacilityOpen] = useState(false);
  const closeFacility = () => setFacilityOpen(false);
  const openFacility = () => setFacilityOpen(true);

  return {
    caseSummaryDocumentRequest,
    facilityLetterDocumentRequest,
    facilityOpen,
    closeFacility,
    openFacility,
  };
};

export default useGenerateCallbacks;
