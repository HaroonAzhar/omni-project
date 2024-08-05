const getAmlKycStepStatus = (
  amlKycStep = {},
  amlKycValidation = {},
  individuals = []
) => {
  if (amlKycStep.status === "recheck") {
    return "Recheck";
  }
  if (
    amlKycValidation.validation_mlro_name &&
    amlKycValidation.validation_user_name
  ) {
    return "Validated";
  }
  const okStatuses = ["ok", "referral_with_mlro"];
  if (
    individuals.length &&
    individuals.every(
      (individual) =>
        individual.aml_kyc && okStatuses.includes(individual.aml_kyc.status)
    )
  ) {
    return "Ok";
  }
  if (
    individuals.some(
      (individual) =>
        individual.aml_kyc && individual.aml_kyc.status === "referral"
    )
  ) {
    return "Referred";
  }

  return "Incomplete";
};
export default getAmlKycStepStatus;
