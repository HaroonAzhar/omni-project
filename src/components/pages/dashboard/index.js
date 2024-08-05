import React from "react";

import GlobalLinks from "./global_links";
import DashboardTable from "./dashboard_table";
import {
  StyledBackground,
  StyledContainer,
  StyledTitle,
  StyledHeader,
  StyledTableContainer,
} from "./styled_dashboard";

const Dashboard = () => {
  return (
    <StyledBackground>
      <GlobalLinks />
      <StyledContainer>
        <StyledHeader>
          <StyledTitle>Cases</StyledTitle>
        </StyledHeader>

        <StyledTableContainer>
          <DashboardTable />
        </StyledTableContainer>
      </StyledContainer>
    </StyledBackground>
  );
};

export default Dashboard;
