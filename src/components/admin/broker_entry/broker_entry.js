import React from "react";
import PropTypes from "prop-types";

import { ContextMenu } from "components/molecules";
import { DeletingModal } from "components/organisms";

import useControls from "../data_view_page/data_entry_context_menu_with_edit/hooks/use_controls";
import { StyledContextMenuWrapper } from "../data_view_page/data_entry_context_menu_with_edit/styled_data_entry_context_menu_with_edit";
import BrokerEdit from "./broker_edit";

const BrokerEntry = ({ page, dataRecord }) => {
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
      <BrokerEdit
        dataRecord={dataRecord}
        onCancel={onCancel}
        onSubmit={onSubmit}
        shouldShowInputs={shouldShowInputs}
      />

      <StyledContextMenuWrapper>
        <ContextMenu onEdit={onEdit} onDelete={onDeleteClicked} />
      </StyledContextMenuWrapper>
    </>
  );
};

export default BrokerEntry;

BrokerEntry.propTypes = {
  page: PropTypes.string.isRequired,
  dataRecord: PropTypes.object.isRequired,
};
