import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";

import { ContextMenu } from "components/molecules";
import { DeletingModal } from "components/organisms";

import {
  StyledForm,
  StyledButtonsContainer,
  StyledInputsContainer,
  StyledButton,
  StyledContextMenuWrapper,
} from "./styled_data_entry_context_menu_with_edit";
import useControls from "./hooks/use_controls";

const DataEntryContextMenuWithEdit = ({ page, dataRecord, children }) => {
  const {
    shouldShowInputs,
    onCancel,
    onEdit,
    onDelete,
    onSubmit,
    shouldShowDeletingModal,
    onDeleteCancel,
    onDeleteClicked,
  } = useControls({ page, dataRecord });

  return (
    <>
      <DeletingModal
        content="Confirm Delete of Admin entry"
        isModalShowed={shouldShowDeletingModal}
        hideModal={onDeleteCancel}
        isError={false}
        sendDeletingRequest={onDelete}
      />
      {shouldShowInputs && (
        <Form
          onSubmit={onSubmit}
          initialValues={dataRecord}
          render={({ handleSubmit }) => {
            return (
              <StyledForm onSubmit={handleSubmit}>
                <StyledInputsContainer>{children}</StyledInputsContainer>
                <StyledButtonsContainer>
                  <StyledButton kind="secondary" onClick={onCancel}>
                    Cancel
                  </StyledButton>
                  <StyledButton>Save</StyledButton>
                </StyledButtonsContainer>
              </StyledForm>
            );
          }}
        />
      )}
      <StyledContextMenuWrapper>
        <ContextMenu onEdit={onEdit} onDelete={onDeleteClicked} />
      </StyledContextMenuWrapper>
    </>
  );
};

export default DataEntryContextMenuWithEdit;

DataEntryContextMenuWithEdit.propTypes = {
  page: PropTypes.string.isRequired,
  dataRecord: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};
