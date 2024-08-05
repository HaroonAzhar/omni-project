export default async (schema, values) => {
  try {
    await schema.validate(values, { abortEarly: false });
  } catch (e) {
    const errorArray = [];

    e.inner.forEach((item) => {
      const [indexWithBrackets, fieldName] = item.path.split(".");

      const indexOfObject = +indexWithBrackets
        .replace("[", "")
        .replace("]", "");

      const err = {
        [fieldName]: item.message,
      };

      if (errorArray[indexOfObject]) {
        errorArray[indexOfObject] = {
          ...errorArray[indexOfObject],
          ...err,
        };
      } else {
        errorArray.push(err);
      }
    });

    return errorArray;
  }
};
