import { useSelector } from "react-redux";

export default () => {
  const ltv_to_gdv = useSelector((state) => state.dip.LtvToGdv);
  const max_ltv = useSelector((state) => state.dip.MaxLtvDayOne);
  const { calculatorResponse } = useSelector((state) => state.calculator);
  const errors = [];

  const isExceededGdltv = ltv_to_gdv / 100 < calculatorResponse.gdltv;
  if (isExceededGdltv) errors.push("Loan value exceeds: Max GDLTV");

  const isExceededLtv = max_ltv / 100 < calculatorResponse.gross_day_one_ltv;
  if (isExceededLtv) errors.push("Loan value exceeds: Max LTV day one");

  return errors.length > 0 ? errors : undefined;
};
