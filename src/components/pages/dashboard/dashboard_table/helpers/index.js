import { humanize } from "inflected";

import { capitalize } from "utils";

export const prepareSearchingString = (item) => {
  const securitiesAddresses = item.securities
    .map(
      ({
        SecurityAddress,
        SecurityAddressLine1,
        SecurityAddressLine2,
        SecurityPostcode,
      }) =>
        `${SecurityAddress}${SecurityAddressLine1}${SecurityAddressLine2}${SecurityPostcode}`
    )
    .join("");
  return `${securitiesAddresses} ${item.Applicants}`;
};

export const getDefaultStatusOf = (caseStage) => {
  const defaultStatuses = {
    application: "In progress",
  };
  return defaultStatuses[caseStage];
};

export const getStatusRepr = (caseStatus) => humanize(caseStatus);

export const mapStages = (caseStage) => {
  const stages = {
    dip: "DIP",
    application: "Application",
    case_summary: "Case Summary",
    default: capitalize(caseStage || ""),
  };

  return stages[caseStage] || stages.default;
};
