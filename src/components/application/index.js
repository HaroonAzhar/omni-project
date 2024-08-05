import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import {
  StyledBackground,
  StyledContainer,
  StyledTitle,
  StyledHeader,
} from "components/pages/dashboard/styled_dashboard";

import LabelsList from "./labels_list";
import getApplication from "./selectors/getApplication";
import Checklist from "./checklist";
import { useFetchAndStoreApplicants } from "./helpers/hooks";

const Application = () => {
  const initialRequest = useFetchAndStoreApplicants(() => {});
  useEffect(initialRequest, []);

  const { case_nr } = useSelector(getApplication);

  return (
    <StyledBackground>
      <StyledContainer>
        <StyledHeader>
          <StyledTitle>Application, Ref: {case_nr}</StyledTitle>
          <LabelsList />
        </StyledHeader>
        <Checklist />
      </StyledContainer>
    </StyledBackground>
  );
};

export default Application;
