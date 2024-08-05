import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { humanize } from "inflected";
import { useSelector } from "react-redux";

import { BackToChecklistButton } from "components/molecules";
import {
  StyledBackground,
  StyledContainer,
  StyledTitle,
  StyledHeader,
  StyledTableContainer,
} from "components/pages/dashboard/styled_dashboard";
import { useFetchAndStoreApplicants } from "components/application/helpers/hooks";

import ApplicantAssetsTable from "./applicant_assets_table";
import useAssetsFlowPaths from "../use_assets_flow_paths";
import selectApplicantTableData from "./applicant_assets_table/select_applicant_table_data";

const StyledHomeScreenHeader = styled(StyledHeader)`
  flex-wrap: wrap;
`;

const StyledHomeScreenTitle = styled(StyledTitle)`
  margin-bottom: 1em;
  width: 100%;
`;

const step_id = "assets_and_liabilities";

const AssetsHomeScreen = () => {
  const { goBackToChecklist } = useAssetsFlowPaths();

  const showInfoBoxMock = useCallback(() => {}, []);
  const sendInitialRequests = useFetchAndStoreApplicants({
    showInfoBox: showInfoBoxMock,
  });

  useEffect(() => {
    sendInitialRequests();
  }, [sendInitialRequests]);
  const applicantsData = useSelector(selectApplicantTableData);

  return (
    <StyledBackground>
      <StyledContainer>
        <StyledHomeScreenHeader>
          <StyledHomeScreenTitle>{humanize(step_id)}</StyledHomeScreenTitle>

          <BackToChecklistButton
            kind="extra"
            type="button"
            onClick={goBackToChecklist}
          >
            &lt; Back to the Application
          </BackToChecklistButton>
        </StyledHomeScreenHeader>
        <StyledTableContainer>
          <ApplicantAssetsTable
            isViewOnly={false}
            applicantsData={applicantsData}
          />
        </StyledTableContainer>
      </StyledContainer>
    </StyledBackground>
  );
};

export default AssetsHomeScreen;
