import { saveTitleNumbers } from "utils/requests";

import useRequestWithProgressAndToast from "./use_request_with_progress_and_toast";

const useSubmitCaseSummary = () =>
  useRequestWithProgressAndToast(saveTitleNumbers);
export default useSubmitCaseSummary;
