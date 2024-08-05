import "mutationobserver-shim";
import MockAdapter from "axios-mock-adapter";

import { apiAxiosInstance } from "utils/requests/api";
import getComponentWithRedux from "test_helpers/get_component_with_redux";

import CaseOverview from ".";

global.document.getSelection = jest.fn();

describe("<CaseOverview>", () => {
  const mockedAxios = new MockAdapter(apiAxiosInstance);

  beforeAll(() => {
    mockedAxios.onGet(/.*/).reply(() => {
      return [200, { data: [] }];
    });
  });
  it("Test if default text is inserted into Executive summary", () => {
    const { getByText } = getComponentWithRedux(
      CaseOverview,
      {},
      {
        application: {},
        calculator: {},
      }
    );

    const textBorrower = getByText(/Borrower:/i);

    expect(textBorrower).toBeDefined();
  });

  it("Test if default text is not inserted into Executive summary when there is an entry in the Redux store", () => {
    const { queryByText } = getComponentWithRedux(
      CaseOverview,
      {},
      {
        application: {
          summary: {
            overview: {
              executive_summary: "Some text goes in here",
            },
          },
        },
        calculator: {},
      }
    );

    const textBorrower = queryByText(/Borrower:/i);

    expect(textBorrower).toBeNull();
  });

  afterAll(() => {
    mockedAxios.restore();
  });
});
