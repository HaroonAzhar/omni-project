import React, { useState } from "react";
import PropTypes from "prop-types";

import { Button } from "components/atoms";
import { Cell } from "components/molecules";
import { dateFormat } from "utils";

import {
  StyledHiddenContent,
  ViewSecuritySectionWrapper,
} from "../../styled_securities";

function ConversionDetails({ conversionDetails, defaultExpanded = false }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <ViewSecuritySectionWrapper>
      <Button
        onClick={() => {
          setIsExpanded((prevExpanded) => !prevExpanded);
        }}
      >
        {isExpanded ? `Hide Conversion Details` : `Show Conversion Details`}
      </Button>
      <StyledHiddenContent expanded={isExpanded} align="end">
        <Cell title="Notes">{conversionDetails.Notes}</Cell>

        <Cell title="Date">{dateFormat(conversionDetails.CreatedDate)} </Cell>

        <Cell title="Created By">{conversionDetails.CreatedBy} </Cell>
      </StyledHiddenContent>
    </ViewSecuritySectionWrapper>
  );
}

ConversionDetails.propTypes = {
  conversionDetails: PropTypes.object.isRequired,
  defaultExpanded: PropTypes.bool,
};

export default ConversionDetails;
