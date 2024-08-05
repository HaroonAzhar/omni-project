import { setIn } from "final-form";

export default async (schema, values, context) => {
  let errors;

  try {
    await schema.validate(values, { abortEarly: false, context });
  } catch (e) {
    errors = e.inner.reduce(
      (formError, innerError) =>
        setIn(formError, innerError.path, innerError.message),
      {}
    );
  }

  return errors;
};
