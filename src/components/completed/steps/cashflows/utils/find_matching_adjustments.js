import moment from "moment";

const defaultAdjustmentGetter = (amount) => ({
  signedAmount: amount,
  Description: "Initial loan amount",
});

const findMatchingAdjustments = ({
  statementEntry,
  adjustments,
  getDefaultAdjustment = defaultAdjustmentGetter,
}) => {
  const matchingAdjustments = adjustments.filter(
    (adjustment) =>
      moment(adjustment.ActualDate).format("YYYY-MM-DD") ===
      moment(statementEntry.from).format("YYYY-MM-DD")
  );
  return statementEntry.balance_adjustments
    .map((amount) => {
      if (amount === 0) {
        return undefined;
      }
      const matchingAdjustmentIndex = matchingAdjustments.findIndex(
        (adjustment) => amount === adjustment.signedAmount
      );
      if (matchingAdjustmentIndex === -1) {
        return getDefaultAdjustment(amount);
      }
      const [matchingAdjustment] = matchingAdjustments.splice(
        matchingAdjustmentIndex,
        1
      );
      return matchingAdjustment;
    })
    .filter(Boolean);
};
export default findMatchingAdjustments;
