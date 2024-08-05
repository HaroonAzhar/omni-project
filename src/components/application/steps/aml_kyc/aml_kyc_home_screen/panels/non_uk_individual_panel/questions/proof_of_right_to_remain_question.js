import { ReferralSelectField } from "../../shared/referral";

export default {
  name: "proof_of_right_to_remain",
  label: "Proof of Right to Remain",
  component: ReferralSelectField,
  options: [],
  referral: (value) => value === "not supplied",
};
