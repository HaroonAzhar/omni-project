import { useParams } from "react-router";

import { useRequestWithProgressToastRollbar } from "utils";
import { useUser } from "hooks";

import { useRequests } from "../../../view_further_context";

const useActionContext = (further) => {
  const { id } = useParams();
  const user = useUser();

  const {
    fetchFurtherAndStore,
    saveOriginationChecklistField,
    furtherIdKey,
  } = useRequests();

  const savingRequest = (key, values) =>
    saveOriginationChecklistField(id, further[furtherIdKey], key, values).then(
      (res) => {
        if (!res) {
          return;
        }
        fetchFurtherAndStore();
        return res;
      }
    );

  const request = useRequestWithProgressToastRollbar(savingRequest);

  return { user, request };
};

export default useActionContext;
