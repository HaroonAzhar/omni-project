const checkIfPdfCanNotBeGenerated = (pdfData) => {
  const { steps = [] } = pdfData;
  const requiredStepsNames = [
    "security_details",
    "applicant_details",
    "solicitor_details",
  ];
  const requiredSteps = steps.filter((step) =>
    requiredStepsNames.includes(step.name)
  );
  const missingSteps =
    steps.length === 0
      ? requiredStepsNames
      : requiredSteps
          .filter((step) => step.status === "New")
          .map((step) => step.name);

  const pdfCanNotBeGenerated = missingSteps.length > 0;
  return { missingSteps, pdfCanNotBeGenerated };
};

export default checkIfPdfCanNotBeGenerated;
