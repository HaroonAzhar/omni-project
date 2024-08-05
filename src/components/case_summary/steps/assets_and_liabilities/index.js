import styled from "styled-components";
import React from "react";
import { useSelector } from "react-redux";

import { Button, NavigationButtonContainer } from "components/atoms";
import { currencyFormat } from "utils";
import { Table, FormWrapper, Cell } from "components/molecules";

import { ASSETS_AND_LIABILITIES } from "../../case_summary_steps";
import useCaseSummaryFlowPaths from "../../use_case_summary_flow_paths";
import {
  StyledInformationColumn,
  StyledInformationContainer,
  StyledInputContainer,
} from "../../case_summary_styles";
import { StyledTitle } from "../shared";
import selectAssetsAndLiabilities from "./select_assets_and_liabilities";

const StyledSumUpCell = styled(Cell)`
  border-top: 1px solid ${({ theme }) => theme.colors.shadow};
  margin-top: -20px;
  padding-top: 20px;
`;

const propertyPortfolioColumns = [
  {
    Header: "Address",
    accessor: "address",
  },
  {
    Header: "Lender Name",
    accessor: "lender_name",
  },
  {
    Header: "Est Value",
    accessor: "estimated_value",
  },
  {
    Header: "Current Debt",
    accessor: "current_debt",
  },
  {
    Header: "Mortgage",
    accessor: "mortgage",
  },
  {
    Header: "Rental",
    accessor: "rental",
  },
];

const AssetsAndLiabilities = () => {
  const { goStepBack, goToNextStep } = useCaseSummaryFlowPaths(
    ASSETS_AND_LIABILITIES
  );

  const {
    properties,
    otherAssets,
    liabilities,
    totalValueOfAssets,
    totalValueOfLiabilities,
  } = useSelector(selectAssetsAndLiabilities);

  return (
    <FormWrapper title="Assets & Liabilities">
      <StyledInputContainer>
        <StyledTitle>Property Portfolio</StyledTitle>
        <Table
          columns={propertyPortfolioColumns}
          data={properties}
          shouldShowHeaders={true}
        />
      </StyledInputContainer>

      <StyledInformationContainer>
        <StyledInformationColumn>
          <StyledTitle>Other Assets</StyledTitle>
          {otherAssets &&
            otherAssets.map(({ name, price }) => (
              <Cell title={name}>{price}</Cell>
            ))}
          <StyledSumUpCell title="Total value">
            {currencyFormat(totalValueOfAssets)}
          </StyledSumUpCell>
        </StyledInformationColumn>
        <StyledInformationColumn>
          <StyledTitle>Liabilities</StyledTitle>
          {liabilities &&
            liabilities.map(({ name, price }) => (
              <Cell title={name}>{price}</Cell>
            ))}
          <StyledSumUpCell title="Total value">
            {currencyFormat(totalValueOfLiabilities)}
          </StyledSumUpCell>
        </StyledInformationColumn>
      </StyledInformationContainer>

      <NavigationButtonContainer>
        <Button kind="fade" onClick={goStepBack}>
          Back
        </Button>
        <Button onClick={goToNextStep}>Next</Button>
      </NavigationButtonContainer>
    </FormWrapper>
  );
};

export default AssetsAndLiabilities;
