import { useParams } from "react-router-dom";

import useApplicants from "./use_applicants";

const useInitialValues = () => {
  const { id, indexOfElement: selectedApplicantId } = useParams();
  const [applicants] = useApplicants(id);
  const [applicant] = applicants.filter(
    (_, index) => index === Number(selectedApplicantId)
  );

  return { ...applicant };
};

export default useInitialValues;
