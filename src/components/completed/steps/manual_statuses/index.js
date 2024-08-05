import React from "react";
import { titleize } from "inflected";

import { H1 } from "components/atoms";

import { MANUAL_STATUSES } from "../../completed_steps";
import {
  Background,
  ContentWrapper,
  StepContainer,
  TitleWrapper,
} from "../shared_styles";
import ViewManualStatuses from "./view_manual_statuses";

const ManualStatuses = () => {
  return (
    <Background>
      <ContentWrapper>
        <TitleWrapper>
          <H1>{titleize(MANUAL_STATUSES)}</H1>
        </TitleWrapper>
        <StepContainer>
          <ViewManualStatuses />
        </StepContainer>
      </ContentWrapper>
    </Background>
  );
};
export default ManualStatuses;
