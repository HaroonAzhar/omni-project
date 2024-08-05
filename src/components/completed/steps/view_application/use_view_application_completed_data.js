import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getPropertiesOfApplication } from "components/completed/selectors";
import {
  mapPropertyAddress,
  underscoreObject,
} from "components/completed/utils";
import { assetsDataMapReadOnly } from "components/application/steps/assets_details/assets_home_screen/applicant_assets_table/select_applicant_table_data";
import combineIndividualsAndCompaniesIntoAmlKycApplicants from "components/application/steps/aml_kyc/hooks/helpers/combine_individuals_and_companies_into_aml_kyc_applicants";
import { getAdminRecord } from "utils/requests";
import { getStepsFromApplication } from "components/application/selectors/getApplicationStepsData";

import {
  getFurtherDetailsOfLoanDetails,
  getIndividualsOfApplication,
  getInitialNetDetailsOfLoanDetails,
  getProposedCompletionDateOfLoanDetails,
  getPurposeOfBorrowingsOfLoanDetails,
  getRepaymentMethodDetailsOfLoanDetails,
  getRepaymentMethodOfLoanDetails,
  getSourceOfDepositOfLoanDetails,
  getCompaniesOfApplication,
  getSolicitorDetailsOfApplication,
  getIntroducerDetailsOfApplication,
  getAdditionalInformationOfCase,
  getStepsOfApplication,
  getTypeOfApplicantOfLoanDetails,
  getAmlKycValidationOfApplication,
} from "./selectors";

const useOmniSolicitor = (omniSolicitorId) => {
  const [omniSolicitor, setOmniSolicitor] = useState();
  useEffect(() => {
    if (omniSolicitorId === undefined) {
      return;
    }
    getAdminRecord("solicitors", omniSolicitorId).then((res) => {
      setOmniSolicitor(res?.data);
    });
  }, [omniSolicitorId]);

  return omniSolicitor;
};
const mapAddress = (address) => ({
  ...address,
  address_line_1: address?.SecurityAddressLine1,
  address_line_2: address?.SecurityAddressLine2,
  city: address?.SecurityTownCity,
  postcode: address?.SecurityPostcode,
});

const usePropertiesData = () => {
  const properties = useSelector(getPropertiesOfApplication);

  const propertiesData = properties.map((property) => ({
    ...underscoreObject(property),
    details: underscoreObject(property),
    charge: underscoreObject(property),
    address: mapPropertyAddress(property),
  }));
  return propertiesData;
};

const useIndividuals = () => {
  const rawIndividuals = useSelector(getIndividualsOfApplication);
  const individuals = rawIndividuals
    .map(underscoreObject)
    .map((individual) => ({
      ...individual,
      personal_data: individual,
      declarations_signatures: individual,
      contact: individual,
      addresses: individual.addresses?.map?.(mapAddress),
    }))
    .map((individual) => ({
      ...individual,
      ...assetsDataMapReadOnly(individual),
    }));

  return individuals;
};

const useCompanies = () => {
  const rawCompanies = useSelector(getCompaniesOfApplication);

  const companies = rawCompanies.map(underscoreObject).map((company) => ({
    ...company,
    base_data: company,
    address: {
      ...company,
      registered: mapAddress(company.registeredAddress),
      correspondence: mapAddress(company.correspondenceAddress),
    },
    accountant: {
      ...company.accountant,
      address: mapAddress(company.accountant?.address),
    },
  }));
  return companies;
};

const useLoanDetails = () => {
  const initial_net_loan = useSelector(getInitialNetDetailsOfLoanDetails);
  const purpose_of_borrowing = useSelector(getPurposeOfBorrowingsOfLoanDetails);
  const source_of_deposit = useSelector(getSourceOfDepositOfLoanDetails);
  const further_details = useSelector(getFurtherDetailsOfLoanDetails);
  const proposed_completion_date = useSelector(
    getProposedCompletionDateOfLoanDetails
  );
  const repayment_method = useSelector(getRepaymentMethodOfLoanDetails);
  const repayment_method_details = useSelector(
    getRepaymentMethodDetailsOfLoanDetails
  );
  const type_of_applicant = useSelector(getTypeOfApplicantOfLoanDetails);

  return {
    further_details,
    source_of_deposit,
    proposed_completion_date,
    purpose_of_borrowing,
    repayment_method,
    repayment_method_details,
    initial_net_loan,
    type_of_applicant,
  };
};

const useSolicitor = () => {
  const solicitorDetails = useSelector(getSolicitorDetailsOfApplication);
  const solicitor_details = {
    ...underscoreObject(solicitorDetails),
    omni_solicitor_id: solicitorDetails.FkSolicitorId,
    address_line_1: solicitorDetails.AddressLine1,
    address_line_2: solicitorDetails.AddressLine2,
  };

  const omniSolicitor = useOmniSolicitor(solicitor_details?.FkSolicitorId);

  return {
    omniSolicitor,
    solicitor_details,
  };
};

const useIntroducerDetails = () => {
  const introducerDetails = useSelector(getIntroducerDetailsOfApplication);
  const introducer_details = {
    ...underscoreObject(introducerDetails),
    address_line_1: introducerDetails.AddressLine1,
    address_line_2: introducerDetails.AddressLine2,
  };

  return introducer_details;
};

const useApplicationSteps = ({
  type_of_applicant,
  properties,
  individuals,
}) => {
  const aml_kyc_validation = underscoreObject(
    useSelector(getAmlKycValidationOfApplication)
  );

  const steps = useSelector(getStepsOfApplication).map((step) => ({
    ...underscoreObject(step),
    name: step.ApplicationStepName,
  }));
  const stepsData = getStepsFromApplication({
    properties,
    individuals,
    steps,
    type_of_applicant,
    aml_kyc_validation,
  });

  const stepsStatus = stepsData.reduce((acc, step) => {
    acc[step.stepName] = step.status ?? step.ApplicationStepStatusType;
    return acc;
  }, {});
  return stepsStatus;
};

const useViewApplicationCompletedData = () => {
  const propertiesData = usePropertiesData();
  const individuals = useIndividuals();
  const companies = useCompanies();

  const {
    further_details,
    source_of_deposit,
    proposed_completion_date,
    purpose_of_borrowing,
    repayment_method,
    repayment_method_details,
    initial_net_loan,
    type_of_applicant,
  } = useLoanDetails();

  const applicants = combineIndividualsAndCompaniesIntoAmlKycApplicants(
    individuals,
    companies
  );

  const { solicitor_details, omniSolicitor } = useSolicitor();

  const introducer_details = useIntroducerDetails();

  const additional_information = useSelector(getAdditionalInformationOfCase);

  const stepsStatus = useApplicationSteps({
    type_of_applicant,
    properties: propertiesData,
    individuals,
  });

  const caseSummary = useSelector((state) => state.caseSummary);

  const expectedCompletionDate = caseSummary?.ExpectedCompletionDate;

  return {
    application: {},
    companyDetails: companies[0] ?? {},
    introducer_details,
    solicitor_details,
    omniSolicitorAddress: omniSolicitor,
    applicants,
    individuals,
    properties: propertiesData,
    loan_details: {},
    further_details,
    source_of_deposit,
    proposed_completion_date,
    purpose_of_borrowing,
    repayment_method,
    repayment_method_details,
    additional_information: { additional_information },
    stepsStatus,
    companies: companies[0] ?? {},
    initial_net_loan,
    expectedCompletionDate,
  };
};

export default useViewApplicationCompletedData;
