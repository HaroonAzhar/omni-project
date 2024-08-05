import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { useHistory, useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { OnChange, OnBlur } from "react-final-form-listeners";

import {
  Button,
  Checkbox,
  Fieldset,
  H1,
  IntegerField,
  PercentField,
  PriceField,
  SelectInput,
  TextAreaInput,
  TextInput,
  H2,
} from "components/atoms";
import { Broker, Originator } from "components/admin/exported_components";
import {
  formValidation,
  humanizedStringListAsSelectOptions,
  useRequestWithProgressToastRollbar,
} from "utils";
import { createCase, createEnquiry, getEnquiry } from "utils/requests";
import { CaseTags } from "components/molecules";

import {
  EnquiryContainer,
  EnquiryFormContainer,
  TitleWrapper,
  CheckboxWrapper,
  EnquiryButton,
} from "./styled_enquiry_flow";
import validationSchema from "./enquiry_validation_schema";
import EnquiryActions from "./enquiry_actions/enquiry_actions";
import Result from "./result";
import defaultValues from "./default_values";
import useEnquiryCalculatorRequest from "./use_enquiry_calculator_request";

const propertyTypeOptions = ["residential", "commercial", "land"];
const interestTypes = ["retained", "serviced", "rolled_up"];

const EnquiryFlow = () => {
  const { id } = useParams();
  const [enquiry, setEnquiry] = useState({});
  const history = useHistory();

  const caseNr = enquiry?.CaseNr;
  const status = enquiry?.Status;

  const enquiryTitle = caseNr ? `Enquiry ${caseNr}` : "New Enquiry";

  const initialRequest = useRequestWithProgressToastRollbar(getEnquiry);
  useEffect(() => {
    if (id) {
      initialRequest(id).then((response) => setEnquiry(response?.data));
    }
  }, [initialRequest, id]);

  const initialValue = {
    ...defaultValues,
    ...enquiry,
    originator: enquiry?.FkOriginatorId,
  };

  const savingRequest = useRequestWithProgressToastRollbar(createEnquiry);
  const createCaseRequest = useRequestWithProgressToastRollbar(createCase);
  const submit = (values) => {
    if (id) {
      savingRequest(id, values);
    } else {
      createCaseRequest().then(({ data: caseData }) => {
        savingRequest(caseData.id, values).then(() => {
          history.push(`enquiry/${caseData.id}`);
        });
      });
    }
  };

  const { sendRequest, response } = useEnquiryCalculatorRequest();

  const validate = async (values) => formValidation(validationSchema, values);

  return (
    <EnquiryContainer>
      <TitleWrapper>
        <H1>{enquiryTitle}</H1>
        <EnquiryActions status={status} enquiry={enquiry} />
      </TitleWrapper>
      {caseNr && <CaseTags />}
      <EnquiryFormContainer>
        <Form
          onSubmit={submit}
          initialValues={initialValue}
          validate={validate}
          render={({ handleSubmit, form, values, pristine }) => (
            <form onSubmit={handleSubmit}>
              <OnChange>{sendRequest}</OnChange>
              <Grid container spacing={2}>
                <Grid item md={3} xs={12} sm={6}>
                  <Field
                    name="EnquiryName"
                    label="Enquiry Name/Reference"
                    component={TextInput}
                    type="text"
                  />
                  <Broker
                    formChange={form.change}
                    values={values}
                    pristine={pristine}
                  />
                  <Originator />
                </Grid>

                <Grid item xs={12} md={3} sm={6}>
                  <PriceField
                    name="EstimatedSecurityValue"
                    label="Estimated Security Value"
                  />

                  <PercentField name="MaximumLtv" label="Maximum LTV" />

                  <IntegerField
                    name="LoanPeriod"
                    label="Loan Period (Months)"
                  />

                  <Field
                    name="InterestType"
                    label="Interest Type"
                    component={SelectInput}
                    type="text"
                    options={humanizedStringListAsSelectOptions(interestTypes)}
                  />
                </Grid>

                <Grid item xs={12} md={3} sm={6}>
                  <Fieldset title="Net Loan Amount">
                    <CheckboxWrapper>
                      <Field
                        component={Checkbox}
                        type="checkbox"
                        name="CalculateMaxFromSecurity"
                        label="Calculate Max From Security"
                      />
                      <OnChange name="CalculateMaxFromSecurity">
                        {() => form.change("NetLoanAmount", undefined)}
                      </OnChange>
                    </CheckboxWrapper>
                    <PriceField
                      label=""
                      name="NetLoanAmount"
                      disabled={values.CalculateMaxFromSecurity}
                    />
                  </Fieldset>
                  <PriceField name="Gdv" label="GDV (if applicable)" />

                  <PercentField
                    name="MaximumGdltv"
                    label="Maximum LTGDV (if applicable)"
                  />
                  <IntegerField
                    name="BuildPeriod"
                    label="Build Period"
                    disabled={values.InterestType !== "rolled_up"}
                  />
                  <OnBlur name="BuildPeriod">
                    {() => {
                      if (values.BuildPeriod > 0) {
                        return;
                      }
                      form.change("FurtherDrawdownsAmount", undefined);
                    }}
                  </OnBlur>
                  <PriceField
                    name="FurtherDrawdownsAmount"
                    label="Further Drawdowns Amount"
                    disabled={values.BuildPeriod === 0}
                  />
                </Grid>

                <Grid item xs={12} md={3} sm={6}>
                  <PercentField name="InterestRate" label="Interest Rate" />
                  <PercentField
                    name="ArrangementFeeTotal"
                    label="Arrangement Fee (Total)"
                  />
                  <PercentField
                    name="ArrangementFeeBroker"
                    label="Arrangement Fee (Broker)"
                  />
                  <PriceField name="OtherFees" label="Other Fees" />
                </Grid>

                <Grid item xs={12}>
                  <Result calculatorResponse={response} values={values} />
                  <H2>Additional Details</H2>
                </Grid>

                <Grid item xs={12} md={3} sm={6}>
                  <Field
                    name="PropertyLocation"
                    label="Property Location"
                    component={TextInput}
                    type="text"
                  />
                  <Field
                    name="PropertyType"
                    label="Property Type"
                    component={SelectInput}
                    options={humanizedStringListAsSelectOptions(
                      propertyTypeOptions
                    )}
                    type="text"
                  />
                </Grid>
                <Grid item xs={9}>
                  <Field
                    name="Notes"
                    label="Notes"
                    component={TextAreaInput}
                    type="text"
                  />
                </Grid>
                <Grid item xs={9} />
                <Grid item xs={3}>
                  <EnquiryButton>
                    <Button type="button" onClick={() => form.submit()}>
                      Save
                    </Button>
                  </EnquiryButton>
                </Grid>
              </Grid>
            </form>
          )}
        />
      </EnquiryFormContainer>
    </EnquiryContainer>
  );
};

export default EnquiryFlow;
