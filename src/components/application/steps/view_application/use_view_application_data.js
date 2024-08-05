import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getAdminRecord } from "utils/requests";
import {
  getIntroducerDetailsOfApplication,
  getIndividualsOfApplication,
  getPurposeOfBorrowingsOfApplication,
  getSourceOfDepositOfApplication,
  getFurtherDetailsOfApplication,
  getRepaymentMethodOfApplication,
  getRepaymentMethodDetailsOfApplication,
  getProposedCompletionDateOfApplication,
  getPropertiesOfApplication,
  getSolicitorDetailsOfApplication,
  getAdditionalInformationOfApplication,
  getCompaniesOfApplication,
  getInitialNetDetailsOfApplication,
  getLoanTermOfApplication,
  getLoanTypeOfApplication,
} from "components/application/selectors";
import { getExpectedCompletionDateOfOverview } from "components/case_summary/selectors";

import { useFetchAndStoreApplicants } from "../../helpers/hooks";
import { getApplicationStepsData } from "../../selectors";
import useApplicants from "../aml_kyc/hooks/use_applicants";
import { assetsDataMapReadOnly } from "../assets_details/assets_home_screen/applicant_assets_table/select_applicant_table_data";

const useViewApplicationData = () => {
  const initialRequest = useFetchAndStoreApplicants({ showInfoBox: () => {} });
  useEffect(initialRequest, []);

  const introducer_details = useSelector(getIntroducerDetailsOfApplication);
  const purpose_of_borrowing = useSelector(getPurposeOfBorrowingsOfApplication);
  const source_of_deposit = useSelector(getSourceOfDepositOfApplication);
  const repayment_method = useSelector(getRepaymentMethodOfApplication);
  const repayment_method_details = useSelector(
    getRepaymentMethodDetailsOfApplication
  );
  const proposed_completion_date = useSelector(
    getProposedCompletionDateOfApplication
  );
  const further_details = useSelector(getFurtherDetailsOfApplication);

  const individuals = useSelector(getIndividualsOfApplication).map(
    (individual) => ({
      ...individual,
      ...assetsDataMapReadOnly(individual),
      applicant_id: individual.applicant_id,
    })
  );

  const companies = useSelector(getCompaniesOfApplication);

  const properties = useSelector(getPropertiesOfApplication);
  const solicitor_details = useSelector(getSolicitorDetailsOfApplication);
  const additional_information = useSelector(
    getAdditionalInformationOfApplication
  );

  const initial_net_loan = useSelector(getInitialNetDetailsOfApplication);
  const loan_term = useSelector(getLoanTermOfApplication);
  const loan_type = useSelector(getLoanTypeOfApplication);

  const { id } = useParams();

  const [applicants] = useApplicants(id);

  const [omniSolicitorAddress, setOmniSolicitorAddress] = useState();
  useEffect(() => {
    getAdminRecord("solicitors", solicitor_details?.omni_solicitor_id).then(
      (res) => {
        setOmniSolicitorAddress(res?.data);
      }
    );
  }, [solicitor_details]);

  const steps = useSelector(getApplicationStepsData);

  const stepsStatus = steps.reduce((acc, step) => {
    acc[step.stepName] = step.status;
    return acc;
  }, {});

  const expectedCompletionDate = useSelector(
    getExpectedCompletionDateOfOverview
  );

  return {
    applicants,
    introducer_details,
    solicitor_details,
    individuals,
    properties,
    purpose_of_borrowing,
    source_of_deposit,
    proposed_completion_date,
    further_details,
    repayment_method,
    repayment_method_details,
    additional_information,
    stepsStatus,
    companies,
    omniSolicitorAddress,
    initial_net_loan,
    loan_term,
    loan_type,
    expectedCompletionDate,
  };
};

export default useViewApplicationData;
