import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import {
  StyledHeader,
  StyledTitle,
} from "components/pages/dashboard/styled_dashboard";

import { PageContainer, Paper, PanelItemContainer } from "./ltv.atoms";
import BackButton from "./back_button";
import {
  StyledTab,
  StyledTabList,
  StyledTabPanel,
  StyledTabs,
} from "../molecules/tabs";
import Current from "./current";
import History from "./history";

const pages = ["current", "history"];

const Ltv = ({ page = "current" }) => {
  const { push } = useHistory();
  const indexOfSelectedTab = pages.indexOf(page);

  const changeTabWithRoute = (index) => {
    push(`/ltv/${pages[index]}`);
  };

  return (
    <PageContainer>
      <BackButton />

      <StyledHeader>
        <StyledTitle>Cases LTV Limits History</StyledTitle>
      </StyledHeader>

      <Paper>
        <StyledHeader>
          <StyledTitle>Omni Limited</StyledTitle>
        </StyledHeader>
        <StyledTabs
          selectedIndex={indexOfSelectedTab}
          onSelect={changeTabWithRoute}
        >
          <StyledTabList>
            <StyledTab>Current</StyledTab>
            <StyledTab>History</StyledTab>
          </StyledTabList>

          <StyledTabPanel>
            <PanelItemContainer>
              <Current />
            </PanelItemContainer>
          </StyledTabPanel>
          <StyledTabPanel>
            <PanelItemContainer>
              <History />
            </PanelItemContainer>
          </StyledTabPanel>
        </StyledTabs>
      </Paper>
    </PageContainer>
  );
};

Ltv.propTypes = {
  page: PropTypes.string,
};

export default Ltv;
