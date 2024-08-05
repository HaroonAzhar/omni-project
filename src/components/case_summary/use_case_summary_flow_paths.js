import { getFlowPathsHook } from "hooks";

import { orderOfSteps } from "./case_summary_steps";

export default getFlowPathsHook("case_summary", orderOfSteps);
