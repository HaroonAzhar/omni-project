import React from "react";
import { titleize } from "inflected";

import { H1 } from "components/atoms";

import { ADJUSTMENTS } from "../../completed_steps";
import AddAdjustment from "./add_adjustment";
import ViewAdjustments from "./view_adjustments";
import {
  Background,
  ContentWrapper,
  StepContainer,
  TitleWrapper,
} from "../shared_styles";
import FilterModal from "./filter_adjustments";

const Adjustments = () => {
  return (
    <Background>
      <ContentWrapper>
        <TitleWrapper>
          <H1>{titleize(ADJUSTMENTS)}</H1>
          <FilterModal />
        </TitleWrapper>
        <StepContainer>
          <ViewAdjustments />
          <AddAdjustment />
        </StepContainer>
      </ContentWrapper>
    </Background>
  );
};
export default Adjustments;
