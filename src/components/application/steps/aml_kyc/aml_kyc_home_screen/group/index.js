import React from "react";
import PropTypes from "prop-types";

import Applicant from "../applicant";
import {
  StyledGroupWrapper,
  StyledGroupMembersWrapper,
} from "./styled_aml_kyc_group";
import {
  CompanyPanel,
  NonUkIndividualPanel,
  UkIndividualPanel,
} from "../panels";
import GroupHeader from "./group_header";

const panels = {
  companies: CompanyPanel,
  ukIndividuals: UkIndividualPanel,
  nonUkIndividuals: NonUkIndividualPanel,
};

const Group = ({ groupName, groupApplicants, modifyApplicant }) => {
  const Panel = panels[groupName];
  return (
    <StyledGroupWrapper>
      <GroupHeader groupName={groupName} groupApplicants={groupApplicants} />
      <StyledGroupMembersWrapper>
        {groupApplicants.map((applicant) => (
          <Applicant applicant={applicant}>
            <Panel applicant={applicant} modifyApplicant={modifyApplicant} />
          </Applicant>
        ))}
      </StyledGroupMembersWrapper>
    </StyledGroupWrapper>
  );
};

Group.propTypes = {
  groupName: PropTypes.string.isRequired,
  groupApplicants: PropTypes.array.isRequired,
  modifyApplicant: PropTypes.func.isRequired,
};

export default Group;
