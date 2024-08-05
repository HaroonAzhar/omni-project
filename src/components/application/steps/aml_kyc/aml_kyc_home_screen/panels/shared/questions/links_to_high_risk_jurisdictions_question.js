import { linksToHighRiskJurisdictionOptions } from "../options";
import { ReferralSelectField } from "../referral";

export default {
  name: "links_to_high_risk_jurisdiction",
  label: "Any Links to High Risk jurisdictions",
  component: ReferralSelectField,
  options: linksToHighRiskJurisdictionOptions,
  referral: (value) => !["n/a", ""].includes(value),
};
