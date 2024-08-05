import React from "react";

import { H1 } from "components/atoms";
import { dateFormat } from "utils";

import useEstimatedRedemptionsData from "./use_estimated_redemptions_data";
import ViewEstimatedRedemptions from "./view_estimated_redemptions";
import AddEstimatedRedemption from "./add_estimated_redemption";
import { Background, ContentWrapper, TitleWrapper } from "../shared_styles";
import useCompletedSummaryData from "../summary/hooks/use_completed_summary_data";
import { EstimatedRedemptionTitle } from "./styled_estimated_redemptions";

function EstimatedRedemptions() {
  const { estimatedRedemptions } = useEstimatedRedemptionsData(true);

  const { currentDateOfMaturity } = useCompletedSummaryData();
  return (
    <Background>
      <ContentWrapper>
        <TitleWrapper>
          <EstimatedRedemptionTitle>
            <H1>Estimated Redemptions</H1>
            <div>
              Current Maturity Date: {dateFormat(currentDateOfMaturity)}
            </div>
          </EstimatedRedemptionTitle>
        </TitleWrapper>
        <>
          <ViewEstimatedRedemptions
            estimatedRedemptions={estimatedRedemptions}
          />
          <AddEstimatedRedemption />
        </>
      </ContentWrapper>
    </Background>
  );
}

export default EstimatedRedemptions;
