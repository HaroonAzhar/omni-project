import React from "react";
import { titleize } from "inflected";

import {
  StyledFormWrapper,
  StyledBackground,
} from "components/molecules/form_wrapper";
import { Cell, CaseTags } from "components/molecules";
import { currencyFormat, dateFormat } from "utils";
import { H1 } from "components/atoms";

import { OVERVIEW } from "../../redeemed_steps";
import useRedeemedOverviewData from "./hooks/use_redeemed_overview_data";
import RedeemeddActions from "./redeemed_actions";
import { RedeemedOverviewTitleWrapper } from "./styled_redeemed_overview";

const Overview = () => {
  const {
    applicationData,
    dateOfCompletion,
    currentBalance,
    completedData,
  } = useRedeemedOverviewData();
  return (
    <StyledBackground>
      <StyledFormWrapper>
        <RedeemedOverviewTitleWrapper>
          <H1>{titleize(OVERVIEW)}</H1>
          <RedeemeddActions
            applicationData={applicationData}
            completedData={completedData}
          />
        </RedeemedOverviewTitleWrapper>

        <CaseTags />
        <Cell title="Completion Date:">{dateFormat(dateOfCompletion)} </Cell>

        <Cell title="Current Balance"> {currencyFormat(currentBalance)} </Cell>
      </StyledFormWrapper>
    </StyledBackground>
  );
};

export default Overview;
