import { useParams } from "react-router-dom";

import { useRequestWithProgressToastRollbar } from "utils";
import { saveNote } from "utils/requests";

const useSaveNote = () => {
  const { id } = useParams();

  const sendSavingRequest = useRequestWithProgressToastRollbar(saveNote);

  const sendRequest = (values) => sendSavingRequest(id, values);
  return sendRequest;
};

export default useSaveNote;
