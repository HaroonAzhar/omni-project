import React from "react";

import useCrossCollateralisedLoansData from "./use_cross_collateralised_loans_data";
import ViewCrossCollateralisedLoans from "./view_cross_collateralised_loans";
import AddCrossCollateralisedLoan from "./add_cross_collateralised_loan";

function CrossCollateralisedLoans() {
  const { crossCollateralisedLoans } = useCrossCollateralisedLoansData(true);

  return (
    <>
      <ViewCrossCollateralisedLoans
        crossCollateralisedLoans={crossCollateralisedLoans}
      />
      <AddCrossCollateralisedLoan />
    </>
  );
}

export default CrossCollateralisedLoans;
