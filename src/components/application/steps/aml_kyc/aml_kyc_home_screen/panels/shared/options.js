import { underscore } from "inflected";

export const proofOfIdOptions = [
  { value: undefined, label: "Choose one" },
  { value: "SIGNED_PASSPORT", label: "Current Signed Passport" },
  { value: "EEA_MEMBER_CARD", label: "Current EEA Member State Identify Card" },
  {
    value: "NORTHERN_IRELAND_CARD",
    label: "Current Northern Ireland Voters Card",
  },
  {
    value: "RESIDENCE_PERMIT",
    label: "Current Residence Permit issued by the UK Home Office",
  },
  {
    value: "EEA_DRIVING_LICENSE",
    label: "Current EEA or UK Photo Card Driving Licence",
  },
  {
    value: "BLUE_BADGE",
    label: 'Current Blue Disabled Drivers Pass ("Blue Badge")',
  },
];

export const proofOfAddressOptions = [
  { value: undefined, label: "Choose one" },
  {
    value: "CONFIRMATION_ELECTORAL_REGISTER",
    label: "Confirmation from an Electoral Register Search",
  },
  {
    value: "UTILITY_BILL_STATEMENT",
    label:
      "Original Utility Bill or Utility Statement (dated within three months)**",
  },
  {
    value: "BANK_STATEMENT",
    label: "Original Bank Statement (dated within three months)***",
  },
  {
    value: "LOCAL_AUTHORITY_TAX",
    label: "Local authority tax bill valid for the current year",
  },
  {
    value: "EEA_DRIVING_LICENSE",
    label: "Current EEA or UK Photo Card Driving Licence****",
  },
  {
    value: "EEA_MEMBER_CARD",
    label: "Current EEA Member State Identity Card****",
  },
  {
    value: "NORTHERN_IRELAND_CARD",
    label: "Current Northern Ireland Voters Card****",
  },
  {
    value: "BLUE_BADGE",
    label: 'Current Blue Disabled Drivers Pass ("Blue Badge")****',
  },
];

export const additionalProofOfAddressOptions = [
  { value: "", label: "Choose one" },
  {
    value: "BANK_STATEMENT",
    label: "Bank statement",
  },
  {
    value: "GOVERNMENT_LETTER",
    label: "Government Letter",
  },
  {
    value: "CREDIT_INSTITUTION_LETTER",
    label: "Credit Institution Letter",
  },
];

const convertListToOptions = (elements) => [
  { value: "", label: "Choose one" },
  ...elements.map((label) => ({
    label,
    value: underscore(label),
  })),
];

const linksToHighRiskJurisdictionList = [
  "N/A",
  "Bahamas",
  "Botswana",
  "Cambodia",
  "Democratic People's Republic of Korea (DPRK)",
  "Ethiopia",
  "Ghana",
  "Iran",
  "Pakistan",
  "Panama",
  "Sri Lanka",
  "Syria",
  "Trinidad and Tobago",
  "Tunisia",
  "Yemen",
];

export const linksToHighRiskJurisdictionOptions = convertListToOptions(
  linksToHighRiskJurisdictionList
);

const corporateStructures = [
  "Public Registered Company",
  "Subsidiary of Public Registered Company",
  "Partnership / Unincorporated Business",
  "Private Company",
  "Lawyer",
  "Accountant",
  "Trust",
];

export const corporateStructuresOptions = convertListToOptions(
  corporateStructures
);

const evidenceOfTradingAddress = [
  "Bank Statement dated within 3 Months",
  "Utility Bill / Statement dated within 3 Months",
];

export const evidenceOfTradingAddressOptions = convertListToOptions(
  evidenceOfTradingAddress
);

const verificationDocuments = [
  "Utility Bill / Statement dated within 3 Months",
  "Bank or Mortgage Statement dated within 3 Months",
  "Local Authority Tax Bill for Current Year",
  "VAT Notification",
];

export const verificationDocumentsOptions = convertListToOptions(
  verificationDocuments
);

const partnershipAgreement = ["Yes", "No", "N/A"];

export const partnershipAgreementOptions = convertListToOptions(
  partnershipAgreement
);

const trust = ["Individual", "Corporate"];
export const trustOptions = convertListToOptions(trust);
