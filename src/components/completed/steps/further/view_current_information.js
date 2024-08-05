import React from "react";
import PropTypes from "prop-types";

import { Cell } from "components/molecules";
import { percentFormat } from "utils";

import getSecuritiesWithOutdatedValuations from "./get_securities_with_outdated_valuations";
import SecuritiesWithOutdatedValuations from "./securities_with_outdated_valuations";

function ViewCurrentInformation({ latestStatement, securities }) {
  const securitiesWithOutdatedValuations = getSecuritiesWithOutdatedValuations(
    securities
  );
  return (
    <>
      <Cell title="Current LTV">{percentFormat(latestStatement?.ltv)}</Cell>

      <Cell title="Current GDV">{percentFormat(latestStatement?.gdv)}</Cell>
      <SecuritiesWithOutdatedValuations
        securitiesWithOutdatedValuations={securitiesWithOutdatedValuations}
      />
    </>
  );
}

ViewCurrentInformation.propTypes = {
  latestStatement: PropTypes.object,
  securities: PropTypes.array,
};

export default ViewCurrentInformation;
