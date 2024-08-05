import React, { useState } from "react";
import PropTypes from "prop-types";

import { Button } from "components/atoms";
import { Cell } from "components/molecules";
import { dateFormat, currencyFormat } from "utils";

import {
  StyledHiddenContent,
  ViewSecuritySectionWrapper,
} from "../../styled_securities";

function ReleaseDetails({ releaseDetails, defaultExpanded = false }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <ViewSecuritySectionWrapper>
      <Button
        onClick={() => {
          setIsExpanded((prevExpanded) => !prevExpanded);
        }}
      >
        {isExpanded ? `Hide Release Details` : `Show Release Details`}
      </Button>
      <StyledHiddenContent expanded={isExpanded} align="end">
        <Cell title="Sale Price">
          {currencyFormat(releaseDetails.SalePrice)}
        </Cell>

        <Cell title="Sale Type">{releaseDetails.SaleType}</Cell>

        <Cell title="Notes">{releaseDetails.Notes}</Cell>

        {releaseDetails.DisposalToConnectedParty && (
          <Cell title="Disposal To Connected Party">
            {releaseDetails.DisposalToConnectedParty}
          </Cell>
        )}

        <Cell title="Date">{dateFormat(releaseDetails.CreatedDate)} </Cell>

        <Cell title="Created By">{releaseDetails.CreatedBy} </Cell>
      </StyledHiddenContent>
    </ViewSecuritySectionWrapper>
  );
}

ReleaseDetails.propTypes = {
  releaseDetails: PropTypes.object.isRequired,
  defaultExpanded: PropTypes.bool,
};

export default ReleaseDetails;
