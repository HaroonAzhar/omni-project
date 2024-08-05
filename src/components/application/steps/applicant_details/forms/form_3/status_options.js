import { stringListAsSelectOptions } from "utils";

const ukResidentialStatuses = [
  "Visitor",
  "Visa Holder",
  "Indefinite Leave to Remain",
  "Citizen",
  "Irish Citizen",
];

const eeaSwissResidentialStatuses = [
  ...ukResidentialStatuses,
  "Settled Status",
  "Pre-Settled Status",
];

export const ukResidentialStatusOptions = stringListAsSelectOptions(
  ukResidentialStatuses
);

export const eeaSwissResidentialStatusOptions = stringListAsSelectOptions(
  eeaSwissResidentialStatuses
);
