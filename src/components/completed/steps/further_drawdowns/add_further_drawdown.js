import React from "react";
import PropTypes from "prop-types";

import useSaveFurtherDrawdown from "./use_save_further_drawdown";
import AddFurther from "../further/add_further";

function AddFurtherDrawdown({
  totalGDV,
  totalValuations,
  currentStatement,
  closeAdd,
  availableDrawdownFunds,
  initialValues,
  successCallback = () => {},
}) {
  const saveFurtherDrawdown = useSaveFurtherDrawdown();

  return (
    <AddFurther
      availableFunds={availableDrawdownFunds}
      closeAdd={closeAdd}
      currentStatement={currentStatement}
      initialValues={initialValues}
      saveFurther={saveFurtherDrawdown}
      successCallback={successCallback}
      totalGDV={totalGDV}
      totalValuations={totalValuations}
      title="Drawdown"
    />
  );
}

AddFurtherDrawdown.propTypes = {
  totalGDV: PropTypes.number,
  totalValuations: PropTypes.number,
  currentStatement: PropTypes.object,
  closeAdd: PropTypes.func.isRequired,
  availableDrawdownFunds: PropTypes.number,
  initialValues: PropTypes.object,
  successCallback: PropTypes.func,
};
export default AddFurtherDrawdown;
