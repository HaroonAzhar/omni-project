import { wait, fireEvent, act } from "@testing-library/react";

import { getComponentWithRedux, setupGoogleApiMock } from "test_helpers";
import { mockCH, mockApplicants } from "test_helpers/mocks";

import CompanyDetails from "../index";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({
    id: "6da2ead2-c3d8-48e8-994c-07370d95e9de",
    indexOfForm: 3,
  }),
}));

describe("CompanyDetailsRequests", () => {
  const getApplicantCalled = jest.fn(() => {});
  const getApplicationCalled = jest.fn(() => {});
  const saveCalled = jest.fn(() => {});

  const chDetailsCalled = jest.fn(() => {});
  const chOfficersCalled = jest.fn(() => {});

  const company_number = "08503849";

  beforeAll(() => {
    setupGoogleApiMock();
    mockCH({ chDetailsCalled, chOfficersCalled });
    mockApplicants({ getApplicantCalled, getApplicationCalled, saveCalled });
  });

  it("sends requests", async () => {
    getComponentWithRedux(CompanyDetails, null, {
      application: { company_number },
    });

    await wait(() => {
      expect(getApplicantCalled).toBeCalled();
      expect(getApplicationCalled).toBeCalled();
      expect(chDetailsCalled).toBeCalled();
      expect(chOfficersCalled).toBeCalled();
    });
  });

  it("saves data", async () => {
    const { getByText } = getComponentWithRedux(CompanyDetails, null, {
      application: { company_number },
    });

    await wait(() => {
      expect(getApplicantCalled).toBeCalled();
      expect(getApplicationCalled).toBeCalled();
      expect(chDetailsCalled).toBeCalled();
      expect(chOfficersCalled).toBeCalled();
    });

    const saveButton = getByText(/Continue/i);

    act(() => {
      fireEvent.click(saveButton);
    });

    await wait(() => {
      expect(saveCalled).toBeCalled();
    });
  });
});
