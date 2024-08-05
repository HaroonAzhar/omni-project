import { fireEvent, wait } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import moment from "moment";

import { getComponentWithRedux, setupGoogleApiMock } from "test_helpers";

import Form1 from "./form_1";

describe("Declarations and signatures", () => {
  const getComponentWithStoreContent = (
    storeApplicationContent,
    finalizeStep
  ) =>
    getComponentWithRedux(
      Form1,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: {
          ...storeApplicationContent,
        },
      }
    );
  const individual = {
    personal_data: {
      forename: "Foo",
      surname: "BAR",
    },
    declarations_signatures: {
      declaration: true,
      date_of_declaration: "2020-07-17",
      signature: false,
      date_of_signature: "2020-07-05",
    },
  };
  const continueLabel = /Continue/i;

  const expectedIndividualWrapped = (singleIndividual) => ({
    data: [singleIndividual],
  });
  const nowString = "2021-01-02T20:20:20";

  beforeAll(() => {
    setupGoogleApiMock();
    Date.now = jest.fn(() => new Date(nowString));
  });

  afterAll(() => {
    Date.now.mockRestore();
  });

  it("Sends request with provided store", async () => {
    const finalizeStep = jest.fn(() => {});

    const { getByText } = getComponentWithStoreContent(
      {
        individuals: [individual],
      },
      finalizeStep
    );

    const continueButton = getByText(continueLabel);

    act(() => {
      fireEvent.click(continueButton);
    });

    await wait(() => {
      expect(finalizeStep).toBeCalledWith(
        expectedIndividualWrapped(individual)
      );
    });
  });

  it("Requires date when checkbox checked", async () => {
    const finalizeStep = jest.fn(() => {});

    const individualWithoutBothDates = {
      ...individual,
      declarations_signatures: {
        declaration: true,
        date_of_declaration: "",
        signature: false,
        date_of_signature: "",
      },
    };

    const { getByText } = getComponentWithStoreContent(
      {
        individuals: [individualWithoutBothDates],
      },
      finalizeStep
    );

    const continueButton = getByText(continueLabel);

    act(() => {
      fireEvent.click(continueButton);
    });

    await wait(() => {
      expect(finalizeStep).toBeCalledTimes(0);
    });
  });

  it("Does not require date when checkbox unchecked", async () => {
    const finalizeStep = jest.fn(() => {});

    const individualWithoutDate = {
      ...individual,
      declarations_signatures: {
        declaration: true,
        date_of_declaration: "2020-07-15",
        signature: false,
        date_of_signature: "",
      },
    };

    const { getByText } = getComponentWithStoreContent(
      {
        individuals: [individualWithoutDate],
      },
      finalizeStep
    );

    const continueButton = getByText(continueLabel);

    act(() => {
      fireEvent.click(continueButton);
    });

    await wait(() => {
      expect(finalizeStep).toBeCalledWith(
        expectedIndividualWrapped(individualWithoutDate)
      );
    });
  });

  it("Date cannot be tomorrow", async () => {
    const finalizeStep = jest.fn(() => {});

    const individualWithoutDate = {
      ...individual,
      declarations_signatures: {
        declaration: true,
        date_of_declaration: moment(nowString)
          .add(1, "days")
          .subtract(1, "seconds"),
        signature: false,
        date_of_signature: "",
      },
    };

    const { getByText } = getComponentWithStoreContent(
      {
        individuals: [individualWithoutDate],
      },
      finalizeStep
    );

    const continueButton = getByText(continueLabel);

    act(() => {
      fireEvent.click(continueButton);
    });

    await wait(() => {
      expect(finalizeStep).toBeCalledTimes(0);
    });
  });

  it("Date can be current", async () => {
    const finalizeStep = jest.fn(() => {});

    const individualWithoutDate = {
      ...individual,
      declarations_signatures: {
        declaration: true,
        date_of_declaration: moment(nowString),
        signature: false,
        date_of_signature: "",
      },
    };

    const { getByText } = getComponentWithStoreContent(
      {
        individuals: [individualWithoutDate],
      },
      finalizeStep
    );

    const continueButton = getByText(continueLabel);

    act(() => {
      fireEvent.click(continueButton);
    });

    await wait(() => {
      expect(finalizeStep).toBeCalledTimes(1);
    });
  });

  it("Stored date can be more than six months old", async () => {
    const finalizeStep = jest.fn(() => {});

    const individualWithoutDate = {
      ...individual,
      declarations_signatures: {
        declaration: true,
        date_of_declaration: "2020-01-16",
        signature: false,
        date_of_signature: "",
      },
    };

    const { getByText } = getComponentWithStoreContent(
      {
        individuals: [individualWithoutDate],
      },
      finalizeStep
    );

    const continueButton = getByText(continueLabel);

    act(() => {
      fireEvent.click(continueButton);
    });

    await wait(() => {
      expect(finalizeStep).toBeCalledTimes(1);
    });
  });

  it("User input date is less than six months old", async () => {
    const finalizeStep = jest.fn(() => {});

    const individualWithoutDate = {
      ...individual,
      declarations_signatures: {
        declaration: true,
        date_of_declaration: "",
        signature: false,
        date_of_signature: "",
      },
    };

    const { getByLabelText, getByText } = getComponentWithRedux(
      Form1,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: {
          individuals: [individualWithoutDate],
        },
      }
    );

    const dateDeclarationLabel = getByLabelText(/Date of declaration/i);

    const continueButton = getByText(continueLabel);

    act(() => {
      fireEvent.change(dateDeclarationLabel, {
        target: {
          value: moment(nowString).subtract(1, "months").format("YYYY-MM-DD"),
        },
      });
    });
    act(() => {
      fireEvent.click(continueButton);
    });

    await wait(() => {
      expect(finalizeStep).toBeCalledTimes(1);
    });
  });

  it("User input date can not be more than six months old", async () => {
    const finalizeStep = jest.fn(() => {});

    const individualWithoutDate = {
      ...individual,
      declarations_signatures: {
        declaration: true,
        date_of_declaration: "",
        signature: false,
        date_of_signature: "",
      },
    };

    const { getByLabelText, getByText } = getComponentWithRedux(
      Form1,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: {
          individuals: [individualWithoutDate],
        },
      }
    );

    const dateDeclarationLabel = getByLabelText(/Date of declaration/i);

    const continueButton = getByText(continueLabel);

    act(() => {
      fireEvent.change(dateDeclarationLabel, {
        target: {
          value: moment(nowString).subtract(7, "months").format("YYYY-MM-DD"),
        },
      });
    });
    act(() => {
      fireEvent.click(continueButton);
    });

    await wait(() => {
      expect(finalizeStep).toBeCalledTimes(0);
    });
  });

  it("Clears declaration dates when unchecked the checkbox", async () => {
    const finalizeStep = jest.fn(() => {});
    const { getAllByLabelText, getByText } = getComponentWithStoreContent(
      {
        individuals: [individual],
      },
      finalizeStep
    );

    const expectedDeclarationsSignatures = {
      declaration: false,
      date_of_declaration: "",
      signature: true,
      date_of_signature: "2020-07-05",
    };

    const checkboxLabel = `${individual.personal_data.forename} ${individual.personal_data.surname}`;
    const checkBoxes = getAllByLabelText(checkboxLabel);

    for (const checkBox of checkBoxes) {
      act(() => {
        fireEvent.click(checkBox);
      });
    }

    const continueButton = getByText(continueLabel);
    act(() => {
      fireEvent.click(continueButton);
    });

    await wait(() => {
      expect(finalizeStep).toBeCalledWith(
        expectedIndividualWrapped({
          personal_data: individual.personal_data,
          declarations_signatures: expectedDeclarationsSignatures,
        })
      );
    });
  });

  it("Clears signatures dates when unchecked the checkbox", async () => {
    const finalizeStep = jest.fn(() => {});
    const { getAllByLabelText, getByText } = getComponentWithStoreContent(
      {
        individuals: [individual],
      },
      finalizeStep
    );

    const expectedDeclarationsSignatures = {
      declaration: true,
      date_of_declaration: "2020-07-17",
      signature: false,
      date_of_signature: "",
    };

    const checkboxLabel = `${individual.personal_data.forename} ${individual.personal_data.surname}`;
    const checkBoxes = getAllByLabelText(checkboxLabel);
    const continueButton = getByText(continueLabel);

    act(() => {
      fireEvent.click(checkBoxes[1]);
    });

    act(() => {
      fireEvent.click(checkBoxes[1]);
    });

    act(() => {
      fireEvent.click(continueButton);
    });

    await wait(() => {
      expect(finalizeStep).toBeCalledWith(
        expectedIndividualWrapped({
          personal_data: individual.personal_data,
          declarations_signatures: expectedDeclarationsSignatures,
        })
      );
    });
  });
});
