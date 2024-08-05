import { useParams } from "react-router-dom";

import { useRequestWithProgressToastRollbar } from "utils";
import { saveAmlKyc } from "utils/requests/api";

const useSavingRequest = () => {
  const { id } = useParams();

  const sendSavingRequest = useRequestWithProgressToastRollbar(saveAmlKyc);

  const sendRequest = (applicant) => {
    return sendSavingRequest(id, {
      applicant_id: applicant.applicant_id,
      isCompany: applicant.isCompany,
      ...applicant.aml_kyc,
    });
  };
  return sendRequest;
};

export default useSavingRequest;
