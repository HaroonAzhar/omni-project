import React from "react";

import { ChangeStageButton } from "components/molecules";
import { backCaseSummaryToApplication } from "utils/requests";

const BackToApplicationButton = () => {
  return (
    <ChangeStageButton
      pathnameGenerate={(id) => `application/${id}/checklist`}
      request={backCaseSummaryToApplication}
    >
      {"<< Application"}
    </ChangeStageButton>
  );
};

export default BackToApplicationButton;
