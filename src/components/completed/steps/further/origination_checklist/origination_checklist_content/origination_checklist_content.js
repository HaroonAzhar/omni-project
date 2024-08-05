import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { H2 } from "components/atoms";

import {
  CreditSafeSection,
  DrawDownRequestSection,
  SolicitorSection,
  LandChargesSection,
  LandRegistrySection,
  AMLSection,
  ExperianSection,
  ReinspectionValuationSection,
  InsuranceSection,
  DocumentsSection,
} from "./sections";
import ChecklistActions from "./checklist_actions";
import ChecklistHeader from "./checklist_header";

function OriginationChecklistContent({ further, readOnlyView = false }) {
  const { individuals = [] } = useSelector((state) => state.application);

  const securities = useSelector((state) => state.securities) ?? [];
  return (
    <>
      <H2>Origination Checklist</H2>
      <ChecklistHeader />
      <SolicitorSection further={further} readOnlyView={readOnlyView} />
      <DrawDownRequestSection
        further={further}
        individuals={individuals}
        readOnlyView={readOnlyView}
      />
      <CreditSafeSection further={further} readOnlyView={readOnlyView} />
      <LandChargesSection
        further={further}
        individuals={individuals}
        readOnlyView={readOnlyView}
      />
      <LandRegistrySection
        further={further}
        securities={securities}
        readOnlyView={readOnlyView}
      />
      <AMLSection further={further} />
      <ExperianSection further={further} />
      <ReinspectionValuationSection
        further={further}
        readOnlyView={readOnlyView}
      />
      <InsuranceSection further={further} />
      <DocumentsSection further={further} />

      <ChecklistActions further={further} readOnlyView={readOnlyView} />
    </>
  );
}

OriginationChecklistContent.propTypes = {
  further: PropTypes.object.isRequired,
  readOnlyView: PropTypes.bool,
};

export default OriginationChecklistContent;
