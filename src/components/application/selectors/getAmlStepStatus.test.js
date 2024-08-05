import getAmlStepStatus from "./getAmlStepStatus";

describe("getAmlStepStatus for Application home screen", () => {
  it("Should return validated if aml was validated", () => {
    const individuals = [
      { aml_kyc: { status: "ok" } },
      { aml_kyc: { status: "referral" } },
      { aml_kyc: { status: "incomplete" } },
      { aml_kyc: { status: "referral_with_mlro" } },
    ];
    const amlKycValidation = {
      validation_mlro_name: "Omni user",
      validation_user_name: "Omni user",
    };
    const amlKycStep = { status: "New" };

    const status = getAmlStepStatus(amlKycStep, amlKycValidation, individuals);

    expect(status).toBe("Validated");
  });

  it("Should return referred if at least one referral", () => {
    const individuals = [
      { aml_kyc: { status: "ok" } },
      { aml_kyc: { status: "referral" } },
      { aml_kyc: { status: "incomplete" } },
    ];
    const amlKycValidation = {
      validation_user_name: "Omni user",
    };
    const amlKycStep = { status: "New" };

    const status = getAmlStepStatus(amlKycStep, amlKycValidation, individuals);

    expect(status).toBe("Referred");
  });
  it("Should return incomplete if at least one incomplete", () => {
    const individuals = [
      { aml_kyc: { status: "ok" } },
      { aml_kyc: { status: "ok" } },
      { aml_kyc: { status: "incomplete" } },
      { aml_kyc: { status: "ok" } },
    ];
    const amlKycValidation = {
      validation_mlro_name: "Omni user",
    };
    const amlKycStep = { status: "New" };

    const status = getAmlStepStatus(amlKycStep, amlKycValidation, individuals);

    expect(status).toBe("Incomplete");
  });

  it("Should return ok if all are ok or referral with mlro", () => {
    const individuals = [
      { aml_kyc: { status: "ok" } },
      { aml_kyc: { status: "ok" } },
      { aml_kyc: { status: "referral_with_mlro" } },
    ];
    const amlKycValidation = {
      validation_mlro_name: "Omni user",
    };
    const amlKycStep = { status: "New" };

    const status = getAmlStepStatus(amlKycStep, amlKycValidation, individuals);

    expect(status).toBe("Ok");
  });

  it("Should show recheck if step status is recheck", () => {
    const individuals = [
      { aml_kyc: { status: "ok" } },
      { aml_kyc: { status: "referral" } },
      { aml_kyc: { status: "incomplete" } },
      { aml_kyc: { status: "referral_with_mlro" } },
    ];
    const amlKycValidation = {
      validation_mlro_name: "Omni user",
      validation_user_name: "Omni user",
    };
    const amlKycStep = { status: "recheck" };

    const status = getAmlStepStatus(amlKycStep, amlKycValidation, individuals);

    expect(status).toBe("Recheck");
  });
});
