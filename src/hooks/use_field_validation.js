import * as yup from "yup";

export default (validationSchema) => {
  return (fieldName, value) => {
    try {
      yup.reach(validationSchema, fieldName).validateSync(value);
    } catch (validation_error) {
      return validation_error.errors[0];
    }
  };
};
