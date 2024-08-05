import React, { useState } from "react";
import { useParams } from "react-router";

import { Button } from "components/atoms";

import GenerateEndOfMonthModal from "../../../completed/steps/summary/completed_actions/generate_end_of_month_modal";
import generateEndOfMonth from "../../../completed/steps/summary/completed_actions/generate_end_of_month";

const GenerateEndOfMonth = () => {
  const { id } = useParams();
  const [caseToGenerateEndOfMonth, setCaseToGenerateEndOfMonth] = useState(
    null
  );
  const closeEndOfMonthModal = () => setCaseToGenerateEndOfMonth(null);
  const openEndOfMonthModal = () => setCaseToGenerateEndOfMonth(id);

  return (
    <>
      <Button kind="link" onClick={() => openEndOfMonthModal()}>
        Generate End of Month
      </Button>
      <GenerateEndOfMonthModal
        caseToGenerateUuid={caseToGenerateEndOfMonth}
        onClose={closeEndOfMonthModal}
        onGenerated={closeEndOfMonthModal}
        generateRequestFunc={generateEndOfMonth}
      />
    </>
  );
};

export default GenerateEndOfMonth;
