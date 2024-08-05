import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";
import { useSelector } from "react-redux";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";

import { Button, Fieldset } from "components/atoms";
import {
  StyledButtonsContainer,
  StyledMainFormContent,
} from "components/dip_forms_steps/styled_dip_steps";
import { getIndividualTitleWithMiddleName } from "utils";

import DirectorRow from "./director_row";
import Shareholders from "./shareholders";
import {
  validateShareholders,
  makeTreeFromLinear,
  makeLinearFromTree,
} from "./helpers";
import { getCompany } from "../../../helpers/company_data_selector";
import SectionHeading from "./section_heading";
import mergeIsGuarantor from "./helpers/merge_is_guarantor";

const MAIN = "main";

const selectOptions = (individuals) => {
  return [
    { label: "Choose from Individuals", value: {} },
    ...(individuals?.map((individual) => {
      const name = getIndividualTitleWithMiddleName(individual);
      return {
        label: name,
        value: individual.fk_shared_contact_id.toString(),
      };
    }) ?? []),
  ];
};

const Form1 = ({ finalizeStep, goStepBack }) => {
  const { directors, shared_holders, base_data: baseData = {} } = useSelector(
    getCompany
  );
  const { individuals } = useSelector((state) => state.application);

  const individualOptions = selectOptions(individuals);

  const { name: topCompanyName } = baseData;

  const [
    shareholdersInitialDetails,
    shareholdersInitialStructure,
  ] = useMemo(() => {
    return makeLinearFromTree(shared_holders || []);
  }, [shared_holders]);

  const shareholdersStructureState = useState(shareholdersInitialStructure);
  const currentViewState = useState(MAIN);

  useEffect(() => {
    shareholdersStructureState[1](shareholdersInitialStructure);
  }, [shareholdersInitialStructure]); // eslint-disable-line

  const onSubmit = (data) => {
    const [newDirectors, newShareholders] = mergeIsGuarantor(
      data.directors,
      makeTreeFromLinear(data.shared_holders, shareholdersStructureState[0])
    );
    finalizeStep({
      data: {
        directors: newDirectors,
        shared_holders: newShareholders,
        type_of_applicant: "company",
      },
      step_id: "company_details_form",
    });
  };

  const validate = (values) => {
    return {
      ...validateShareholders(values, shareholdersStructureState[0]),
    };
  };

  const initialValues = useMemo(
    () => ({
      directors,
      shared_holders: shareholdersInitialDetails,
    }),
    [directors, shareholdersInitialDetails]
  );

  const isMainView = currentViewState[0] === MAIN;

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      mutators={{ ...arrayMutators }}
      validateOnBlur={true}
      initialValues={initialValues}
      render={({ handleSubmit, submitting, form, values, errors }) => {
        const synchronizeGuarantor = (changedFieldName, value) => {
          const idToFind = form.getFieldState(
            `${changedFieldName}.fk_shared_contact_id`
          )?.value;

          Object.entries(values.shared_holders).forEach(([id, shareholder]) => {
            if (
              shareholder.fk_shared_contact_id &&
              shareholder.fk_shared_contact_id?.toString() ===
                idToFind?.toString()
            ) {
              const shareholderFieldName = `shared_holders.${id}.is_guarantor`;
              form.change(shareholderFieldName, value);
            }
          });

          values.directors.forEach((director, index) => {
            if (
              director.fk_shared_contact_id?.toString() === idToFind?.toString()
            ) {
              const directorFieldName = `directors[${index}].is_guarantor`;
              form.change(directorFieldName, value);
            }
          });
        };
        return (
          <form onSubmit={handleSubmit}>
            <StyledMainFormContent>
              {isMainView && (
                <Fieldset title={<SectionHeading title="Director" />}>
                  <FieldArray name="directors">
                    {({ fields }) => {
                      return fields.map((name, index) => {
                        return (
                          <DirectorRow
                            name={name}
                            index={index}
                            key={name}
                            synchronizeGuarantor={synchronizeGuarantor}
                            onRemove={() =>
                              form.mutators.remove("directors", index)
                            }
                            directorOptions={individualOptions}
                          />
                        );
                      });
                    }}
                  </FieldArray>

                  <Button
                    kind="extra"
                    onClick={(e) => {
                      e.preventDefault();
                      form.mutators.push("directors", {
                        name: "",
                        is_guarantor: true,
                      });
                    }}
                  >
                    + Add another director
                  </Button>
                </Fieldset>
              )}

              <Shareholders
                shareholdersStructureState={shareholdersStructureState}
                currentViewState={currentViewState}
                errors={errors.shared_holders || {}}
                handleSubmit={handleSubmit}
                sharedHoldersDetails={{
                  main: { name: topCompanyName },
                  ...values.shared_holders,
                }}
                sumError={errors.sum}
                synchronizeGuarantor={synchronizeGuarantor}
                individualOptions={individualOptions}
              />
            </StyledMainFormContent>

            {isMainView && (
              <StyledButtonsContainer>
                <Button kind="fade" type="button" onClick={goStepBack}>
                  Back
                </Button>

                <Button type="submit" disabled={submitting}>
                  Continue
                </Button>
              </StyledButtonsContainer>
            )}
          </form>
        );
      }}
    />
  );
};

export default Form1;

Form1.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
