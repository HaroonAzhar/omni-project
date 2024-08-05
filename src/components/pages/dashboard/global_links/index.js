import React from "react";

import { PIPELINE_URL } from "utils/urls";

import OriginationLoanCalculator from "../origination_loan_calculator";
import GenerateEndOfMonth from "../generate_end_of_month";
import {
  StyledGlobalLinksContainer,
  StyledGlobalLinks,
  StyledContainer,
  StyledLink,
} from "../styled_dashboard";

const GlobalLinks = () => {
  const showPipeLineLink = PIPELINE_URL !== undefined ? true : false;

  return (
    <>
      <StyledContainer>
        <StyledGlobalLinksContainer>
          <StyledGlobalLinks>
            {showPipeLineLink && (
              <StyledLink
                to={{ pathname: PIPELINE_URL }}
                target="_blank"
                rel="noreferrer"
              >
                Pipeline
              </StyledLink>
            )}
            <StyledLink to="/admin">Admin</StyledLink>
            <StyledLink to="/waypoints">Waypoints</StyledLink>
            <GenerateEndOfMonth />
            <OriginationLoanCalculator />
          </StyledGlobalLinks>
        </StyledGlobalLinksContainer>
      </StyledContainer>
    </>
  );
};

export default GlobalLinks;
