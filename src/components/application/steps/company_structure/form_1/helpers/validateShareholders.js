const MAIN = "main";

const validateShareholders = (values, data) => {
  const allKeys = Object.keys(data);

  const errors = {
    shared_holders: {},
  };

  allKeys
    .filter((key) => key !== MAIN)
    .forEach((key) => {
      // eslint-disable-next-line no-multi-assign
      const fieldErrors = (errors.shared_holders[key] = {});

      const isNamePresent =
        values.shared_holders &&
        values.shared_holders[key] &&
        values.shared_holders[key].name &&
        values.shared_holders[key].name.length > 0;

      if (!isNamePresent) {
        fieldErrors.name = "Required";
      }

      const isHeldPresent =
        values.shared_holders &&
        values.shared_holders[key] &&
        values.shared_holders[key].held;

      if (!isHeldPresent) {
        fieldErrors.held = "Invalid value";
      } else {
        const isHeldWithinValidRange =
          parseFloat(values.shared_holders[key].held) > 100;

        if (isHeldWithinValidRange) {
          fieldErrors.held = "Invalid value";
        }
      }

      const isCompanyStructureAdded =
        values.shared_holders &&
        values.shared_holders[key] &&
        values.shared_holders[key].isCompany === "true";

      if (isCompanyStructureAdded) {
        if (data[key].length < 1) {
          fieldErrors.isCompany =
            "Structure has to have at least 1 participant";
        }
      }
    });

  return errors;
};

export default validateShareholders;
