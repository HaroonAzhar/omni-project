import { createSelector } from "reselect";

import getApplication from "./getApplication";
import { makeName, setStepsInOrder } from "../helpers";
import prepareSteps from "./prepareSteps";
import getAmlKycStepStatus from "./getAmlStepStatus";

export const getStepsFromApplication = (application) => {
  const {
    type_of_applicant: typeOfApplicant,
    steps = [],
    properties = [],
    aml_kyc_validation = {},
    individuals = [],
  } = application || {};

  const preparedSteps = prepareSteps(steps, properties, individuals);

  preparedSteps.map((step) => {
    if (step.name !== "aml_kyc") {
      return step;
    }
    step.status = getAmlKycStepStatus(step, aml_kyc_validation, individuals);
    return step;
  });
  const validSortedSteps = setStepsInOrder(preparedSteps);

  const backendSteps = validSortedSteps.map((step, index) => ({
    step: (index + 1).toString(),
    stepName: step.name,
    part: makeName(step.name, typeOfApplicant),
    ...step,
  }));

  return [
    ...backendSteps,
    {
      step: backendSteps.length.toString(),
      stepName: "view_application",
      part: "Application Summary",
    },
  ];
};

const getApplicationStepsData = createSelector(
  [getApplication],
  getStepsFromApplication
);

export default getApplicationStepsData;
