import React, { useState } from "react";
import { useParams } from "react-router";

import { DocumentGeneratingDropdown } from "components/molecules";
import { GenerateStatementReportForCase } from "components/organisms";

const DocumentGeneratingRedeemedDropdown = () => {
  const { id } = useParams();
  const [caseToGenerateUuid, setCaseToGenerateUuid] = useState(null);

  const closeStatementModal = () => setCaseToGenerateUuid(null);
  const openStatementModal = () => setCaseToGenerateUuid(id);

  const documentActions = {
    "Generate Statement Report": openStatementModal,
  };
  return (
    <DocumentGeneratingDropdown documentActions={documentActions}>
      <GenerateStatementReportForCase
        caseToGenerateUuid={caseToGenerateUuid}
        onClose={closeStatementModal}
        onGenerated={closeStatementModal}
      />
    </DocumentGeneratingDropdown>
  );
};

export default DocumentGeneratingRedeemedDropdown;
