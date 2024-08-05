import { Tabs, Tab, TabPanel, TabList } from "react-tabs";
import styled from "styled-components/macro";

const StyledTabs = styled(Tabs)``;

const StyledTabList = styled(TabList)`
  border: 1px solid black;
  display: flex;
  list-style-type: none;
  margin: 0;
`;
StyledTabList.tabsRole = "TabList";

const StyledTab = styled(Tab)`
  cursor: pointer;
  padding: 8px;
  text-align: center;
  user-select: none;
  width: 50%;

  &.is-selected {
    border-bottom: 2px solid black;
  }
`;
StyledTab.tabsRole = "Tab";

const StyledTabPanel = styled(TabPanel)`
  margin-top: 5px;
`;

StyledTabPanel.tabsRole = "TabPanel";

export { StyledTabs, StyledTabPanel, StyledTab, StyledTabList };
