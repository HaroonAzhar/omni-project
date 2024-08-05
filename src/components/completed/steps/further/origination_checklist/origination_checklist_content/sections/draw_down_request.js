import React from "react";
import PropTypes from "prop-types";
import { Field, Form } from "react-final-form";

import { Button, TextAreaInput } from "components/atoms";

import ChecklistRow from "../checklist_row";
import SectionCheckbox from "../section_checkbox";

function DrawDownRequestSection({
  further,
  individuals,
  readOnlyView = false,
}) {
  const facilityLetterSignatories = individuals
    .map(({ Forename, MiddleName, Surname }) =>
      [Forename, MiddleName, Surname].filter(Boolean).join(" ")
    )
    .join(";");
  return (
    <ChecklistRow
      section="drawDownRequest"
      description="Signed as per signed facility letter"
      further={further}
      render={({ savingRequest, sectionData }) => {
        return (
          <>
            <div>Facility Letter Signatories: {facilityLetterSignatories}</div>

            <div>
              {sectionData.Signatories ? (
                <div>
                  Draw Down Request Signatories: {sectionData.Signatories}
                </div>
              ) : (
                <Form
                  onSubmit={(values) => savingRequest("signatories", values)}
                  render={({ handleSubmit }) => {
                    return (
                      <form onSubmit={handleSubmit}>
                        <Field
                          component={TextAreaInput}
                          name="Signatories"
                          label="Draw Down Request Signatories"
                          validate={(val) => !val}
                          disabled={readOnlyView}
                        />
                        {!readOnlyView && <Button>Save</Button>}
                      </form>
                    );
                  }}
                />
              )}
            </div>

            <SectionCheckbox
              field="AmountEnteredMatchesAmount"
              label="Amount matches the amount on the UW template"
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

DrawDownRequestSection.propTypes = {
  further: PropTypes.object.isRequired,
  individuals: PropTypes.array.isRequired,
  readOnlyView: PropTypes.bool,
};

export default DrawDownRequestSection;
