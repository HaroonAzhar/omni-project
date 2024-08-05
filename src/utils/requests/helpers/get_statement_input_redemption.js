import getStatementInput from "components/completed/steps/cashflows/view_cashflows/get_statement_input";
import signedAmount from "components/completed/steps/adjustments/helpers/signed_amount";
import {
  getAdjustments,
  getDefaultEventsPeriods,
  getCase,
} from "utils/requests";

const getStatementInputRedemption = async (
  id,
  endDate = new Date(),
  useMaturityDate = false,
  withMinimumInterest = false
) => {
  const adjustmentsData = await getAdjustments(id);
  const { data: defaultEventsPeriods } = await getDefaultEventsPeriods(id);

  const adjustments = adjustmentsData.data.map((adjustment) => ({
    ...adjustment,
    signedAmount: signedAmount(adjustment, adjustment.amount),
  }));
  const {
    data: { dip: dipData, completed, CaseNr },
  } = await getCase(id);

  const effectiveEndDate = useMaturityDate
    ? completed?.currentDateOfMaturity
    : endDate;
  const statementInputRedemption = getStatementInput({
    dip: dipData,
    completed,
    adjustments,
    defaultEventsPeriods,
    endDate: effectiveEndDate,
    withMinimumInterest,
  });

  statementInputRedemption.case_number = CaseNr;

  return statementInputRedemption;
};

export default getStatementInputRedemption;
