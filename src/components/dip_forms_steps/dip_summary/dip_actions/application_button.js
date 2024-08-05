import React from "react";
import { useSelector } from "react-redux";

import { ChangeStageButton } from "components/molecules";
import { convertDip, backDipToApplication } from "utils/requests";

const ApplicationButton = () => {
  const caseNr = useSelector(({ case: caseData }) => caseData.CaseNr);
  const EditingAsDip = useSelector(
    ({ case: caseData }) => caseData.EditingAsDip
  );

  if (!caseNr) {
    return null;
  }

  const backRequest = (id) =>
    EditingAsDip ? backDipToApplication(id) : convertDip({ id });
  return (
    <ChangeStageButton
      pathnameGenerate={(id) => `application/${id}`}
      request={backRequest}
    >
      {"Application ->"}
    </ChangeStageButton>
  );
};

export default ApplicationButton;
