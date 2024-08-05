import React from "react";

import { H2 } from "components/atoms";

import useExpectedDrawdownsData from "./use_expected_drawdowns_data";
import ViewExpectedDrawdowns from "./view_expected_drawdowns";
import AddExpectedDrawdown from "./add_expected_drawdown";
import { ExpectedDrawdownsWrapper } from "./styled_expected_drawdowns";

function ExpectedDrawdowns() {
  const { expectedDrawdowns } = useExpectedDrawdownsData(true);

  return (
    <ExpectedDrawdownsWrapper>
      <H2>Expected Drawdowns</H2>
      <ViewExpectedDrawdowns expectedDrawdowns={expectedDrawdowns} />
      <AddExpectedDrawdown />
    </ExpectedDrawdownsWrapper>
  );
}

export default ExpectedDrawdowns;
