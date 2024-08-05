import React from "react";
import PropTypes from "prop-types";

import ChecklistRow from "../checklist_row";
import SectionCheckbox from "../section_checkbox";

function ReinspectionValuationSection({ further, readOnlyView = false }) {
  return (
    <ChecklistRow
      section="reinspectionValuation"
      further={further}
      render={({ savingRequest, sectionData }) => {
        return (
          <>
            <SectionCheckbox
              field="ValuerOnApproved"
              label="Valuer on approved panel"
              savingRequest={savingRequest}
              sectionData={sectionData}
              readOnlyView={readOnlyView}
            />
            <SectionCheckbox
              field="SignedAndDated"
              label="Signed and Dated"
              savingRequest={savingRequest}
              sectionData={sectionData}
              readOnlyView={readOnlyView}
            />

            <SectionCheckbox
              field="AddressedToCorrect"
              label="Addressed to correct entity"
              savingRequest={savingRequest}
              sectionData={sectionData}
              readOnlyView={readOnlyView}
            />

            <SectionCheckbox
              field="Within3Months"
              label="Within 3 months of the report or 4 months from the inspection"
              savingRequest={savingRequest}
              sectionData={sectionData}
              readOnlyView={readOnlyView}
            />

            <SectionCheckbox
              field="AddressMatches"
              label="Address matches the facility letter"
              savingRequest={savingRequest}
              sectionData={sectionData}
              readOnlyView={readOnlyView}
            />
          </>
        );
      }}
    />
  );
}

ReinspectionValuationSection.propTypes = {
  further: PropTypes.object.isRequired,
  readOnlyView: PropTypes.bool,
};

export default ReinspectionValuationSection;
