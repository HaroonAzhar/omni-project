const mapManualStatusesForTable = (manualStatusesData) => {
  return manualStatusesData.map((manualStatus) => ({
    ...manualStatus,
  }));
};

export default mapManualStatusesForTable;
