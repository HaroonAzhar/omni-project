import React from "react";
import PropTypes from "prop-types";

import useSaveFurtherAdvance from "./use_save_further_advance";
import AddFurther from "../further/add_further";

function AddFurtherAdvance({
  totalGDV,
  totalValuations,
  currentStatement,
  closeAdd,
  initialValues,
  successCallback = () => {},
}) {
  const saveFurtherAdvance = useSaveFurtherAdvance();

  return (
    <AddFurther
      availableFunds={Number.MAX_VALUE}
      closeAdd={closeAdd}
      currentStatement={currentStatement}
      initialValues={initialValues}
      saveFurther={saveFurtherAdvance}
      successCallback={successCallback}
      totalGDV={totalGDV}
      totalValuations={totalValuations}
      title="Advance"
    />
  );
}

AddFurtherAdvance.propTypes = {
  totalGDV: PropTypes.number,
  totalValuations: PropTypes.number,
  currentStatement: PropTypes.object,
  closeAdd: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  successCallback: PropTypes.func,
};
export default AddFurtherAdvance;
