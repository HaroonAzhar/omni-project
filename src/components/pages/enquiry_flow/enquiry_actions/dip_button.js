import React from "react";

import { ChangeStageButton } from "components/molecules";
import { convertEnquiry } from "utils/requests";

const DipButton = () => {
  return (
    <ChangeStageButton
      pathnameGenerate={(id) => `dip/${id}`}
      request={convertEnquiry}
    >
      {"DIP >>"}
    </ChangeStageButton>
  );
};

export default DipButton;
