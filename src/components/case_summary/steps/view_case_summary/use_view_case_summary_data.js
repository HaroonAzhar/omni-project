import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  getDescriptionOfPropertyFromSecurity,
  getValuerNameFromSecurity,
  getAnalysisOfPropertyFromSecurity,
  getUnderwriterIdOfOverview,
  getExecutiveSummaryOfOverview,
  getStartCaseSummaryDateOfOverview,
  getRiskInputsOfRiskAndMitigation,
  getUnderwriterRationaleOfRiskAndMitigation,
  getExitStrategyOfFurtherComments,
  getOngoingMonitoringOfFurtherComments,
  getSpecialConditionsOfFurtherComments,
  getBorrowerProfileOfBorrower,
  getClientMeetingDateOfBorrower,
  getClientMeetingAttendeesOfBorrower,
  getClientMeetingNotesOfBorrower,
  getPropertiesOfApplication,
  getExpectedCompletionDateOfOverview,
} from "components/case_summary/selectors";
import { getAdminRecords } from "utils/requests";
import { useCaseTags } from "components/molecules/case_tags/case_tags";

import useCrossCollateralisedLoansData from "../borrower_profile/cross_collaterised_loans/use_cross_collateralised_loans_data";

const useViewCaseSummaryData = () => {
  const underwriterId = useSelector(getUnderwriterIdOfOverview);
  const executiveSummary = useSelector(getExecutiveSummaryOfOverview);
  const startCaseSummaryDate = useSelector(getStartCaseSummaryDateOfOverview);

  const descriptionOfProperty = useSelector(
    getDescriptionOfPropertyFromSecurity
  );
  const valuer = useSelector(getValuerNameFromSecurity);
  const analysisOfProperty = useSelector(getAnalysisOfPropertyFromSecurity);

  const riskInputs = useSelector(getRiskInputsOfRiskAndMitigation);
  const underwriterRationale = useSelector(
    getUnderwriterRationaleOfRiskAndMitigation
  );

  const exitStrategy = useSelector(getExitStrategyOfFurtherComments);
  const ongoingMonitoring = useSelector(getOngoingMonitoringOfFurtherComments);
  const specialConditions = useSelector(getSpecialConditionsOfFurtherComments);

  const borrowerProfile = useSelector(getBorrowerProfileOfBorrower);
  const clientMeetingDate = useSelector(getClientMeetingDateOfBorrower);
  const clientMeetingAttendees = useSelector(
    getClientMeetingAttendeesOfBorrower
  );
  const clientMeetingNotes = useSelector(getClientMeetingNotesOfBorrower);

  const properties = useSelector(getPropertiesOfApplication);

  const [underwriterName, setUnderwriterName] = useState("");
  useEffect(() => {
    getAdminRecords("underwriters", underwriterId).then((res) => {
      setUnderwriterName(
        res?.data?.find(
          (underwriter) => underwriter.Id === Number(underwriterId)
        )?.Name ?? ""
      );
    });
  }, [underwriterId]);

  const propertiesData = properties.map((property) => ({
    title_numbers: property.title_numbers,
    address: property.address,
    surveyorFirm: property.valuation_report?.surveyor,
    surveyorIndividual:
      property.valuation_report?.name_of_the_individual_surveyor,
    inspection_date: property.valuation_report?.inspection_date,
    omv: property.valuation_report?.market_value,
    omv_90_day: property.valuation_report?.day_value,
  }));
  const titleNumbers = properties.flatMap((property) => property.title_numbers);

  const { crossCollateralisedLoans } = useCrossCollateralisedLoansData(true);

  const { associatedTags, sendDeletingRequest } = useCaseTags();

  const expectedCompletionDate = useSelector(
    getExpectedCompletionDateOfOverview
  );
  return {
    titleNumbers,
    propertiesData,
    underwriterName,
    startCaseSummaryDate,
    executiveSummary,
    descriptionOfProperty,
    valuer,
    analysisOfProperty,
    riskInputs,
    underwriterRationale,
    exitStrategy,
    ongoingMonitoring,
    specialConditions,
    borrowerProfile,
    clientMeetingDate,
    clientMeetingAttendees,
    clientMeetingNotes,
    crossCollateralisedLoans,
    associatedTags,
    sendDeletingRequest,
    expectedCompletionDate,
  };
};

export default useViewCaseSummaryData;
