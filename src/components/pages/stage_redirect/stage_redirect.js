import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";

import { useRequestWithProgressToastRollbar } from "utils";
import { getCases } from "utils/requests";

const StageRedirect = () => {
  const { case_number } = useParams();
  const [stage, setStage] = useState(undefined);
  const [id, setId] = useState(undefined);

  const casesRequest = useRequestWithProgressToastRollbar(getCases);
  useEffect(() => {
    casesRequest(case_number).then(({ data = [] }) => {
      const [matchingCase] = data.filter(
        (caseData) => caseData.CaseNr === case_number
      );
      setStage(matchingCase.Stage);
      setId(matchingCase.Id);
    });
  }, [casesRequest, case_number]);

  if (stage === undefined || id === undefined) {
    return null;
  }
  return <Redirect push to={`/${stage}/${id}`} />;
};

export default StageRedirect;
