import { humanize } from "inflected";

export const makeName = (part, typeOfApplicant) => {
  if (typeOfApplicant === "company" && part === "applicant_details") {
    return "Director/Shareholder Details";
  }

  if (part === "aml_kyc") {
    return "AML/KYC";
  }
  return humanize(part);
};

export { default as fillIndividualsWithOtherData } from "./fill_individuals_with_other_data";
export { default as setStepsInOrder } from "./set_steps_in_order";
