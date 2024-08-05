import * as _ from "lodash";

import { getApplication } from "../../../selectors";

const getSteps = (application) => application?.steps || [];

export const getStepsOfApplication = _.flow([getApplication, getSteps]);
