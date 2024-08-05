import React from "react";
import PropTypes from "prop-types";

import {
  saveOriginationChecklistSectionFurtherAdvances,
  updateOriginationChecklistSectionFurtherAdvances,
  saveUnderwriterFlowFieldFurtherAdvances,
  saveOriginationChecklistFieldFurtherAdvances,
} from "utils/requests";

import ViewFurther from "../further/view_further";
import { FurtherContextProvider } from "../further/view_further_context";

const shouldOriginationBeVisible = (further) =>
  further.underwriterFlow?.UnderwriterApprovalDate;
const shouldUnderwriterBeVisible = () => true;

const shouldReadOnlyBeVisible = (further) =>
  further.underwriterFlow?.UnderwriterApprovalDate;

function ViewFurtherAdvances({
  furtherAdvances = [],
  fetchFurtherAdvancesAndStore,
}) {
  return (
    <FurtherContextProvider
      fetchFurtherAndStore={fetchFurtherAdvancesAndStore}
      saveOriginationChecklistSection={
        saveOriginationChecklistSectionFurtherAdvances
      }
      updateOriginationChecklistSection={
        updateOriginationChecklistSectionFurtherAdvances
      }
      saveOriginationChecklistField={
        saveOriginationChecklistFieldFurtherAdvances
      }
      saveUnderwriterFlowField={saveUnderwriterFlowFieldFurtherAdvances}
      furtherIdKey="FurtherAdvanceId"
      shouldOriginationBeVisible={shouldOriginationBeVisible}
      shouldUnderwriterBeVisible={shouldUnderwriterBeVisible}
      shouldReadOnlyBeVisible={shouldReadOnlyBeVisible}
    >
      <ViewFurther further={furtherAdvances} />
    </FurtherContextProvider>
  );
}

ViewFurtherAdvances.propTypes = {
  furtherAdvances: PropTypes.array,
  fetchFurtherAdvancesAndStore: PropTypes.func.isRequired,
};

export default ViewFurtherAdvances;
