import React from "react";
import PropTypes from "prop-types";

import {
  saveOriginationChecklistSectionFurtherDrawdowns,
  updateOriginationChecklistSectionFurtherDrawdowns,
  saveUnderwriterFlowFieldFurtherDrawdowns,
  saveOriginationChecklistFieldFurtherDrawdowns,
} from "utils/requests";

import ViewFurther from "../further/view_further";
import { FurtherContextProvider } from "../further/view_further_context";

const shouldOriginationBeVisible = () => true;
const shouldUnderwriterBeVisible = (furtherDrawdown) =>
  furtherDrawdown.originationChecklist.submitToUnderwriter.Date;

const shouldReadOnlyBeVisible = (further) =>
  further.underwriterFlow?.UnderwriterApprovalDate;

function ViewFurtherDrawdowns({
  furtherDrawdowns = [],
  fetchFurtherDrawdownsAndStore,
}) {
  return (
    <FurtherContextProvider
      fetchFurtherAndStore={fetchFurtherDrawdownsAndStore}
      saveOriginationChecklistSection={
        saveOriginationChecklistSectionFurtherDrawdowns
      }
      updateOriginationChecklistSection={
        updateOriginationChecklistSectionFurtherDrawdowns
      }
      saveOriginationChecklistField={
        saveOriginationChecklistFieldFurtherDrawdowns
      }
      saveUnderwriterFlowField={saveUnderwriterFlowFieldFurtherDrawdowns}
      furtherIdKey="FurtherDrawdownId"
      shouldOriginationBeVisible={shouldOriginationBeVisible}
      shouldUnderwriterBeVisible={shouldUnderwriterBeVisible}
      shouldReadOnlyBeVisible={shouldReadOnlyBeVisible}
    >
      <ViewFurther further={furtherDrawdowns} />
    </FurtherContextProvider>
  );
}

ViewFurtherDrawdowns.propTypes = {
  furtherDrawdowns: PropTypes.array,
  fetchFurtherDrawdownsAndStore: PropTypes.func.isRequired,
};

export default ViewFurtherDrawdowns;
