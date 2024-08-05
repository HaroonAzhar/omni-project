export const isRelevantField = (fieldName) => {
  const fixedIrrelevantFields = [
    "additional_notes",
    "status",
    "proof_of_id_expiry_date",
  ];

  const irrelevantFieldsSuffixes = [
    "user_comments",
    "mlro_comments",
    "mlro_username",
    "mlro_date",
  ];
  const irrelevantFieldsSuffixesRegex = new RegExp(
    irrelevantFieldsSuffixes.join("|")
  );

  const isFixedIrrelevantField = (name) => fixedIrrelevantFields.includes(name);
  const isSuffixedWithIrrelevantField = (name) =>
    irrelevantFieldsSuffixesRegex.test(name);
  if (isFixedIrrelevantField(fieldName)) return false;
  if (isSuffixedWithIrrelevantField(fieldName)) return false;
  return true;
};

const getValidFields = (fieldValues) =>
  fieldValues.filter((field) => field.value);

const getReferredFields = (fields) =>
  fields.filter((field) => field.value.referral);

const getReferredFieldsOfState = (referredFields, values = {}, state) => {
  const referredFieldNames = referredFields.map((field) => field.name);

  const hasState = (fieldName) =>
    values[`${fieldName}_mlro_state`]?.innerValue === state;

  return referredFieldNames.filter((fieldName) => hasState(fieldName));
};
const getNoReferredFieldsWithoutMlro = (referredFields, values) =>
  referredFields.length -
  getReferredFieldsOfState(referredFields, values, "signed").length;

const getNoReferredFieldsRejected = (referredFields, values) =>
  getReferredFieldsOfState(referredFields, values, "rejected").length;

export const getNumbersOfFields = (fields, values) => {
  const relevantFields = fields.filter((field) => isRelevantField(field.name));
  const validFields = getValidFields(relevantFields);

  const referredFields = getReferredFields(validFields);
  const noIncompleteFields = relevantFields.length - validFields.length;

  const noReferralFieldsWithoutMlro = getNoReferredFieldsWithoutMlro(
    referredFields,
    values
  );

  const noReferralFieldsRejected = getNoReferredFieldsRejected(
    referredFields,
    values
  );
  return {
    noIncompleteFields,
    noReferralFields: referredFields.length,
    noReferralFieldsWithoutMlro,
    noReferralFieldsRejected,
  };
};

export const getFields = (form) => {
  const allFieldNames = form.getRegisteredFields();
  const fields = allFieldNames.map((fieldName) =>
    form.getFieldState(fieldName)
  );
  return fields;
};

const getResultState = (form) => {
  const fields = getFields(form);

  return getNumbersOfFields(fields, form.getState().values);
};

export const getStatus = (form) => {
  const {
    noIncompleteFields,
    noReferralFields,
    noReferralFieldsWithoutMlro,
  } = getResultState(form);
  if (noReferralFieldsWithoutMlro > 0) return "referral";
  if (noReferralFields > 0) return "referral_with_mlro";
  if (noIncompleteFields > 0) return "incomplete";
  return "ok";
};

export default getResultState;
