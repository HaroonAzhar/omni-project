import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { Form } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

import { Button } from "components/atoms";
import useSaveFormOnChangePath from "components/molecules/text_editor/use_save_form_on_change_path";
import { updateRiskAndMitigationState } from "store/application/actions";
import { getRiskInputsOfRiskAndMitigation } from "components/case_summary/selectors";

import fixRiskListRedundantRerender from "./fix_risk_list_redundant_rerender";
import { useSubmitCaseSummary } from "../shared";
import RiskAndMitigationInputs from "./risk_inputs";

const noop = () => {};

const SaveFormOnChangePath = ({ values, isFormPristine }) => {
  const dispatch = useDispatch();
  const submit = useSubmitCaseSummary();

  const submitRisk = ({ risk_inputs = [] }) => {
    const riskInputs = risk_inputs.filter(
      // Don't save empty risk and mitigations
      ({ risk, mitigation }) => risk || mitigation
    );

    dispatch(updateRiskAndMitigationState(riskInputs));

    submit("risk_mitigations", { risk_inputs: riskInputs });
  };

  useSaveFormOnChangePath({
    shouldSave: !isFormPristine,
    data: values,
    onSubmit: submitRisk,
  });

  return null;
};

const RiskList = () => {
  const { riskInputsValuesCache, toastBugFix } = fixRiskListRedundantRerender();

  const risk_inputs = useSelector(getRiskInputsOfRiskAndMitigation);

  return (
    <Form
      onSubmit={noop}
      initialValues={{
        risk_inputs: riskInputsValuesCache || [...risk_inputs, {}],
      }}
      mutators={{ ...arrayMutators }}
      render={({ form, handleSubmit, values, pristine }) => (
        <form onSubmit={handleSubmit}>
          <FieldArray name="risk_inputs">
            {({ fields }) =>
              fields.map((name, index) => (
                <RiskAndMitigationInputs
                  name={name}
                  removeRisk={() => form.mutators.remove("risk_inputs", index)}
                />
              ))
            }
          </FieldArray>
          <OnChange name="risk_inputs">
            {(riskInputsValues) => toastBugFix(pristine, riskInputsValues)}
          </OnChange>

          <Button
            kind="extra"
            onClick={(e) => {
              e.preventDefault();
              form.mutators.push("risk_inputs", {});
            }}
          >
            + Add another risk
          </Button>

          <SaveFormOnChangePath
            values={values}
            isFormPristine={pristine && !riskInputsValuesCache}
          />
        </form>
      )}
    />
  );
};

export default RiskList;
