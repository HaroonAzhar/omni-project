import React from "react";
import { Form } from "react-final-form";
import { act, fireEvent, wait } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";

import { apiAxiosInstance } from "utils/requests/api";
import { APPLICANT_OF_CASE } from "utils/urls";
import { getComponentWithRedux } from "test_helpers";

import individualsResponse from "../../__tests__/individuals_response";
import ContactDetails from "../index";
import getInputElements from "../../__tests__/get_contact_details_inputs";

const mock = new MockAdapter(apiAxiosInstance);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({ id: 123 }),
}));

const getContactDetails = (
  props = {
    title: "test",
    contactFor: "test2",
  },
  applicationStore = { type_of_introducer: "via_broker" }
) => {
  /* eslint-disable react/jsx-props-no-spreading, react/jsx-closing-tag-location */
  const component = () => (
    <Form
      onSubmit={() => {}}
      render={({ form }) => <ContactDetails form={form} {...props} />}
    ></Form>
  );
  /* eslint-enable react/jsx-props-no-spreading, react/jsx-closing-tag-location */

  return getComponentWithRedux(component, props, {
    application: applicationStore,
  });
};

describe("<ContactDetails>", () => {
  it("Renders needed elements", () => {
    const individualEndpoint = jest.fn(() => [200, individualsResponse]);
    mock.onGet(APPLICANT_OF_CASE(123)).reply(individualEndpoint);

    const { getByLabelText } = getContactDetails();

    getByLabelText(/Select contact/);
    getByLabelText(/Name/);
    getByLabelText(/Email/);
    getByLabelText(/Phone/);
  });

  it("Select element has a proper initial options without individual", () => {
    const { container } = getContactDetails();

    const individualEndpoint = jest.fn(() => [200, individualsResponse]);
    mock.onGet(APPLICANT_OF_CASE(123)).reply(individualEndpoint);

    const options = container.querySelectorAll("option");
    const optionValues = [...options].map((el) => el.value);

    expect(optionValues).toEqual(["manual", "introducer"]);
  });

  it("Select element has a proper options with individuals", async () => {
    const { container } = getContactDetails();

    const individualEndpoint = jest.fn(() => [200, individualsResponse]);
    mock.onGet(APPLICANT_OF_CASE(123)).reply(individualEndpoint);

    await wait(() => {
      const options = container.querySelectorAll("option");
      const optionValues = [...options].map((el) => el.value);
      const optionLabels = [...options].map((el) => el.innerHTML);

      expect(optionLabels).toEqual([
        "Manual",
        "forename a surname a",
        "forename b surname b",
        "Introducer/Broker",
      ]);

      expect(optionValues).toEqual(["manual", "1", "2", "introducer"]);
    });
  });

  it("Select element has a proper options without introducer", async () => {
    const { container } = getContactDetails(undefined, {});

    const individualEndpoint = jest.fn(() => [200, individualsResponse]);
    mock.onGet(APPLICANT_OF_CASE(123)).reply(individualEndpoint);

    await wait(() => {
      const options = container.querySelectorAll("option");
      const optionValues = [...options].map((el) => el.value);
      const optionLabels = [...options].map((el) => el.innerHTML);

      expect(optionLabels).toEqual([
        "Manual",
        "forename a surname a",
        "forename b surname b",
      ]);

      expect(optionValues).toEqual(["manual", "1", "2"]);
    });
  });

  it("Individual selection shows contact data in the inputs", async () => {
    const individualEndpoint = jest.fn(() => [200, individualsResponse]);

    mock.onGet(APPLICANT_OF_CASE(123)).reply(individualEndpoint);

    const { getByLabelText, container } = getContactDetails();

    await wait(() => expect(individualEndpoint).toHaveBeenCalledTimes(1));

    const selectContactElement = getByLabelText(/Select contact/);

    act(() => {
      fireEvent.change(selectContactElement, {
        target: { value: "1" },
      });
    });

    const { nameElement, emailElement, phoneElement } = getInputElements(
      container
    );

    expect(nameElement.value).toBe("forename a surname a");
    expect(emailElement.value).toBe("email@test.com");
    expect(phoneElement.value).toBe("+333 333 333");

    expect(nameElement.disabled).toBe(true);
    expect(emailElement.disabled).toBe(true);
    expect(phoneElement.disabled).toBe(true);
  });

  it("Manual selection contact data can be edited", async () => {
    const individualEndpoint = jest.fn(() => [200, individualsResponse]);

    mock.onGet(APPLICANT_OF_CASE(123)).reply(individualEndpoint);

    const { getByLabelText, container } = getContactDetails();

    await wait(() => expect(individualEndpoint).toHaveBeenCalledTimes(1));

    const selectContactElement = getByLabelText(/Select contact/);

    act(() => {
      fireEvent.change(selectContactElement, {
        target: { value: "1" },
      });
    });

    const { nameElement, emailElement, phoneElement } = getInputElements(
      container
    );
    expect(nameElement.disabled).toBe(true);
    expect(emailElement.disabled).toBe(true);
    expect(phoneElement.disabled).toBe(true);

    act(() => {
      fireEvent.change(selectContactElement, {
        target: { value: "0" },
      });
    });

    expect(nameElement.disabled).toBe(false);
    expect(emailElement.disabled).toBe(false);
    expect(phoneElement.disabled).toBe(false);
  });
});
