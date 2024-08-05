import React from "react";
import { Tabs, Tab, TabPanel, TabList } from "react-tabs";
import styled from "styled-components/macro";

import { lightGrey, mainBlue, shadow } from "styles/colors";

const TAB_LIST_COLUMN_WIDTH = "200px";

// eslint-disable-next-line no-unused-vars,react/jsx-props-no-spreading
const StyledTabs = styled(({ isColumn, ...rest }) => <Tabs {...rest} />)`
  ${({ isColumn }) => isColumn && "display: flex;"}
  width: 100%;
`;

// eslint-disable-next-line no-unused-vars,react/jsx-props-no-spreading
const StyledTabList = styled(({ isColumn, ...rest }) => <TabList {...rest} />)`
  align-items: stretch;
  border-radius: 8px;
  box-shadow: 0px 1px 4px ${shadow};
  display: flex;
  height: 58px;
  padding: 0 8px 0 8px;
  ${({ isColumn }) =>
    isColumn &&
    `flex-direction: column; width: ${TAB_LIST_COLUMN_WIDTH}; height: auto;`}
`;
StyledTabList.tabsRole = "TabList";

// eslint-disable-next-line no-unused-vars,react/jsx-props-no-spreading
const StyledTab = styled(({ isColumn, ...rest }) => <Tab {...rest} />)`
  align-items: center;
  background-color: white;
  border: 0;

  border-bottom: 4px solid transparent;
  color: ${lightGrey};
  cursor: pointer;
  display: flex;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  padding: 0 50px 0 50px;

  &.react-tabs__tab--disabled:hover {
    color: ${lightGrey};
    cursor: default;
  }

  ${({ isColumn }) => isColumn && "padding: 25px 0 25px 25px;"}

  ${({ selected }) =>
    selected &&
    `
    border-bottom: 4px solid ${mainBlue}
    color: black;
  `}

  :hover, :focus {
    color: black;
  }
`;
StyledTab.tabsRole = "Tab";

const StyledTabPanel = styled(TabPanel)``;
StyledTabPanel.tabsRole = "TabPanel";

const StyledPanelContainer = styled.div`
  padding-left: 40px;
  width: calc(100% - ${TAB_LIST_COLUMN_WIDTH});
`;

export {
  StyledTabs,
  StyledTabPanel,
  StyledTab,
  StyledTabList,
  StyledPanelContainer,
};
