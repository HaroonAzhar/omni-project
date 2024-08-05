import React, { useState } from "react";
import PropTypes from "prop-types";

import { Button, Modal } from "components/atoms";

import {
  StyledHiddenContent,
  ViewSecuritySectionWrapper,
} from "../../styled_securities";
import { ButtonsContainerFlexEnd } from "../../../shared_styles/styled_filter";
import AddSecurityValuation from "./add_security_valuation";
import ViewSecurityValuations from "./view_security_valuations";

function Valuations({ security, defaultExpanded = false }) {
  const [addValuationModalVisible, setAddNotModalVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const closeAdd = () => setAddNotModalVisible(false);
  const openAdd = () => setAddNotModalVisible(true);

  const totalValuations = security?.valuations?.length ?? 0;

  return (
    <ViewSecuritySectionWrapper>
      <Modal isOpen={addValuationModalVisible} onClose={closeAdd}>
        <AddSecurityValuation security={security} closeAdd={closeAdd} />
      </Modal>
      <Button
        onClick={() => {
          setIsExpanded((prevExpanded) => !prevExpanded);
        }}
      >
        {isExpanded
          ? `Hide Valuations (${totalValuations})`
          : `Show Valuations (${totalValuations})`}
      </Button>
      <StyledHiddenContent expanded={isExpanded} align="end">
        <ViewSecurityValuations valuations={security.valuations} />

        <ButtonsContainerFlexEnd>
          <div></div>
          <Button onClick={openAdd}>Add New Valuation</Button>
        </ButtonsContainerFlexEnd>
      </StyledHiddenContent>
    </ViewSecuritySectionWrapper>
  );
}

Valuations.propTypes = {
  security: PropTypes.object.isRequired,
  defaultExpanded: PropTypes.bool,
};

export default Valuations;
