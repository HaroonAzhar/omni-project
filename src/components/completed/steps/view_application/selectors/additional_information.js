import * as _ from "lodash";

import { getCase } from "../../../selectors";

const getAdditionalInformation = (caseData) =>
  caseData?.AdditionalInformation || "";

export const getAdditionalInformationOfCase = _.flow([
  getCase,
  getAdditionalInformation,
]);
