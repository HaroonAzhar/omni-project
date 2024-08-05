import useEditFormControls from "./use_edit_form_controls";
import useStorageControls from "./use_storage_controls";

const useControls = ({ page, dataRecord }) => {
  const {
    shouldShowInputs,
    setShouldShowInputs,
    onEdit,
    onCancel,
    onDeleteClicked,
    onDeleteCancel,
    shouldShowDeletingModal,
  } = useEditFormControls({
    page,
    dataRecord,
  });

  const onStorageFinished = () => {
    setShouldShowInputs(false);
    onDeleteCancel();
  };
  const { onSubmit, onDelete } = useStorageControls({
    page,
    dataRecord,
    onStorageFinished,
  });

  return {
    onSubmit,
    onDelete,
    onCancel,
    onEdit,
    shouldShowInputs,
    onDeleteClicked,
    onDeleteCancel,
    shouldShowDeletingModal,
  };
};

export default useControls;
