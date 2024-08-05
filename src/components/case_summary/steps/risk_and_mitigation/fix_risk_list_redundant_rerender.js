/*
  useRequestWithProgressAndToast is used by useSubmitCaseSummary hook in risk_and_mitigation/index.js.
  When toast notification showed up and then hide - in some reasons the RiskList component was rerendered
  and then edited changes was reset to initial state (from store).

  This issue on github is probably related to this:
  https://github.com/jossmac/react-toast-notifications/issues/87

  The hot fix for that is to save amended values temporary. And the use it as initialValues after rerender.
  Moreover there is a need to recognize if form is pristine or not, to later distinguish
  (In RiskList/SaveFormOnChangePath component) if we need to send saving request or not.
*/

let riskInputsValuesCache;

const toastBugFix = (pristine, riskInputsValues) => {
  if (pristine) return;

  riskInputsValuesCache = riskInputsValues;
};

export default () => ({
  riskInputsValuesCache,
  toastBugFix,
});
