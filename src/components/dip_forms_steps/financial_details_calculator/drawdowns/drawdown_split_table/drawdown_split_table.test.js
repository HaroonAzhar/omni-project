import React from "react";
import { render } from "@testing-library/react";
import { Form } from "react-final-form";

import { setupGoogleApiMock } from "test_helpers";

import DrawDownsSplitTable from "./index";

const getComponent = ({ drawdowns }) =>
  render(
    <Form
      onSubmit={() => {}}
      initialValues={{ furtherAdvances: [100, 100] }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <DrawDownsSplitTable
            formValues={{
              drawdowns,
            }}
          />
          );
        </form>
      )}
    />
  );

describe("DrawDownsSplitTable", () => {
  beforeAll(() => {
    setupGoogleApiMock();
  });
  it("should render automatic drawdowns when provided", () => {
    const expectedCells = [
      {
        monthCell: "May",
        dateCell: "07/05/2020",
        advanceCell: "£200.00",
        interestCell: "£10.00",
      },
      {
        monthCell: "June",
        dateCell: "07/06/2020",
        advanceCell: "£200.00",
        interestCell: "-",
      },
      {
        monthCell: "July",
        dateCell: "07/07/2020",
        advanceCell: "£200.00",
        interestCell: "-",
      },
      {
        monthCell: "August",
        dateCell: "07/08/2020",
        advanceCell: "",
        interestCell: "-",
      },
    ];

    const component = getComponent({
      drawdowns: [
        {
          date: "07/05/2020",
          isShown: true,
          isEditable: false,
          interest: 10,
          advance: 200,
        },
        {
          advance: 200,
          date: "07/06/2020",
          isShown: true,
          isEditable: false,
        },
        {
          advance: 200,
          date: "07/07/2020",
          isShown: true,
          isEditable: false,
        },
        { date: "07/08/2020", isShown: false, isEditable: false },
      ],
    });

    const [, tableBody] = component.getAllByRole("rowgroup");

    const rows = tableBody.querySelectorAll("tr");
    expect(rows.length).toBe(expectedCells.length);
    rows.forEach((row, index) => {
      const columns = row.querySelectorAll("td");
      const [
        receivedMonthCell,
        receivedDateCell,
        receivedAdvanceCell,
        receivedInterestCell,
      ] = columns;

      const { monthCell, dateCell, advanceCell, interestCell } = expectedCells[
        index
      ];

      expect(receivedMonthCell.outerHTML).toStrictEqual(
        `<td>${monthCell}</td>`
      );
      expect(receivedDateCell.outerHTML).toStrictEqual(`<td>${dateCell}</td>`);
      expect(receivedInterestCell.outerHTML).toStrictEqual(
        `<td>${interestCell}</td>`
      );

      expect(receivedAdvanceCell.outerHTML).toStrictEqual(
        `<td>${advanceCell}</td>`
      );
    });
  });

  it("should render manual drawdowns when provided", () => {
    const expectedCells = [
      {
        monthCell: "May",
        dateCell: "07/05/2020",
        advanceCell: "",
        interestCell: "£10.00",
      },
      {
        monthCell: "June",
        dateCell: "07/06/2020",
        advanceCell: "£100",
        interestCell: "-",
      },
      {
        monthCell: "July",
        dateCell: "07/07/2020",
        advanceCell: "£100",
        interestCell: "-",
      },
      {
        monthCell: "August",
        dateCell: "07/08/2020",
        advanceCell: "",
        interestCell: "-",
      },
    ];

    const component = getComponent({
      drawdowns: [
        {
          date: "07/05/2020",
          isShown: true,
          isEditable: false,
          interest: 10,
          advance: 200,
        },
        {
          advance: 200,
          date: "07/06/2020",
          isShown: true,
          isEditable: true,
        },
        {
          advance: 200,
          date: "07/07/2020",
          isShown: true,
          isEditable: true,
        },
        { date: "07/08/2020", isShown: false, isEditable: false },
      ],
    });

    const [, tableBody] = component.getAllByRole("rowgroup");

    const rows = tableBody.querySelectorAll("tr");
    expect(rows.length).toBe(expectedCells.length);
    rows.forEach((row, index) => {
      const columns = row.querySelectorAll("td");
      const [
        receivedMonthCell,
        receivedDateCell,
        receivedAdvanceCell,
        receivedInterestCell,
      ] = columns;

      const { monthCell, dateCell, advanceCell, interestCell } = expectedCells[
        index
      ];

      expect(receivedMonthCell.outerHTML).toStrictEqual(
        `<td>${monthCell}</td>`
      );
      expect(receivedDateCell.outerHTML).toStrictEqual(`<td>${dateCell}</td>`);
      expect(receivedInterestCell.outerHTML).toStrictEqual(
        `<td>${interestCell}</td>`
      );

      const advanceInput = receivedAdvanceCell.querySelector("input");
      if (index > 0 && index < 3) {
        expect(advanceInput).toBeDefined();
        expect(advanceInput.value).toBe(advanceCell);
      }
    });
  });
});
