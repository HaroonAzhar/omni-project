import { useParams } from "react-router-dom";

import { useRequestWithProgressToastRollbar } from "utils";
import { addAssociatedTag } from "utils/requests";

const useAddAssociatedTag = () => {
  const { id } = useParams();

  const sendSavingRequest = useRequestWithProgressToastRollbar(
    addAssociatedTag
  );

  const sendRequest = (values) => sendSavingRequest(id, values);
  return sendRequest;
};

export default useAddAssociatedTag;
