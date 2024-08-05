import React from "react";
import { titleize } from "inflected";

import { H1 } from "components/atoms";

import { CASHFLOWS } from "../../completed_steps";
import ViewCashflows from "./view_cashflows";
import {
  Background,
  ContentWrapper,
  StepContainer,
  TitleWrapper,
} from "../shared_styles";

const Cashflows = () => {
  return (
    <Background>
      <ContentWrapper>
        <TitleWrapper>
          <H1>{titleize(CASHFLOWS)}</H1>
        </TitleWrapper>
        <StepContainer>
          <ViewCashflows />
        </StepContainer>
      </ContentWrapper>
    </Background>
  );
};
export default Cashflows;
