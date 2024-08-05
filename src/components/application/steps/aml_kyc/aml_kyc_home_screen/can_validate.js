const canValidate = (applicants) => {
  const okStatuses = ["ok", "referral_with_mlro"];
  return applicants.every(({ aml_kyc = {} }) =>
    okStatuses.includes(aml_kyc.status)
  );
};

export default canValidate;
