import React from "react";
import { useParams } from "react-router-dom";

import {
  StyledBackground,
  StyledContainer,
} from "components/pages/dashboard/styled_dashboard";
import { H1 } from "components/atoms";

import useApplicants from "../hooks/use_applicants";
import splitApplicantsIntoGroups from "../hooks/helpers/split_applicants_into_groups";
import Group from "./group";
import canValidate from "./can_validate";
import ValidateButton from "./validate_button";

const AmlKycHomeScreen = () => {
  const { id } = useParams();
  const [applicants, modifyApplicant] = useApplicants(id);

  const groups = splitApplicantsIntoGroups(applicants);

  return (
    <StyledBackground>
      <StyledContainer>
        <H1>AML/KYC</H1>
        {Object.entries(groups).map(([groupName, groupApplicants]) => (
          <Group
            groupName={groupName}
            groupApplicants={groupApplicants}
            modifyApplicant={modifyApplicant}
          />
        ))}
        <ValidateButton
          canValidate={canValidate(applicants)}
          applicants={applicants}
        />
      </StyledContainer>
    </StyledBackground>
  );
};

export default AmlKycHomeScreen;
