import React from "react";
import { titleize } from "inflected";

import { H1 } from "components/atoms";

import { WAYPOINTS } from "../../completed_steps";
import AddWaypoint from "./add_waypoint";
import {
  Background,
  ContentWrapper,
  StepContainer,
  TitleWrapper,
} from "../shared_styles";
import ViewWaypoints from "./view_waypoints";
import FilterModal from "./filter_waypoints";

const Waypoints = () => {
  return (
    <Background>
      <ContentWrapper>
        <TitleWrapper>
          <H1>{titleize(WAYPOINTS)}</H1>
          <FilterModal />
        </TitleWrapper>
        <StepContainer>
          <ViewWaypoints />
          <AddWaypoint />
        </StepContainer>
      </ContentWrapper>
    </Background>
  );
};
export default Waypoints;
