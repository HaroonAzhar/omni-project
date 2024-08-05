import React from "react";
import PropTypes from "prop-types";

import ChecklistRow from "../checklist_row";
import SectionCheckbox from "../section_checkbox";

function CreditSafeSection({ further, readOnlyView = false }) {
  return (
    <ChecklistRow
      section="creditSafe"
      further={further}
      render={({ savingRequest, sectionData }) => {
        return (
          <>
            <SectionCheckbox
              field="NameMatchesOfferLetter"
              label="Name matches Offer letter"
              savingRequest={savingRequest}
              sectionData={sectionData}
              readOnlyView={readOnlyView}
            />
            <SectionCheckbox
              field="EnsureNoCCJ"
              label="Ensure no CCJ"
              savingRequest={savingRequest}
              sectionData={sectionData}
              readOnlyView={readOnlyView}
            />

            <SectionCheckbox
              field="DirectorsListedTheSame"
              label="Directors listed are the same as those who signed the draw down request form"
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

CreditSafeSection.propTypes = {
  further: PropTypes.object.isRequired,
  readOnlyView: PropTypes.bool,
};

export default CreditSafeSection;
