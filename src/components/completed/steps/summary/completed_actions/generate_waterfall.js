import { waterfall } from "utils/requests";
import { getStatementInputRedemption } from "utils/requests/helpers";
import { downloadResult } from "utils";

const generateWaterfall = async (
  id,
  endDate = new Date(),
  useMaturityDate = false,
  { fullRedemption = false } = {}
) => {
  const statementInputRedemption = await getStatementInputRedemption(
    id,
    endDate,
    useMaturityDate,
    fullRedemption
  );
  statementInputRedemption.full_redemption = fullRedemption;
  const response = await waterfall(statementInputRedemption);
  downloadResult(response);
};

export default generateWaterfall;
