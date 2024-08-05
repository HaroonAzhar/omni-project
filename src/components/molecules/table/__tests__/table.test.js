import React from "react";
import { render, fireEvent, act, wait } from "@testing-library/react";
import renderer from "react-test-renderer";

import Table from "../index";

const dummyColumns = [
  {
    Header: "A",
    accessor: "a",
  },
  {
    Header: "B",
    accessor: "b",
  },
];

const dummyData = [
  {
    a: "test1",
    b: "test2",
  },
  {
    a: "test3",
    b: "test4",
  },
];

const checkPaginationButtons = async ({
  currentPage,
  totalPages,
  howMuchBackButtonShouldBeCalled,
  howMuchNextButtonShouldBeCalled,
}) => {
  const goPageBack = jest.fn(() => {});
  const goToNextPage = jest.fn(() => {});

  const { container } = render(
    <Table
      columns={dummyColumns}
      data={dummyData}
      selectedIndex={1}
      goPageBack={goPageBack}
      goToNextPage={goToNextPage}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );

  const buttons = [...container.querySelectorAll("button")];
  const rightButton = buttons.find((el) => el.className.includes("Right"));
  const leftButton = buttons.find((el) => el.className.includes("Left"));

  act(() => {
    fireEvent.click(leftButton);
  });
  await wait(() =>
    expect(goPageBack).toHaveBeenCalledTimes(howMuchBackButtonShouldBeCalled)
  );

  act(() => {
    fireEvent.click(rightButton);
  });
  await wait(() =>
    expect(goToNextPage).toHaveBeenCalledTimes(howMuchNextButtonShouldBeCalled)
  );
};

describe("<Table>", () => {
  it("Go to next page", async () => {
    await checkPaginationButtons({
      currentPage: 1,
      totalPages: 10,
      howMuchBackButtonShouldBeCalled: 0,
      howMuchNextButtonShouldBeCalled: 1,
    });
  });

  it("Go page back", async () => {
    await checkPaginationButtons({
      currentPage: 10,
      totalPages: 10,
      howMuchBackButtonShouldBeCalled: 1,
      howMuchNextButtonShouldBeCalled: 0,
    });
  });

  it("Row highlighting", async () => {
    const { container } = render(
      <Table
        columns={dummyColumns}
        data={dummyData}
        selectedIndex={1}
        goPageBack={() => {}}
        goToNextPage={() => {}}
        currentPage={10}
        totalPages={10}
      />
    );

    const highlightedRows = container.querySelectorAll(".highlighted");
    expect(highlightedRows.length).toBe(1);

    expect(highlightedRows[0].innerHTML.includes(dummyData[1].a)).toBe(true);
    expect(highlightedRows[0].innerHTML.includes(dummyData[1].b)).toBe(true);
  });

  it("Shouldn't show pagination", () => {
    const tree = renderer
      .create(
        <Table columns={dummyColumns} data={dummyData} selectedIndex={1} />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
