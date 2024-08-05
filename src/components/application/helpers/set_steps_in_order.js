import { APPLICATION_STEP_NAMES_ORDER } from "utils";

export default (steps) => {
  const result = [];

  APPLICATION_STEP_NAMES_ORDER.forEach((stepName) => {
    const matchedStep = steps.find((step) => step.name === stepName);

    if (matchedStep) {
      result.push(matchedStep);
    }
  });

  return result;
};
