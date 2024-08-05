import React, { useState } from "react";
import { useParams } from "react-router";

import { DocumentGeneratingDropdown } from "components/molecules";
import { GenerateStatementReportForCase } from "components/organisms";

import generateWaterfall from "./generate_waterfall";
import GenerateWaterfallModal from "./generate_waterfall_modal";
import GenerateEndOfMonthModal from "./generate_end_of_month_modal";
import generateEndOfMonth from "./generate_end_of_month";

const DocumentGeneratingCompletedDropdown = () => {
  const { id } = useParams();
  const [caseToGenerateUuid, setCaseToGenerateUuid] = useState(null);

  const closeStatementModal = () => setCaseToGenerateUuid(null);
  const openStatementModal = () => setCaseToGenerateUuid(id);

  const [caseToGenerateWaterfall, setCaseToGenerateWaterfall] = useState(null);
  const [caseToGenerateEndOfMonth, setCaseToGenerateEndOfMonth] = useState(
    null
  );

  const closeWaterfallModal = () => setCaseToGenerateWaterfall(null);
  const openWaterfallModal = () => setCaseToGenerateWaterfall(id);

  const closeEndOfMonthModal = () => setCaseToGenerateEndOfMonth(null);

  const openEndOfMonthModal = () => setCaseToGenerateEndOfMonth(id);

  const documentActions = {
    "Generate Statement Report": openStatementModal,
    "Generate Waterfall": openWaterfallModal,
    "Generate End of Month": openEndOfMonthModal,
  };
  return (
    <DocumentGeneratingDropdown documentActions={documentActions}>
      <GenerateStatementReportForCase
        caseToGenerateUuid={caseToGenerateUuid}
        onClose={closeStatementModal}
        onGenerated={closeStatementModal}
      />

      <GenerateWaterfallModal
        caseToGenerateUuid={caseToGenerateWaterfall}
        onClose={closeWaterfallModal}
        onGenerated={closeWaterfallModal}
        generateRequestFunc={generateWaterfall}
        title="Waterfall"
      />

      <GenerateEndOfMonthModal
        caseToGenerateUuid={caseToGenerateEndOfMonth}
        onClose={closeEndOfMonthModal}
        onGenerated={closeEndOfMonthModal}
        generateRequestFunc={generateEndOfMonth}
      />
    </DocumentGeneratingDropdown>
  );
};

export default DocumentGeneratingCompletedDropdown;
