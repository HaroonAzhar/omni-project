import React from "react";
import { Form } from "react-final-form";
import { fireEvent, act, render, wait } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import ProofOf from "../aml_kyc_home_screen/panels/shared/proof_of";

const getComponent = () => {
  const mockedSubmit = jest.fn(() => {});

  const component = render(
    <ThemeProvider theme={{ colors: { helper: "" } }}>
      <Form
        onSubmit={mockedSubmit}
        render={({ handleSubmit, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              <ProofOf values={values} />
              <button type="submit"></button> {/* eslint-disable-line */}
            </form>
          );
        }}
      />
    </ThemeProvider>
  );

  const saveButton = component.container.querySelector("button[type=submit]");

  return { ...component, saveButton, mockedSubmit };
};

const removeElementFromArray = (array, elementToRemove) => {
  const copiedArray = [...array];
  copiedArray.splice(copiedArray.indexOf(elementToRemove), 1);

  return copiedArray;
};

describe("AmlKyc - IndividualQuestions", () => {
  const testProofsOfIdAndAddress = async ({
    proofOfId,
    proofOfAddress,
    howManyTimesSubmitShouldBeCalled,
  }) => {
    const { getByLabelText, saveButton, mockedSubmit } = getComponent();

    const proofOfIdInput = getByLabelText(/^Proof of ID/i);
    const proofOfAddressInput = getByLabelText(/^Proof of Address/i);

    expect(proofOfIdInput).toBeDefined();
    expect(proofOfAddressInput).toBeDefined();

    act(() => {
      fireEvent.change(proofOfIdInput, {
        target: {
          value: proofOfId,
        },
      });
      fireEvent.change(proofOfAddressInput, {
        target: {
          value: proofOfAddress,
        },
      });
    });

    act(() => {
      fireEvent.click(saveButton);
    });

    await wait(() => {
      expect(mockedSubmit).toHaveBeenCalledTimes(
        howManyTimesSubmitShouldBeCalled
      );
    });
  };

  it("Step passes when Proof of ID and Proof of Addres are different", async () => {
    await testProofsOfIdAndAddress({
      proofOfId: "EEA_DRIVING_LICENSE",
      proofOfAddress: "EEA_MEMBER_CARD",
      howManyTimesSubmitShouldBeCalled: 1,
    });
  });

  const testIfAlreadyChosenOptionIsRemoved = async ({
    firstInput,
    secondInput,
    secondInputExpectedOptions,
    commonOption,
  }) => {
    const getInputOptions = (input) => {
      return [...input.options].map(({ value }) => value);
    };

    const secondInputOptions = getInputOptions(secondInput);

    expect(secondInputExpectedOptions).toContain(commonOption);
    expect(secondInputOptions).toEqual(secondInputExpectedOptions);

    act(() => {
      fireEvent.change(firstInput, {
        target: {
          value: commonOption,
        },
      });
    });

    const secondInputOptionsAfterAct = getInputOptions(secondInput);

    const expectedOptionsWithoutCommonOption = removeElementFromArray(
      secondInputExpectedOptions,
      commonOption
    );
    await wait(() => {
      expect(secondInputOptionsAfterAct).toEqual(
        expectedOptionsWithoutCommonOption
      );
    });
  };

  it("Remove option when is already chosen before", async () => {
    const { getByLabelText } = getComponent();

    const proofOfIdInput = getByLabelText(/^Proof of ID/i);
    const proofOfAddressInput = getByLabelText(/^Proof of Address/i);

    await testIfAlreadyChosenOptionIsRemoved({
      firstInput: proofOfIdInput,
      secondInput: proofOfAddressInput,
      secondInputExpectedOptions: [
        "Choose one",
        "CONFIRMATION_ELECTORAL_REGISTER",
        "UTILITY_BILL_STATEMENT",
        "BANK_STATEMENT",
        "LOCAL_AUTHORITY_TAX",
        "EEA_DRIVING_LICENSE",
        "EEA_MEMBER_CARD",
        "NORTHERN_IRELAND_CARD",
        "BLUE_BADGE",
      ],
      commonOption: "EEA_DRIVING_LICENSE",
    });
  });

  it("Remove option when is already chosen before - different input", async () => {
    const { getByLabelText } = getComponent();

    const proofOfIdInput = getByLabelText(/^Proof of ID/i);
    const proofOfAddressInput = getByLabelText(/^Proof of Address/i);

    await testIfAlreadyChosenOptionIsRemoved({
      firstInput: proofOfAddressInput,
      secondInput: proofOfIdInput,
      secondInputExpectedOptions: [
        "Choose one",
        "SIGNED_PASSPORT",
        "EEA_MEMBER_CARD",
        "NORTHERN_IRELAND_CARD",
        "RESIDENCE_PERMIT",
        "EEA_DRIVING_LICENSE",
        "BLUE_BADGE",
      ],
      commonOption: "EEA_DRIVING_LICENSE",
    });
  });

  it("Does not render additional Proof of Address question if bank statement is chosen", async () => {
    const { getByLabelText, queryByLabelText } = getComponent();

    const proofOfAddressInput = getByLabelText(/^Proof of Address/i);
    const additionalProofOfAddressInput = getByLabelText(
      /^Additional Proof of Address/i
    );

    expect(proofOfAddressInput).toBeDefined();
    expect(additionalProofOfAddressInput).toBeDefined();

    act(() => {
      fireEvent.change(proofOfAddressInput, {
        target: {
          value: "BANK_STATEMENT",
        },
      });
    });

    await wait(() => {
      const additionalProofOfAddressInputAfterSettingBankStatement = queryByLabelText(
        /^Additional Proof of Address/i
      );
      expect(additionalProofOfAddressInputAfterSettingBankStatement).toBeNull();
    });
  });

  it("Renders additional Proof of Address question if bank statement is not chosen", async () => {
    const { getByLabelText, queryByLabelText } = getComponent();

    const proofOfAddressInput = getByLabelText(/^Proof of Address/i);
    const additionalProofOfAddressInput = getByLabelText(
      /^Additional Proof of Address/i
    );

    expect(proofOfAddressInput).toBeDefined();
    expect(additionalProofOfAddressInput).toBeDefined();

    act(() => {
      fireEvent.change(proofOfAddressInput, {
        target: {
          value: "UTILITY_BILL_STATEMENT",
        },
      });
    });

    await wait(() => {
      const additionalProofOfAddressInputAfterSettingUtilityBillStatement = queryByLabelText(
        /^Additional Proof of Address/i
      );
      expect(
        additionalProofOfAddressInputAfterSettingUtilityBillStatement
      ).toBeDefined();
    });
  });
});
