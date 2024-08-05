import React from "react";
import { titleize } from "inflected";

import { H1 } from "components/atoms";

import { DEFAULT_EVENTS } from "../../completed_steps";
import AddDefaultEvent from "./add_default_event";
import {
  Background,
  ContentWrapper,
  StepContainer,
  TitleWrapper,
} from "../shared_styles";
import ViewDefaultEvents from "./view_default_events";
import FilterModal from "./filter_notes";

const DefaultEvents = () => {
  return (
    <Background>
      <ContentWrapper>
        <TitleWrapper>
          <H1>{titleize(DEFAULT_EVENTS)}</H1>
          <FilterModal />
        </TitleWrapper>
        <StepContainer>
          <ViewDefaultEvents />
          <AddDefaultEvent />
        </StepContainer>
      </ContentWrapper>
    </Background>
  );
};
export default DefaultEvents;
