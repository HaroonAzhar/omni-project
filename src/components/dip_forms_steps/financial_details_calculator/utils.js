const inputNamesOfValueTypeOf = {
  arrangement_fee: "ValueTypeOfArrangementFee",
  intermediary_commission_fee: "ValueTypeOfIntermediaryFee",
};
export const getProperKeyNameOf = (key, values) => {
  const valueType = values[inputNamesOfValueTypeOf[key]];
  return valueType === "value" ? `${key}_value` : `${key}_percent`;
};

export const getSumOfSecurityEstimations = (securities) =>
  securities
    ? securities.reduce(
        (acc, item) => acc + Number(item.SecurityInitialEstimation),
        0
      )
    : 0;
export const getSumOfSecuritiesGDV = (securities) =>
  securities ? securities.reduce((acc, item) => acc + Number(item.Gdv), 0) : 0;

export const getSumOfSecurities90DayGDV = (securities) =>
  securities
    ? securities.reduce((acc, item) => acc + Number(item.Estimated90DayGdv), 0)
    : 0;

export const getSumOfMortgage = (securities) =>
  securities
    ? securities.reduce(
        (acc, item) =>
          acc +
          (item.OpflType === "second_charge"
            ? Number(item.ValueExistingMortgage)
            : 0),
        0
      )
    : 0;
