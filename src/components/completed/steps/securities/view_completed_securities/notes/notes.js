import React, { useState } from "react";
import PropTypes from "prop-types";

import { Button, Modal } from "components/atoms";

import {
  StyledHiddenContent,
  ViewSecuritySectionWrapper,
} from "../../styled_securities";
import { ButtonsContainerFlexEnd } from "../../../shared_styles/styled_filter";
import AddSecurityNote from "./add_security_note";
import ViewSecurityNotes from "./view_security_notes";

function Notes({ security, defaultExpanded = false }) {
  const [addNoteModalVisible, setAddNotModalVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const closeAdd = () => setAddNotModalVisible(false);
  const openAdd = () => setAddNotModalVisible(true);

  const totalNotes = security?.notes?.length ?? 0;

  return (
    <ViewSecuritySectionWrapper>
      <Modal isOpen={addNoteModalVisible} onClose={closeAdd}>
        <AddSecurityNote security={security} closeAdd={closeAdd} />
      </Modal>
      <Button
        onClick={() => {
          setIsExpanded((prevExpanded) => !prevExpanded);
        }}
      >
        {isExpanded
          ? `Hide Notes (${totalNotes})`
          : `Show Notes (${totalNotes})`}
      </Button>
      <StyledHiddenContent expanded={isExpanded} align="end">
        <ViewSecurityNotes notes={security.notes} />
        <ButtonsContainerFlexEnd>
          <div></div>
          <Button onClick={openAdd}>Add New Note</Button>
        </ButtonsContainerFlexEnd>
      </StyledHiddenContent>
    </ViewSecuritySectionWrapper>
  );
}

Notes.propTypes = {
  security: PropTypes.object.isRequired,
  defaultExpanded: PropTypes.bool,
};

export default Notes;
