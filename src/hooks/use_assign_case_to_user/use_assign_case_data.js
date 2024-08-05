import { useEffect, useState } from "react";

import useRequests from "./use_requests";

const useAssignCaseData = (caseToAssignUuid) => {
  const [caseReference, setCaseReference] = useState("");
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const { requestCase, requestUsers } = useRequests();

  useEffect(() => {
    if (!caseToAssignUuid) {
      return;
    }
    requestCase(caseToAssignUuid).then(({ data }) => {
      setCaseReference(data.CaseNr ?? "");
      setCurrentUser(data.assignedUser ?? {});
      requestUsers(data.assignedUser?.Id).then(({ data: usersData }) => {
        setUsers(usersData);
      });
    });
  }, [caseToAssignUuid, requestCase, requestUsers]);

  return {
    caseReference,
    users,
    currentUser,
  };
};

export default useAssignCaseData;
