import React from "react";

import { ChangeStageButton } from "components/molecules";
import { convertCompleted } from "utils/requests";

const RedeemedButton = () => {
  return (
    <ChangeStageButton
      pathnameGenerate={(id) => `redeemed/${id}`}
      request={convertCompleted}
    >
      {"Redeemed >>"}
    </ChangeStageButton>
  );
};

export default RedeemedButton;
