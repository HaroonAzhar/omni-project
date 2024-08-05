import React from "react";
import { wait, fireEvent, act, render } from "@testing-library/react";
import { Form } from "react-final-form";

import { POSTCODER_URL } from "utils/urls";
import { searchAndClickSelectedAddress } from "test_helpers";
import postcoderResponse from "test_helpers/mocks/responses/postcoder_response.json";
import { mockPostcoder } from "test_helpers/mocks";

import AddressWithLookup from "..";

const { REACT_APP_POSTCODER_API_KEY } = process.env;

const renderComponent = (onPlaceSelected) =>
  render(
    <Form
      onSubmit={() => {}}
      render={({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit}>
          <AddressWithLookup
            onPlaceSelected={onPlaceSelected}
            form={form}
            prefix="foo"
          />
        </form>
      )}
    />
  );

describe("AddressWithLookup", () => {
  const getPostcoderAddress = jest.fn(() => {});

  beforeAll(() => mockPostcoder({ getPostcoderAddress }));

  const addressToSearch = "NR14 7PZ";

  it("sends request after clicking search", async () => {
    const { getByLabelText, getByText } = renderComponent();
    const searchInput = getByLabelText(/Search address/i);
    const searchButton = getByText(/Find address/i);

    act(() => {
      fireEvent.change(searchInput, { target: { value: addressToSearch } });
    });

    act(() => {
      fireEvent.click(searchButton);
    });

    await wait(() => {
      expect(getPostcoderAddress).toBeCalled();
    });
  });

  it("sends request after clicking search with search term", async () => {
    const { getByLabelText, getByText } = renderComponent();
    const searchInput = getByLabelText(/Search address/i);
    const searchButton = getByText(/Find address/i);

    const differentAddress = "foo";
    const expectedURL = `${POSTCODER_URL}/${REACT_APP_POSTCODER_API_KEY}/address/UK/${encodeURIComponent(
      differentAddress
    )}?format=json&lines=2`;

    act(() => {
      fireEvent.change(searchInput, { target: { value: differentAddress } });
    });

    act(() => {
      fireEvent.click(searchButton);
    });

    await wait(() => {
      expect(getPostcoderAddress).toBeCalledWith(
        expect.objectContaining({ url: expectedURL })
      );
    });
  });

  it("shows table with results", async () => {
    const { getByLabelText, getByText, getByRole } = renderComponent();
    const searchInput = getByLabelText(/Search address/i);
    const searchButton = getByText(/Find address/i);

    act(() => {
      fireEvent.change(searchInput, { target: { value: addressToSearch } });
    });

    act(() => {
      fireEvent.click(searchButton);
    });

    await wait(() => {
      getByRole("table");
    });
  });

  it("shows table correct number of rows in table", async () => {
    const { getByLabelText, getByText, getAllByRole } = renderComponent();
    const searchInput = getByLabelText(/Search address/i);
    const searchButton = getByText(/Find address/i);
    const expectedNoRows = 5;

    act(() => {
      fireEvent.change(searchInput, { target: { value: addressToSearch } });
    });

    act(() => {
      fireEvent.click(searchButton);
    });

    await wait(() => {
      const rows = getAllByRole("row");
      expect(rows.length).toBe(expectedNoRows);
    });

    expect(getByText(/1\/6/i)).toBeDefined();
  });

  it("saves correct results", async () => {
    const onPlaceSelectedMock = jest.fn(() => {});
    const { getByLabelText, getByText } = renderComponent(onPlaceSelectedMock);

    const address = postcoderResponse[0];
    const expectedAddress = {
      line_1: address.addressline1,
      line_2: address.addressline2,
      town_city: address.posttown,
      postcode: address.postcode,
      country: "united kingdom",
    };

    await searchAndClickSelectedAddress(getByText, getByLabelText);

    await wait(() => {
      expect(onPlaceSelectedMock).toBeCalledWith(expectedAddress);
    });
  });
});
