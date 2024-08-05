import { wait, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { getComponentWithRedux, setupGoogleApiMock } from "test_helpers";

import Form1 from "../form_1";

const isGuarantorInputSelectorText = "input[name$='is_guarantor']";

describe("CompanyDetails Form1", () => {
  const getComponentWithDefaultStore = (companyData, finalizeStep) =>
    getComponentWithRedux(
      Form1,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: {
          companyData,
        },
      }
    );

  const directors = [
    { name: "Daniel Christey", fk_shared_contact_id: 1, is_guarantor: false },
    { name: "Pawel Kaminski", fk_shared_contact_id: 2, is_guarantor: true },
  ];

  const shared_holders = [
    {
      name: "Daniel Christey",
      held: "25.0",
      isCompany: false,
      is_guarantor: false,
      fk_shared_contact_id: 1,
    },
    {
      name: "Pawel Kaminski",
      held: "25.0",
      isCompany: false,
      is_guarantor: true,
      fk_shared_contact_id: 2,
    },
    {
      name: "Simon Rendell",
      held: "25.0",
      isCompany: false,
      is_guarantor: true,
      fk_shared_contact_id: 3,
    },
    {
      name: "Omni",
      held: "25.0",
      isCompany: true,
      is_guarantor: true,
      company_number: "1234",
      company: [
        {
          name: "Simon Rendell",
          held: "50.0",
          isCompany: false,
          is_guarantor: undefined,
          fk_shared_contact_id: 3,
        },
        {
          name: "Omni Shareholder",
          held: "50.0",
          isCompany: false,
          is_guarantor: undefined,
          fk_shared_contact_id: 4,
        },
      ],
    },
  ];

  const companyData = {
    directors,
    shared_holders,
    base_data: { name: "UCREATE LIMITED" },
  };

  beforeAll(() => {
    setupGoogleApiMock();
  });

  it("Saves directors and shareholders", async () => {
    const finalizeStep = jest.fn(() => {});
    const { getByText } = getComponentWithDefaultStore(
      companyData,
      finalizeStep
    );

    const expectedPayload = {
      data: {
        type_of_applicant: "company",
        directors,
        shared_holders,
      },
      step_id: "company_details_form",
    };

    const continueButton = getByText(/Continue/i);
    act(() => {
      fireEvent.click(continueButton);
    });
    await wait(() => {
      expect(finalizeStep).toBeCalledWith(expectedPayload);
    });
  });

  it("Removes spaces from shareholders inputs", async () => {
    const finalizeStep = jest.fn(() => {});
    const { getByText, getByDisplayValue } = getComponentWithDefaultStore(
      companyData,
      finalizeStep
    );

    const shareholderIndex = 2;
    const expectedNewShareholder = {
      ...shared_holders[shareholderIndex],
      name: "text with double space",
    };
    const expectedPayload = {
      data: {
        type_of_applicant: "company",
        directors,
        shared_holders: [
          ...shared_holders.slice(0, shareholderIndex),
          expectedNewShareholder,
          ...shared_holders.slice(shareholderIndex + 1),
        ],
      },
      step_id: "company_details_form",
    };

    const shareholder_input = getByDisplayValue(
      shared_holders[shareholderIndex].name
    );
    act(() => {
      fireEvent.change(shareholder_input, {
        target: { value: "text with  double space" },
      });
    });

    const continueButton = getByText(/Continue/i);
    act(() => {
      fireEvent.click(continueButton);
    });
    await wait(() => {
      expect(finalizeStep).toBeCalledWith(expectedPayload);
    });
  });

  describe("Is Guarantor toggles", () => {
    it("New director is guarantor by default", async () => {
      const finalizeStep = jest.fn(() => {});
      const { getByText, container } = getComponentWithDefaultStore(
        companyData,
        finalizeStep
      );

      const addDirectorButton = getByText(/Add another director/i);
      act(() => {
        act(() => {
          fireEvent.click(addDirectorButton);
        });
      });

      const isGuarantorInputs = container.querySelectorAll(
        isGuarantorInputSelectorText
      );

      expect(isGuarantorInputs.length).toBeGreaterThan(0);

      const input = isGuarantorInputs[directors.length];
      expect(input.checked).toBeDefined();
    });
    it("Is guarantor true is set to be true if at least one (director/shareholder) has it set", async () => {
      const finalizeStep = jest.fn(() => {});
      const { getByText } = getComponentWithDefaultStore(
        {
          ...companyData,
          directors: [
            {
              name: "Daniel Christey",
              fk_shared_contact_id: 1,
              is_guarantor: true,
            },
            {
              name: "Pawel Kaminski",
              fk_shared_contact_id: 2,

              is_guarantor: false,
            },
            {
              name: "Other",
              is_guarantor: false,
              fk_shared_contact_id: 39,
            },
          ],
          shared_holders: [
            {
              name: "Daniel Christey",
              held: "25.0",
              isCompany: false,
              is_guarantor: false,
              fk_shared_contact_id: 1,
            },
            {
              name: "Pawel Kaminski",
              held: "25.0",
              isCompany: false,
              is_guarantor: true,
              fk_shared_contact_id: 2,
            },
            ...companyData.shared_holders.slice(2),
          ],
        },
        finalizeStep
      );

      const expectedPayload = {
        data: {
          type_of_applicant: "company",
          directors: [
            {
              name: "Daniel Christey",
              is_guarantor: true,
              fk_shared_contact_id: 1,
            },
            {
              name: "Pawel Kaminski",
              is_guarantor: true,
              fk_shared_contact_id: 2,
            },
            {
              name: "Other",
              is_guarantor: false,
              fk_shared_contact_id: 39,
            },
          ],
          shared_holders: [
            {
              name: "Daniel Christey",
              held: "25.0",
              isCompany: false,
              is_guarantor: true,
              fk_shared_contact_id: 1,
            },
            {
              name: "Pawel Kaminski",
              held: "25.0",
              isCompany: false,
              is_guarantor: true,
              fk_shared_contact_id: 2,
            },
            ...shared_holders.slice(2),
          ],
        },
        step_id: "company_details_form",
      };

      const continueButton = getByText(/Continue/i);
      act(() => {
        fireEvent.click(continueButton);
      });
      await wait(() => {
        expect(finalizeStep).toBeCalledWith(expectedPayload);
      });
    });

    const isGuarantorToggleSelectorText = "label[for]";
    it("Switching shareholder synchronizes the directors", async () => {
      const finalizeStep = jest.fn(() => {});
      const { getByText, container } = getComponentWithDefaultStore(
        {
          ...companyData,
          directors: [
            {
              name: "Daniel Christey",
              is_guarantor: false,
              fk_shared_contact_id: 1,
            },
            {
              name: "Other",
              is_guarantor: false,
              fk_shared_contact_id: 2,
            },
          ],
          shared_holders: [
            {
              name: "Daniel Christey",
              held: "25.0",
              isCompany: false,
              is_guarantor: false,
              fk_shared_contact_id: 1,
            },
          ],
        },
        finalizeStep
      );

      const expectedPayload = {
        data: {
          type_of_applicant: "company",
          directors: [
            {
              name: "Daniel Christey",
              fk_shared_contact_id: 1,
              is_guarantor: true,
            },
            {
              name: "Other",
              is_guarantor: true,
              fk_shared_contact_id: 2,
            },
          ],
          shared_holders: [
            {
              name: "Daniel Christey",
              held: "25.0",
              isCompany: false,
              is_guarantor: true,
              fk_shared_contact_id: 1,
            },
          ],
        },
        step_id: "company_details_form",
      };

      const isGuarantorToggles = container.querySelectorAll(
        isGuarantorToggleSelectorText
      );

      const isGuarantorDanielDirector = isGuarantorToggles[0];
      const isGuarantorOther = isGuarantorToggles[1];

      const isGuarantorInputs = container.querySelectorAll(
        isGuarantorInputSelectorText
      );
      const isGuarantorDanielShareholderInput = isGuarantorInputs[2];

      act(() => {
        fireEvent.click(isGuarantorOther);
      });

      await wait(() => {
        expect(isGuarantorDanielShareholderInput.checked).toBe(false);
      });

      act(() => {
        fireEvent.click(isGuarantorDanielDirector);
      });

      await wait(() => {
        const isGuarantorDanielShareholderInputAfterChange = container.querySelectorAll(
          isGuarantorInputSelectorText
        )[2];
        expect(isGuarantorDanielShareholderInputAfterChange.checked).toBe(true);
      });

      const continueButton = getByText(/Continue/i);
      act(() => {
        fireEvent.click(continueButton);
      });
      await wait(() => {
        expect(finalizeStep).toBeCalledWith(expectedPayload);
      });
    });

    it("Switching nested shareholder synchronizes the director", async () => {
      const finalizeStep = jest.fn(() => {});
      const { getByText, container } = getComponentWithDefaultStore(
        {
          ...companyData,
          directors: [
            {
              name: "Daniel Christey",
              fk_shared_contact_id: 1,
              is_guarantor: false,
            },
            {
              name: "Other",
              fk_shared_contact_id: 2,
              is_guarantor: false,
            },
          ],
          shared_holders: [
            {
              isCompany: true,
              held: "30.0",
              name: "company",
              is_guarantor: false,
              company: [
                {
                  name: "Daniel Christey",
                  held: "25.0",
                  isCompany: false,
                  is_guarantor: false,
                  fk_shared_contact_id: 1,
                },
              ],
            },
          ],
        },
        finalizeStep
      );

      const expectedPayload = {
        data: {
          type_of_applicant: "company",
          directors: [
            {
              name: "Daniel Christey",
              fk_shared_contact_id: 1,
              is_guarantor: true,
            },
            {
              name: "Other",
              fk_shared_contact_id: 2,
              is_guarantor: false,
            },
          ],
          shared_holders: [
            {
              isCompany: true,
              held: "30.0",
              name: "company",
              is_guarantor: false,
              company: [
                {
                  name: "Daniel Christey",
                  held: "25.0",
                  isCompany: false,
                  is_guarantor: true,
                  fk_shared_contact_id: 1,
                },
              ],
            },
          ],
        },
        step_id: "company_details_form",
      };

      const changeStructureButton = getByText(/Change structure/i);

      act(() => {
        fireEvent.click(changeStructureButton);
      });

      const shareholderToggle = container.querySelector(
        isGuarantorToggleSelectorText
      );

      act(() => {
        fireEvent.click(shareholderToggle);
      });

      const upALevelButton = getByText(/Up A Level/i);

      act(() => {
        fireEvent.click(upALevelButton);
      });

      await wait(() => {
        const isGuarantorInputs = container.querySelectorAll(
          isGuarantorInputSelectorText
        );
        const isGuarantorDanielDirector = isGuarantorInputs[0];
        expect(isGuarantorDanielDirector.checked).toBe(true);
      });

      const continueButton = getByText(/Continue/i);
      act(() => {
        fireEvent.click(continueButton);
      });
      await wait(() => {
        expect(finalizeStep).toBeCalledWith(expectedPayload);
      });
    });

    it("Switching director synchronizes all matching shareholders", async () => {
      const finalizeStep = jest.fn(() => {});
      const { getByText, container } = getComponentWithDefaultStore(
        {
          ...companyData,
          directors: [
            {
              name: "Daniel Christey",
              fk_shared_contact_id: 1,
              is_guarantor: false,
            },
            {
              name: "Other",
              fk_shared_contact_id: 2,
              is_guarantor: false,
            },
          ],
          shared_holders: [
            {
              isCompany: true,
              held: "30.0",
              name: "company",
              is_guarantor: false,
              company: [
                {
                  name: "Daniel Christey",
                  held: "25.0",
                  isCompany: false,
                  is_guarantor: false,
                  fk_shared_contact_id: 1,
                },
                {
                  isCompany: true,
                  held: "30.0",
                  name: "nested company",
                  is_guarantor: false,
                  company: [
                    {
                      name: "Daniel Christey",
                      held: "25.0",
                      isCompany: false,
                      is_guarantor: false,
                      fk_shared_contact_id: 1,
                    },
                  ],
                },
              ],
            },
          ],
        },
        finalizeStep
      );

      const expectedPayload = {
        data: {
          type_of_applicant: "company",
          directors: [
            {
              name: "Daniel Christey",
              fk_shared_contact_id: 1,
              is_guarantor: true,
            },
            {
              name: "Other",
              fk_shared_contact_id: 2,
              is_guarantor: false,
            },
          ],
          shared_holders: [
            {
              isCompany: true,
              held: "30.0",
              name: "company",
              is_guarantor: false,
              company: [
                {
                  name: "Daniel Christey",
                  held: "25.0",
                  isCompany: false,
                  is_guarantor: true,
                  fk_shared_contact_id: 1,
                },
                {
                  isCompany: true,
                  held: "30.0",
                  name: "nested company",
                  is_guarantor: false,
                  company: [
                    {
                      name: "Daniel Christey",
                      held: "25.0",
                      isCompany: false,
                      is_guarantor: true,
                      fk_shared_contact_id: 1,
                    },
                  ],
                },
              ],
            },
          ],
        },
        step_id: "company_details_form",
      };

      const shareholderToggle = container.querySelector(
        isGuarantorToggleSelectorText
      );

      act(() => {
        fireEvent.click(shareholderToggle);
      });

      const changeStructureButton = getByText(/Change structure/i);

      act(() => {
        fireEvent.click(changeStructureButton);
      });

      await wait(() => {
        const isGuarantorInputs = container.querySelectorAll(
          isGuarantorInputSelectorText
        );
        const isGuarantorDanielDirector = isGuarantorInputs[0];
        expect(isGuarantorDanielDirector.checked).toBe(true);
      });

      const changeStructureButtonChild = getByText(/Change structure/i);

      act(() => {
        fireEvent.click(changeStructureButtonChild);
      });

      await wait(() => {
        const isGuarantorInputs = container.querySelectorAll(
          isGuarantorInputSelectorText
        );
        const isGuarantorDanielDirector = isGuarantorInputs[0];
        expect(isGuarantorDanielDirector.checked).toBe(true);
      });

      const upALevelButtonChild = getByText(/Up A Level/i);

      act(() => {
        fireEvent.click(upALevelButtonChild);
      });

      const upALevelButton = getByText(/Up A Level/i);

      act(() => {
        fireEvent.click(upALevelButton);
      });

      const continueButton = getByText(/Continue/i);
      act(() => {
        fireEvent.click(continueButton);
      });
      await wait(() => {
        expect(finalizeStep).toBeCalledWith(expectedPayload);
      });
    });
  });
  describe("Shareholders tests", () => {
    it("Shows parent company as first shareholder", () => {
      const { getByText } = getComponentWithDefaultStore(companyData, () => {});

      const shareholderText = getByText(/UCREATE LIMITED/i);

      expect(shareholderText).toBeDefined();
    });

    it("Shows parent company as first shareholder in child view", async () => {
      const { getByText } = getComponentWithDefaultStore(companyData, () => {});

      const changeStructureButton = getByText(/Change structure/i);

      act(() => {
        fireEvent.click(changeStructureButton);
      });
      await wait(() => {
        const parentText = getByText(/UCREATE LIMITED/i);
        expect(parentText).toBeDefined();
        const childText = getByText(/Omni/i);
        expect(childText).toBeDefined();
        const slashText = getByText(/\//i);
        expect(slashText).toBeDefined();
      });
    });

    it("Back button is not visible in child view", async () => {
      const {
        getByText,
        queryByText,
      } = getComponentWithDefaultStore(companyData, () => {});

      const changeStructureButton = getByText(/Change structure/i);

      act(() => {
        fireEvent.click(changeStructureButton);
      });
      await wait(() => {
        const backButton = queryByText(/Back/i);
        expect(backButton).toBeNull();
      });
    });

    it("Up A Level button is visible in child view", async () => {
      const { getByText } = getComponentWithDefaultStore(companyData, () => {});

      const changeStructureButton = getByText(/Change structure/i);

      act(() => {
        fireEvent.click(changeStructureButton);
      });
      await wait(() => {
        const upALevelButton = getByText(/Up A Level/i);
        expect(upALevelButton).toBeDefined();
      });
    });

    it("Top level in a breadcrumb should navigate to top level", async () => {
      const { getByText } = getComponentWithDefaultStore(companyData, () => {});

      const changeStructureButton = getByText(/Change structure/i);

      act(() => {
        fireEvent.click(changeStructureButton);
      });
      const topLevelLink = getByText(/UCREATE LIMITED/i);

      act(() => {
        fireEvent.click(topLevelLink);
      });
      await wait(() => {
        const directorsHeader = getByText(/Director name/i);
        expect(directorsHeader).toBeDefined();
      });
    });

    it("Breadcrumb of top view should not be navigable to", async () => {
      const { getByText } = getComponentWithDefaultStore(companyData, () => {});

      const topLevelLink = getByText(/UCREATE LIMITED/i);

      expect(topLevelLink.toString()).toBe("[object HTMLLegendElement]");
    });

    it("Breadcrumb of current view should not be navigable to", async () => {
      const { getByText } = getComponentWithDefaultStore(companyData, () => {});

      const changeStructureButton = getByText(/Change structure/i);

      act(() => {
        fireEvent.click(changeStructureButton);
      });

      await wait(() => {
        const parentText = getByText(/UCREATE LIMITED/i);
        expect(parentText.toString()).toBe("[object HTMLButtonElement]");
        const childText = getByText(/Omni/i);
        expect(childText.toString()).toBe("[object HTMLLegendElement]");
      });
    });
  });
});
