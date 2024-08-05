import * as _ from "lodash";

import { getApplication } from "../../../selectors";

const getIntroducerDetails = (application) =>
  application?.introducerDetails || {};

export const getIntroducerDetailsOfApplication = _.flow([
  getApplication,
  getIntroducerDetails,
]);
