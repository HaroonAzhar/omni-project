import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import { DeletingModal } from "components/organisms";
import { DeleteIcon } from "components/icons";
import { useRequestWithProgressToastRollbar } from "utils";
import { deleteDip } from "utils/requests";

const DeleteButton = () => {
  const { CaseNr, enquiry, Id, Status } = useSelector((state) => state.case);
  const [itemToDelete, setItemToDelete] = useState();
  const history = useHistory();

  const deleteRequest = useRequestWithProgressToastRollbar(deleteDip);

  const sendDeletingRequest = async () => {
    const res = await deleteRequest(itemToDelete);

    if (res) {
      history.push("/");
    }
  };

  const canDelete = !CaseNr && enquiry === undefined && Status === "pending";
  if (!canDelete) {
    return null;
  }

  return (
    <>
      <DeletingModal
        content="Are you sure to delete this draft?"
        isModalShowed={!!itemToDelete}
        hideModal={() => setItemToDelete()}
        isError={false}
        sendDeletingRequest={() => sendDeletingRequest(itemToDelete)}
      />
      <button type="button" onClick={() => setItemToDelete(Id)}>
        <DeleteIcon />
      </button>
    </>
  );
};

export default DeleteButton;
