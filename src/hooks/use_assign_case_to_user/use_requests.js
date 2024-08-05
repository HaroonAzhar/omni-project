import { useCallback } from "react";

import {
  getCase,
  assignUserToCase,
  getAdminRecords,
  removeUserFromCase,
} from "utils/requests";
import { useRequestWithProgressToastRollbar } from "utils";

const useRequests = () => {
  const requestCase = useRequestWithProgressToastRollbar(
    getCase,
    "Request Case"
  );
  const getUsers = useCallback(
    (userId) => getAdminRecords("users", userId),
    []
  );
  const requestUsers = useRequestWithProgressToastRollbar(
    getUsers,
    "Request Users"
  );
  const removeUser = useRequestWithProgressToastRollbar(
    removeUserFromCase,
    "Remove User"
  );
  const assignUser = useRequestWithProgressToastRollbar(
    assignUserToCase,
    "Assign User"
  );
  return {
    requestCase,
    requestUsers,
    removeUser,
    assignUser,
  };
};

export default useRequests;
