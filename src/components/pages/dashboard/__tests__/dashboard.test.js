import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, act, wait } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";

import { DIP_OF_CASE, CASES } from "utils/urls";
import { apiAxiosInstance } from "utils/requests/api";

import Dashboard from "../index";

const mockedAxios = new MockAdapter(apiAxiosInstance);
const dashboardDummyData = {
  type: "dip_form",
  attributes: {
    dip: [
      {
        applicants: [
          {
            contact_value_id: 2,
            name: "piotr z",
            email: "5iolhh@wp.pl",
            fk_contact_id: 10,
          },
          {
            contact_value_id: 3,
            name: "marek w",
            email: "gds@wp.pl",
            fk_contact_id: 10,
          },
        ],
        case_nr: null,
        date_created: "2020-01-15T08:28:59.760Z",
        gross_amount: 12,
        loan_term: 30,
        status: "pending",
      },
    ],
  },
};
afterAll(() => mockedAxios.restore());

it.skip("<Dashboard>", async () => {
  const id = "123-123-123";
  mockedAxios.onGet(CASES()).replyOnce(200, { data: dashboardDummyData });
  mockedAxios.onPost(CASES()).replyOnce(200, { data: { id } });
  mockedAxios.onPost(DIP_OF_CASE(id)).replyOnce(200, { data: { id } });

  const history = createMemoryHistory();

  const { getByText } = render(
    <Router history={history}>
      <Dashboard />
    </Router>
  );
  const createNewDipButton = getByText(/Create new DIP/i);

  act(() => {
    fireEvent.click(createNewDipButton);
  });
  await wait(() => expect(history.entries[1].pathname).toEqual(`/dip/${id}/0`));
});
