const areDrawdownsValid = ({ getLoanAdvanceType }) =>
  getLoanAdvanceType() === "multiple";

export default areDrawdownsValid;
