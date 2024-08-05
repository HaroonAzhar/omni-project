import * as _ from "lodash";

import { getApplication } from "../../../selectors";

const getAmlKycValidation = (application) =>
  application?.amlKycValidation || {};

export const getAmlKycValidationOfApplication = _.flow([
  getApplication,
  getAmlKycValidation,
]);
