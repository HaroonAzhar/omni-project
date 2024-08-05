import React from "react";
import PropTypes from "prop-types";
import { Field, Form } from "react-final-form";
import * as yup from "yup";

import { formValidation, propertyAddressFormat, validationMsg } from "utils";
import { Button, Checkbox } from "components/atoms";
import { mapPropertyAddress } from "components/completed/utils";

import { ResultsWrapper } from "../styled_origination_checklist";
import ChecklistRow from "../checklist_row";

const schema = yup.object().shape({
  OmniNoted: yup.bool().required(validationMsg.required),
  LandRegistrySearchRun: yup.bool().required(validationMsg.required),
  NoOtherCharges: yup.bool().required(validationMsg.required),
});

function LandRegistrySection({ further, securities, readOnlyView = false }) {
  const validate = async (values) => formValidation(schema, values);
  return (
    <ChecklistRow
      section="landRegistry"
      description="Search"
      further={further}
      render={({ savingRequest, sectionData }) => {
        return (
          <ResultsWrapper>
            {securities.map((security) => {
              const [matchingExisting] = sectionData.results.filter(
                ({ FkSecurityId }) => security.SecurityId === FkSecurityId
              );
              const name = propertyAddressFormat({
                address: mapPropertyAddress(security.property),
              });

              return (
                <div>
                  {matchingExisting === undefined ? (
                    <Form
                      onSubmit={(values) => savingRequest(`results`, values)}
                      initialValues={{
                        FkSecurityId: security.SecurityId,
                      }}
                      validate={validate}
                      render={({ handleSubmit }) => {
                        return (
                          <form onSubmit={handleSubmit}>
                            {name}
                            <Field
                              component={Checkbox}
                              name="LandRegistrySearchRun"
                              label="Land Registry Search Run"
                              type="checkbox"
                              disabled={readOnlyView}
                            />

                            <Field
                              component={Checkbox}
                              name="OmniNoted"
                              label="Omni Noted"
                              type="checkbox"
                              disabled={readOnlyView}
                            />
                            <Field
                              component={Checkbox}
                              name="NoOtherCharges"
                              label="No other charges applied"
                              type="checkbox"
                              disabled={readOnlyView}
                            />
                            {!readOnlyView && <Button>Save</Button>}
                          </form>
                        );
                      }}
                    />
                  ) : (
                    [
                      name,
                      matchingExisting.LandRegistrySearchRun &&
                        "Land Registry Search Run",
                      matchingExisting.OmniNoted && "Omni Noted",
                      matchingExisting.NoOtherCharges &&
                        "No other charges applied",
                    ]
                      .filter(Boolean)
                      .map((content) => <div key={content}>{content}</div>)
                  )}
                </div>
              );
            })}
          </ResultsWrapper>
        );
      }}
    />
  );
}

LandRegistrySection.propTypes = {
  further: PropTypes.object.isRequired,
  securities: PropTypes.array.isRequired,

  readOnlyView: PropTypes.bool,
};

export default LandRegistrySection;
