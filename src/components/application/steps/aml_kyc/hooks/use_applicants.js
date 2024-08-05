import { useEffect, useState } from "react";

import { prepareApplicationDataForReduxStore } from "utils";
import { getApplicant } from "utils/requests";

import combineIndividualsAndCompaniesIntoAmlKycApplicants from "./helpers/combine_individuals_and_companies_into_aml_kyc_applicants";
import useSavingRequest from "./use_saving_request";

const useApplicants = (id) => {
  const [applicants, setApplicants] = useState([]);
  const sendRequest = useSavingRequest();

  useEffect(() => {
    getApplicant(id).then((result) => {
      const {
        application: preparedApplicantsRes,
      } = prepareApplicationDataForReduxStore(result.data.attributes);
      const { individuals = [], company = [] } = preparedApplicantsRes;
      const combinedApplicants = combineIndividualsAndCompaniesIntoAmlKycApplicants(
        individuals,
        company
      );

      setApplicants(combinedApplicants);
    });
  }, [id]);

  const modifyApplicant = (applicantIndex) => (new_aml_kyc_values) => {
    const requests = [];
    const modifiedApplicants = applicants.map((applicant) => {
      if (applicant.index !== applicantIndex) {
        return applicant;
      }
      const modifiedApplicant = {
        ...applicant,
        aml_kyc: {
          ...new_aml_kyc_values,
        },
      };
      requests.push(sendRequest(modifiedApplicant));
      return modifiedApplicant;
    });
    setApplicants(modifiedApplicants);
    return Promise.all(requests);
  };
  return [applicants, modifyApplicant];
};

export default useApplicants;
