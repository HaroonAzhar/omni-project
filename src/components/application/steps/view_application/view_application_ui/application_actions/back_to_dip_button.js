import React from "react";

import { ChangeStageButton } from "components/molecules";
import { backApplicationToDip } from "utils/requests";

const BackToDipButton = () => {
  return (
    <ChangeStageButton
      pathnameGenerate={(id) => `dip/${id}`}
      request={backApplicationToDip}
    >
      {"<< DIP"}
    </ChangeStageButton>
  );
};

export default BackToDipButton;
