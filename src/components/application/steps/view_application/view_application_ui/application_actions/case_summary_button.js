import React from "react";

import { ChangeStageButton } from "components/molecules";
import { convertToCaseSummary } from "utils/requests";

const CaseSummaryButton = () => {
  return (
    <ChangeStageButton
      pathnameGenerate={(id) =>
        `case_summary/${id}/checklist/view_case_summary`
      }
      request={convertToCaseSummary}
    >
      {"Case Summary >>"}
    </ChangeStageButton>
  );
};

export default CaseSummaryButton;
