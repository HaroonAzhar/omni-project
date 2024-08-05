import { getFlowPathsHook } from "hooks";

import { orderOfSteps } from "./completed_steps";

export default getFlowPathsHook("completed", orderOfSteps);
