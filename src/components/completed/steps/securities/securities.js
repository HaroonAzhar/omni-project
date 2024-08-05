import React from "react";
import { titleize } from "inflected";

import { H1 } from "components/atoms";

import { SECURITIES } from "../../completed_steps";
import {
  Background,
  ContentWrapper,
  StepContainer,
  TitleWrapper,
} from "../shared_styles";
import ViewSecurities from "./view_completed_securities";
import AddNewSecurity from "./add_new_security";
import { SecuritiesWrapper } from "./styled_securities";

const Securities = () => {
  return (
    <Background>
      <ContentWrapper>
        <TitleWrapper>
          <H1>{titleize(SECURITIES)}</H1>
        </TitleWrapper>
        <StepContainer>
          <SecuritiesWrapper>
            <ViewSecurities />
            <AddNewSecurity />
          </SecuritiesWrapper>
        </StepContainer>
      </ContentWrapper>
    </Background>
  );
};
export default Securities;
