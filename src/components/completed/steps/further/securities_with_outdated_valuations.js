import React from "react";
import PropTypes from "prop-types";

import { Cell } from "components/molecules";
import { propertyAddressFormat } from "utils";
import { mapPropertyAddress } from "components/completed/utils";

import {
  SecurityWithOutdatedValuation,
  SecurityWithOutdatedValuationNo,
} from "./styled_further";

const SecuritiesWithOutdatedValuations = ({
  securitiesWithOutdatedValuations,
}) => {
  if (securitiesWithOutdatedValuations.length === 0) {
    return null;
  }
  return (
    <Cell title="Securities with outdated Valuations">
      <div>
        {securitiesWithOutdatedValuations.map((security, index) => (
          <SecurityWithOutdatedValuation>
            <SecurityWithOutdatedValuationNo>
              {index + 1}.
            </SecurityWithOutdatedValuationNo>
            <div>
              {propertyAddressFormat({
                address: mapPropertyAddress(security.property),
              })}
            </div>
          </SecurityWithOutdatedValuation>
        ))}
      </div>
    </Cell>
  );
};

SecuritiesWithOutdatedValuations.propTypes = {
  securitiesWithOutdatedValuations: PropTypes.array,
};

export default SecuritiesWithOutdatedValuations;
