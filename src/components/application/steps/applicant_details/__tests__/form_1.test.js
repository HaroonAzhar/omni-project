import MockAdapter from "axios-mock-adapter";

import { getComponentWithRedux } from "test_helpers";
import { apiAxiosInstance } from "utils/requests/api";
import { ADMIN_RECORDS } from "utils/urls";

import Form1 from "../forms/form_1";

const mock = new MockAdapter(apiAxiosInstance);

describe("Applicant details Form1", () => {
  const renderWithRedux = (application) =>
    getComponentWithRedux(
      Form1,
      {
        finalizeStep: () => {},
        goStepBack: () => {},
      },
      {
        application,
      }
    );

  it("Forename and surname are disabled for individual", () => {
    const individualEndpoint = jest.fn(() => [200, { data: [] }]);
    mock.onGet(ADMIN_RECORDS("contacts")).reply(individualEndpoint);

    const { getByLabelText } = renderWithRedux({
      type_of_applicant: "individual",
    });

    const forename = getByLabelText(/Forename/i);
    const surname = getByLabelText(/Surname/i);

    expect(forename.disabled).toBe(true);
    expect(surname.disabled).toBe(true);
  });

  it("Forename and surname are disabled for company", () => {
    const { getByLabelText } = renderWithRedux({
      type_of_applicant: "company",
    });

    const forename = getByLabelText(/Forename/i);
    const surname = getByLabelText(/Surname/i);

    expect(forename.disabled).toBe(true);
    expect(surname.disabled).toBe(true);
  });
});
