import React from "react";
import PropTypes from "prop-types";

import DrawdownSplitTable from "./drawdown_split_table";

const Drawdowns = ({ formValues, getDrawdownsFromFormValues }) => {
  const {
    shouldShowDrawdowns,
    drawdowns,
    totalOfFurtherAdvances,
  } = getDrawdownsFromFormValues(formValues);

  return (
    <>
      {shouldShowDrawdowns && (
        <DrawdownSplitTable
          formValues={{ ...formValues, drawdowns }}
          totalOfFurtherAdvances={totalOfFurtherAdvances}
          clearFurtherAdvances={() => {
            formValues.further_advances = [];
          }}
        />
      )}
    </>
  );
};

export default Drawdowns;

Drawdowns.propTypes = {
  formValues: PropTypes.object.isRequired,
  getDrawdownsFromFormValues: PropTypes.func.isRequired,
};
