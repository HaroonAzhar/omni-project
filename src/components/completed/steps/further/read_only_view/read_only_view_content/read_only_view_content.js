import React from "react";
import PropTypes from "prop-types";

import { H1 } from "components/atoms";

import UnderwriterFlowContent from "../../underwriter_flow/underwriter_flow_content";
import OriginationChecklistContent from "../../origination_checklist/origination_checklist_content";

function OriginationChecklistReadOnly({ further }) {
  return (
    <>
      <OriginationChecklistContent further={further} readOnlyView={true} />
    </>
  );
}

OriginationChecklistReadOnly.propTypes = {
  further: PropTypes.object.isRequired,
};

function UnderwriterFlowReadOnly({ further }) {
  return (
    <>
      <UnderwriterFlowContent further={further} readOnlyView={true} />
    </>
  );
}

UnderwriterFlowReadOnly.propTypes = {
  further: PropTypes.object.isRequired,
};

function ReadOnlyViewContent({ further }) {
  return (
    <>
      <H1>Read only view</H1>
      <OriginationChecklistReadOnly further={further} />
      <UnderwriterFlowReadOnly further={further} />
    </>
  );
}

ReadOnlyViewContent.propTypes = {
  further: PropTypes.object.isRequired,
};

export default ReadOnlyViewContent;
