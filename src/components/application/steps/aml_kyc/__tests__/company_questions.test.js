import React from "react";
import { Form } from "react-final-form";
import { fireEvent, act, render } from "@testing-library/react";

import CorporateDependantQuestions, {
  source_of_funds_confirmed,
  certificate_of_incorporation,
  list_of_shareholders,
  partner_verified_as_individual,
  law_society_membership_confirmed,
  icaew_membership_confirmed,
  person_with_control_verified_as_individual,
  evidence_of_authority_to_act_for_firm,
  verification_company_is_subsidiary,
  verified_as_individual,
} from "../aml_kyc_home_screen/panels/company_panel/corporate_dependant_questions";

const getComponent = (corporateStructure) => {
  const mockedSubmit = jest.fn(() => {});

  const component = render(
    <Form
      onSubmit={mockedSubmit}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <CorporateDependantQuestions
              corporate_structure={corporateStructure}
            />
            <button type="submit"></button> {/* eslint-disable-line */}
          </form>
        );
      }}
    />
  );

  const saveButton = component.container.querySelector("button[type=submit]");

  return { ...component, saveButton, mockedSubmit };
};

const testComponent = ({ prop, questions = [] }) => {
  const { getByLabelText, saveButton, mockedSubmit } = getComponent(prop);

  const questionElements = questions.map((question) => {
    return getByLabelText(new RegExp(question.label));
  });

  act(() => {
    questionElements.forEach((element) => {
      fireEvent.change(element, {
        target: {
          value: true,
        },
      });
    });
    fireEvent.click(saveButton);
  });

  const outputData = questions.reduce((acc, question) => {
    return {
      ...acc,
      [question.name]: expect.objectContaining({ innerValue: true }),
    };
  }, {});

  expect(mockedSubmit).toHaveBeenCalledTimes(1);
  expect(mockedSubmit).toHaveBeenCalledWith(
    outputData,
    expect.any(Object),
    expect.any(Function)
  );
};

describe("AmlKyc - CompanyQuestions", () => {
  it("questions in case: subsidiary of public registered company", () => {
    testComponent({
      prop: "subsidiary of public registered company",
      questions: [
        verification_company_is_subsidiary,
        evidence_of_authority_to_act_for_firm,
        verified_as_individual,
      ],
    });
  });

  it("questions in case: public registered company", () => {
    testComponent({
      prop: "public registered company",
      questions: [
        evidence_of_authority_to_act_for_firm,
        verified_as_individual,
      ],
    });
  });

  it("questions in case: partnership / unincorporated business", () => {
    testComponent({
      prop: "partnership / unincorporated business",
      questions: [
        partner_verified_as_individual,
        person_with_control_verified_as_individual,
      ],
    });
  });

  it("questions in case: private company", () => {
    testComponent({
      prop: "private company",
      questions: [
        certificate_of_incorporation,
        list_of_shareholders,
        person_with_control_verified_as_individual,
      ],
    });
  });

  it("questions in case: lawyer", () => {
    testComponent({
      prop: "lawyer",
      questions: [law_society_membership_confirmed],
    });
  });

  it("questions in case: accountant", () => {
    testComponent({
      prop: "accountant",
      questions: [icaew_membership_confirmed],
    });
  });

  it("questions in case: trust", () => {
    testComponent({
      prop: "trust",
      questions: [source_of_funds_confirmed],
    });
  });
});
