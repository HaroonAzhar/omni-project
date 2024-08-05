import React, { useState } from "react";
import PropTypes from "prop-types";

import { Modal } from "components/atoms";

import ReadOnlyViewContent from "./read_only_view_content";
import { ListButton } from "../styled_further";

function ReadOnlyView({ furtherDrawdown }) {
  const [shouldShowModal, setShouldShowModal] = useState();

  const onOpen = () => setShouldShowModal(true);
  const onClose = () => setShouldShowModal(false);
  return (
    <>
      <Modal isOpen={shouldShowModal} onClose={onClose}>
        <ReadOnlyViewContent furtherDrawdown={furtherDrawdown} />
      </Modal>
      <ListButton onClick={onOpen}>Read Only View</ListButton>
    </>
  );
}

ReadOnlyView.propTypes = {
  furtherDrawdown: PropTypes.object.isRequired,
};

export default ReadOnlyView;
