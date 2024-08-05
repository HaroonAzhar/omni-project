import { getFlowPathsHook } from "hooks";

import { orderOfSteps } from "./redeemed_steps";

export default getFlowPathsHook("redeemed", orderOfSteps);
