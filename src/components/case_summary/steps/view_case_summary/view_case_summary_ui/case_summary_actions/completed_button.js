import React from "react";

import { ChangeStageButton } from "components/molecules";

const CompletedButton = () => {
  return (
    <ChangeStageButton
      pathnameGenerate={(id) => `case_summary/${id}/convert`}
      request={async () => {}}
    >
      {"Completed >>"}
    </ChangeStageButton>
  );
};

export default CompletedButton;
