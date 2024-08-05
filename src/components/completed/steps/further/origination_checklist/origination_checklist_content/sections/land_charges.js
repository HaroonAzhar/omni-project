import React from "react";
import PropTypes from "prop-types";
import { Field, Form } from "react-final-form";

import { Button, SelectInput } from "components/atoms";

import {
  LandChargesWrapper,
  ResultsWrapper,
} from "../styled_origination_checklist";
import ChecklistRow from "../checklist_row";

function LandChargesSection({ further, individuals, readOnlyView = false }) {
  return (
    <ChecklistRow
      section="landCharges"
      description="Search (Bankruptcy)"
      further={further}
      render={({ savingRequest, sectionData, updatingRequest }) => {
        return (
          <ResultsWrapper>
            {individuals.map((individual) => {
              const [matchingExistingFull] = sectionData.results.filter(
                ({ Forename, Surname, MiddleName }) =>
                  individual.Forename === Forename &&
                  individual.Surname === Surname &&
                  individual.MiddleName === MiddleName
              );
              const [matchingExistingPartial] = sectionData.results.filter(
                ({ Forename, Surname, MiddleName }) =>
                  individual.Forename === Forename &&
                  individual.Surname === Surname &&
                  MiddleName === undefined
              );
              const name = [individual.Forename, individual.Surname]
                .filter(Boolean)
                .join(" ");

              const fullName = [
                individual.Forename,
                individual.MiddleName,
                individual.Surname,
              ]
                .filter(Boolean)
                .join(" ");

              const options = [
                { value: undefined, label: "Choose one" },
                ...["Clear", "Prior to Completion", "Fail"].map((status) => ({
                  value: status,
                  label: status,
                })),
              ];
              return (
                <LandChargesWrapper>
                  <Form
                    onSubmit={(values) =>
                      matchingExistingPartial === undefined
                        ? savingRequest(`results`, values)
                        : updatingRequest(`results`, values)
                    }
                    initialValues={{
                      Forename: individual.Forename,
                      Surname: individual.Surname,
                      Result: matchingExistingPartial?.Result,
                      OriginationChecklistLandChargesResultsId:
                        matchingExistingPartial?.OriginationChecklistLandChargesResultsId,
                    }}
                    render={({ handleSubmit }) => {
                      return (
                        <form onSubmit={handleSubmit}>
                          <Field
                            component={SelectInput}
                            name="Result"
                            label={name}
                            validate={(val) => !val}
                            options={options}
                            disabled={readOnlyView}
                          />
                          {!readOnlyView && <Button>Save</Button>}
                        </form>
                      );
                    }}
                  />

                  {individual.MiddleName && (
                    <Form
                      onSubmit={(values) =>
                        matchingExistingFull === undefined
                          ? savingRequest(`results`, values)
                          : updatingRequest(`results`, values)
                      }
                      initialValues={{
                        Forename: individual.Forename,
                        Surname: individual.Surname,
                        MiddleName: individual.MiddleName,
                        ...matchingExistingFull,
                      }}
                      render={({ handleSubmit }) => {
                        return (
                          <form onSubmit={handleSubmit}>
                            <Field
                              component={SelectInput}
                              name="Result"
                              label={fullName}
                              validate={(val) => !val}
                              options={options}
                              disabled={readOnlyView}
                            />
                            {!readOnlyView && <Button>Save</Button>}
                          </form>
                        );
                      }}
                    />
                  )}
                </LandChargesWrapper>
              );
            })}
          </ResultsWrapper>
        );
      }}
    />
  );
}

LandChargesSection.propTypes = {
  further: PropTypes.object.isRequired,
  individuals: PropTypes.array.isRequired,
  readOnlyView: PropTypes.bool,
};

export default LandChargesSection;
