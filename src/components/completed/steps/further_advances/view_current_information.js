import React from "react";
import PropTypes from "prop-types";

import { Cell } from "components/molecules";
import { currencyFormat } from "utils";

import ViewCurrentInformation from "../further/view_current_information";

function ViewCurrentInformationFurtherAdvance({
  originalLoanFacility,
  latestStatement,
  securities,
}) {
  return (
    <>
      <Cell title="Original Loan Facility">
        {currencyFormat(originalLoanFacility)}
      </Cell>

      <ViewCurrentInformation
        latestStatement={latestStatement}
        securities={securities}
      />
    </>
  );
}

ViewCurrentInformationFurtherAdvance.propTypes = {
  originalLoanFacility: PropTypes.number,
  latestStatement: PropTypes.object,
  securities: PropTypes.array,
};

export default ViewCurrentInformationFurtherAdvance;
