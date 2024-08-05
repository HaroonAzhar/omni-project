import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Button } from "components/atoms";
import { mapPropertyAddress } from "components/completed/utils";
import { propertyAddressFormat, currencyFormat } from "utils";

import Valuations from "./valuations";
import Releases from "./releases";
import Notes from "./notes";
import {
  ViewCompletedSecurityWrapper,
  ViewCompletedSecurityHeader,
  ViewCompletedSecurityHeaderInfo,
  ViewCompletedSecurityTitle,
} from "./styled_view_completed_securities";
import { StyledHiddenContent, StyledTextColor } from "../styled_securities";
import Conversions from "./conversions";

function SecurityDetails({ security }) {
  const valuationText = `Valuation: ${currencyFormat(
    security.currentValuation
  )} GDV: ${currencyFormat(security.currentGDV)}`;

  const lastValuation = security?.valuations?.slice(-1)?.[0]?.Valuation ?? 0;
  const releasedText = (
    <StyledTextColor color="red">
      {" "}
      - Released: Sale Price: {currencyFormat(
        security?.releases[0]?.SalePrice
      )}{" "}
      - Last Valuation: {currencyFormat(lastValuation)}
    </StyledTextColor>
  );
  const convertedText = (
    <StyledTextColor color="darkgrey">
      {" "}
      - Converted - {security?.conversions?.[0]?.Notes ?? ""}
    </StyledTextColor>
  );

  if (security.isReleased) {
    return releasedText;
  }

  if (security.isConverted) {
    return convertedText;
  }

  return valuationText;
}

function ViewCompletedSecurity({ security, defaultExpanded = false }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  useEffect(() => {
    setIsExpanded(defaultExpanded);
  }, [defaultExpanded]);

  const addressText = propertyAddressFormat({
    address: mapPropertyAddress(security.property),
  });

  const titleText = `${addressText}`;

  return (
    <ViewCompletedSecurityWrapper>
      <ViewCompletedSecurityHeader>
        <ViewCompletedSecurityHeaderInfo>
          <ViewCompletedSecurityTitle>{titleText}</ViewCompletedSecurityTitle>
          <p>
            <SecurityDetails security={security} />
          </p>
        </ViewCompletedSecurityHeaderInfo>

        <Button
          onClick={() => {
            setIsExpanded((prevExpanded) => !prevExpanded);
          }}
        >
          {isExpanded ? "Hide Details" : "Show Details"}
        </Button>
      </ViewCompletedSecurityHeader>

      <StyledHiddenContent expanded={isExpanded}>
        <Valuations security={security} />
        <Releases security={security} />
        <Conversions security={security} />
        <Notes security={security} />
      </StyledHiddenContent>
    </ViewCompletedSecurityWrapper>
  );
}

ViewCompletedSecurity.propTypes = {
  security: PropTypes.object.isRequired,
  defaultExpanded: PropTypes.bool,
};

export default ViewCompletedSecurity;
