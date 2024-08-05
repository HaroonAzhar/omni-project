import useRequests from "./use_requests";
import useAssignCaseData from "./use_assign_case_data";

const UNASSIGNED = "unassigned";
const useAssignCaseToUser = ({ caseToAssignUuid, onAssigned }) => {
  const { removeUser, assignUser } = useRequests();
  const { users, currentUser, caseReference } = useAssignCaseData(
    caseToAssignUuid
  );

  const options = [
    {
      label: UNASSIGNED,
      value: UNASSIGNED,
    },
    ...users.map((user) => ({
      value: user.Id,
      label: user.Name,
    })),
  ];
  const labelText = `The previous selected user ${currentUser.Name} has been deleted`;
  const initialValues = {
    UserId: currentUser.IsDeleted ? UNASSIGNED : currentUser.Id ?? UNASSIGNED,
  };

  const onSubmit = ({ UserId }) => {
    const request =
      UserId === UNASSIGNED || UserId === undefined
        ? removeUser(caseToAssignUuid)
        : assignUser(caseToAssignUuid, { UserId: Number(UserId) });
    request.then((res) => {
      if (res) {
        onAssigned();
      }
    });
  };

  return {
    onSubmit,
    caseReference,
    options,
    initialValues,
    labelText,
    currentUser,
  };
};

export default useAssignCaseToUser;
