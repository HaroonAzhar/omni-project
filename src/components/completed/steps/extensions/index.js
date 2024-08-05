import React from "react";
import { titleize } from "inflected";

import { H1 } from "components/atoms";

import { EXTENSIONS } from "../../completed_steps";
import {
  Background,
  ContentWrapper,
  StepContainer,
  TitleWrapper,
} from "../shared_styles";
import ViewExtensions from "./view_extensions";

const Extensions = () => {
  return (
    <Background>
      <ContentWrapper>
        <TitleWrapper>
          <H1>{titleize(EXTENSIONS)}</H1>
        </TitleWrapper>
        <StepContainer>
          <ViewExtensions />
        </StepContainer>
      </ContentWrapper>
    </Background>
  );
};
export default Extensions;
