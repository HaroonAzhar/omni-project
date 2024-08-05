import React from "react";
import { titleize } from "inflected";

import { H1 } from "components/atoms";

import { NOTES } from "../../completed_steps";
import AddNote from "./add_note";
import {
  Background,
  ContentWrapper,
  StepContainer,
  TitleWrapper,
} from "../shared_styles";
import ViewNotes from "./view_notes";
import FilterModal from "./filter_notes";

const Notes = () => {
  return (
    <Background>
      <ContentWrapper>
        <TitleWrapper>
          <H1>{titleize(NOTES)}</H1>
          <FilterModal />
        </TitleWrapper>
        <StepContainer>
          <ViewNotes />
          <AddNote />
        </StepContainer>
      </ContentWrapper>
    </Background>
  );
};
export default Notes;
