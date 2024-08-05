import { useSelector } from "react-redux";

import { getPropertiesOfApplication } from "components/completed/selectors";
import { mapPropertyAddress } from "components/completed/utils";

import { getCrossCollateralisedLoans } from "../selectors";

const useViewCaseSummaryCompletedData = () => {
  const properties = useSelector(getPropertiesOfApplication);

  const caseSummary = useSelector((state) => state.caseSummary);

  const propertiesData = properties.map((property) => ({
    title_numbers: property.titleNumbers,
    address: mapPropertyAddress(property),
    surveyorFirm: property.valuationReport?.Surveyor,
    surveyorIndividual: property.valuationReport?.NameOfTheIndividualSurveyor,
    inspection_date: property.valuationReport?.InspectionDate,
    omv: property.valuationReport?.MarketValue,
    omv_90_day: property.valuationReport?.DayValue,
  }));
  const titleNumbers = properties.flatMap((property) => property.titleNumbers);

  const crossCollateralisedLoans = useSelector(getCrossCollateralisedLoans);

  return {
    titleNumbers,
    propertiesData,
    underwriterName: caseSummary?.underwriter?.Name,
    startCaseSummaryDate: caseSummary?.StartCaseSummaryDate,
    executiveSummary: caseSummary?.OverviewExecutiveSummary,
    descriptionOfProperty: caseSummary?.SecurityDescriptionOfProperty,
    valuer: caseSummary?.ValuerName,
    analysisOfProperty: caseSummary?.AnalysisOfProperty,
    riskInputs: caseSummary?.riskAndMitigation,
    underwriterRationale: caseSummary?.OverviewUnderwriterRationale,
    exitStrategy: caseSummary?.FurtherExitStrategy,
    ongoingMonitoring: caseSummary?.FurtherOngoingMonitoring,
    specialConditions: caseSummary?.SpecialConditions,
    borrowerProfile: caseSummary?.BorrowerProfile,
    clientMeetingDate: caseSummary?.ClientMeetingDate,
    clientMeetingAttendees: caseSummary?.ClientMeetingAttendees,
    clientMeetingNotes: caseSummary?.ClientMeetingNotes,
    crossCollateralisedLoans,
    expectedCompletionDate: caseSummary?.ExpectedCompletionDate,
  };
};

export default useViewCaseSummaryCompletedData;
