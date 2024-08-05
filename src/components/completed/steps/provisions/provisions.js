import React from "react";
import { titleize } from "inflected";

import { H1, H2 } from "components/atoms";

import { PROVISIONS } from "../../completed_steps";
import AddCashflow from "./add_cashflow";
import ViewCashflows from "./view_cashflows";
import {
  Background,
  ContentWrapper,
  StepContainer,
  TitleWrapper,
} from "../shared_styles";
import FilterModal from "./filter_cashflows";

const Provisions = () => {
  return (
    <Background>
      <ContentWrapper>
        <H1>{titleize(PROVISIONS)}</H1>

        <TitleWrapper>
          <H2>{titleize("Remaining Expected Cashflow estimates")}</H2>
          <FilterModal />
        </TitleWrapper>
        <StepContainer>
          <ViewCashflows />
          <AddCashflow />
        </StepContainer>
      </ContentWrapper>
    </Background>
  );
};
export default Provisions;
