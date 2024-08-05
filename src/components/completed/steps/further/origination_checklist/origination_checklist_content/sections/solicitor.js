import React from "react";
import PropTypes from "prop-types";
import { Field, Form } from "react-final-form";

import { Button, TextAreaInput } from "components/atoms";

import ChecklistRow from "../checklist_row";

function SolicitorSection({ further, readOnlyView = false }) {
  return (
    <ChecklistRow
      section="solicitor"
      description="Matches UW drawdown request template & noted within the body of
        the funds request email"
      further={further}
      render={({ savingRequest, sectionData }) => {
        return (
          <Form
            onSubmit={(values) => savingRequest("comments", values)}
            initialValues={sectionData}
            render={({ handleSubmit }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Field
                    component={TextAreaInput}
                    name="Comments"
                    label="Comments"
                    validate={(val) => !val}
                    disabled={readOnlyView}
                  />
                  {!readOnlyView && <Button>Save</Button>}
                </form>
              );
            }}
          />
        );
      }}
    />
  );
}

SolicitorSection.propTypes = {
  further: PropTypes.object.isRequired,
  readOnlyView: PropTypes.bool,
};

export default SolicitorSection;
