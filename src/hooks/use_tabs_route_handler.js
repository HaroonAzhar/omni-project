export default ({
  orderOfTabs,
  tabName,
  defaultTabName,
  history,
  changePath,
}) => {
  const indexOfSelectedTab = tabName
    ? orderOfTabs.indexOf(tabName)
    : orderOfTabs.indexOf(defaultTabName);

  const changeTabWithRoute = (indexOfTab) =>
    history.push(changePath(orderOfTabs[indexOfTab]));

  return {
    indexOfSelectedTab,
    changeTabWithRoute,
  };
};
