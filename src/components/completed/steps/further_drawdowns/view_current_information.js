import React from "react";
import PropTypes from "prop-types";

import { Cell } from "components/molecules";
import { currencyFormat } from "utils";

import ViewCurrentInformation from "../further/view_current_information";

function ViewCurrentInformationFurtherDrawdowns({
  availableDrawdownFunds,
  latestStatement,
  securities,
}) {
  return (
    <>
      <Cell title="Available Amount">
        {currencyFormat(availableDrawdownFunds)}
      </Cell>

      <ViewCurrentInformation
        latestStatement={latestStatement}
        securities={securities}
      />
    </>
  );
}

ViewCurrentInformationFurtherDrawdowns.propTypes = {
  availableDrawdownFunds: PropTypes.number,
  latestStatement: PropTypes.object,
  securities: PropTypes.array,
};

export default ViewCurrentInformationFurtherDrawdowns;
