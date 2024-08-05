import * as _ from "lodash";

import { getApplication } from "../../../selectors";

const getSolicitorDetails = (application) =>
  application?.solicitorDetails || {};

export const getSolicitorDetailsOfApplication = _.flow([
  getApplication,
  getSolicitorDetails,
]);
