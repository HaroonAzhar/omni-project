import { useSelector } from "react-redux";

import {
  getDateOfCompletion,
  getOriginalDateOfMaturity,
  getInitialNetLoanAmount,
  getSecurities,
  getContacts,
  getCompanies,
  getIndividuals,
  getInterestRate,
  getAssignedUser,
  getTotalFacility,
  getLoanStatus,
  getAutomaticLoanStatus,
  getLastManualStatus,
  getExtendedDateOfMaturity,
  getCrossCollateralisedLoans,
} from "../../selectors";
import useCashflowsData from "../../cashflows/view_cashflows/use_cashflows_data";
import mergeToApplicants from "../merge_to_applicants";
import mapApplicantsForTable from "../map_applicants_for_table";
import addressFormat from "../address_format";

const useCompletedSummaryData = () => {
  const dateOfCompletion = useSelector(getDateOfCompletion);
  const originalDateOfMaturity = useSelector(getOriginalDateOfMaturity);
  const extendedDateOfMaturity = useSelector(getExtendedDateOfMaturity);

  const initialNetLoanAmount = useSelector(getInitialNetLoanAmount);
  const currentInterestRate = useSelector(getInterestRate);

  const securities = useSelector(getSecurities);
  const contacts = useSelector(getContacts);
  const individuals = useSelector(getIndividuals);
  const companies = useSelector(getCompanies);
  const mergedApplicants = mergeToApplicants({
    companies,
    individuals,
    contacts,
  });
  const loanStatus = useSelector(getLoanStatus);
  const automaticLoanStatus = useSelector(getAutomaticLoanStatus);
  const applicants = mapApplicantsForTable(mergedApplicants);

  const securitiesAddresses = securities
    .map((security) => addressFormat(security))
    .join("\n");

  const { statementResults: interestData } = useCashflowsData();
  const { end_balance } = interestData[interestData.length - 1] ?? {};

  const currentBalance = end_balance;

  const caseManager = useSelector(getAssignedUser);

  const totalFacility = useSelector(getTotalFacility);

  const lastManualStatus = useSelector(getLastManualStatus);

  const currentDateOfMaturity =
    extendedDateOfMaturity ?? originalDateOfMaturity;

  const crossCollateralisedLoans = useSelector(getCrossCollateralisedLoans);

  return {
    dateOfCompletion,
    originalDateOfMaturity,
    extendedDateOfMaturity,
    currentDateOfMaturity,
    initialNetLoanAmount,
    loanStatus,
    automaticLoanStatus,
    currentBalance,
    securitiesAddresses,
    applicants,
    currentInterestRate,
    caseManager,
    totalFacility,
    lastManualStatus,
    crossCollateralisedLoans,
  };
};

export default useCompletedSummaryData;
