import { useState } from "react";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";

import { removeLastAddedRecord } from "store/admin";

const useEditFormControls = ({ page, dataRecord }) => {
  const [shouldShowInputs, setShouldShowInputs] = useState(isEmpty(dataRecord));

  const [shouldShowDeletingModal, setShouldShowDeletingModal] = useState();

  const onDeleteClicked = () => setShouldShowDeletingModal(true);
  const onDeleteCancel = () => setShouldShowDeletingModal(false);

  const dispatch = useDispatch();
  const onEdit = () => {
    setShouldShowInputs(true);
  };

  const onCancel = (e) => {
    e.preventDefault();

    if (isEmpty(dataRecord)) {
      dispatch(removeLastAddedRecord({ page }));
    }

    setShouldShowInputs(false);
  };
  return {
    shouldShowInputs,
    setShouldShowInputs,
    onEdit,
    onCancel,
    onDeleteClicked,
    onDeleteCancel,
    shouldShowDeletingModal,
  };
};

export default useEditFormControls;
