import LOCALE from "core/locale";

const prepareSteps = (steps, properties, individuals) => {
  const status = "Edited";
  const editedProperties = properties.filter(
    (property) => property.status === status
  ).length;

  const editedValuationReports = properties.filter(
    (property) =>
      property.valuation_report && property.valuation_report.status === status
  ).length;
  const editedIndividuals = individuals.filter(
    (individual) => individual.status === status
  ).length;

  const editedIndividualsCreditHistory = individuals.filter(
    (individual) => (individual.credit_history || {}).status === status
  ).length;

  const editedIndividualsAssets = individuals.filter(
    (individual) =>
      (individual.assets_liabilities_additional || {}).status === status
  ).length;

  const complexStatuses = {
    applicant_details: {
      edited: editedIndividuals,
      base: individuals.length,
    },
    security_details: {
      edited: editedProperties,
      base: properties.length,
    },
    credit_history: {
      edited: editedIndividualsCreditHistory,
      base: individuals.length,
    },
    assets_and_liabilities: {
      edited: editedIndividualsAssets,
      base: individuals.length,
    },
    valuation_report: {
      edited: editedValuationReports,
      base: properties.length,
    },
  };

  return steps.map((step) => {
    step.date_edited = new Date(step.edited).toLocaleDateString(LOCALE);

    const complexStepStatus = complexStatuses[step.name];

    if (complexStepStatus && complexStepStatus.edited > 0) {
      step.status = `${complexStepStatus.edited} of ${complexStepStatus.base} ${status}`;
    }

    return step;
  });
};

export default prepareSteps;
