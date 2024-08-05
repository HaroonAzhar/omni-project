import { fireEvent, wait, act } from "@testing-library/react";

import { getComponentWithRedux } from "test_helpers";

import { UkIndividualPanel } from "../aml_kyc_home_screen/panels";

describe("AmlKyc - Uk individual panel", () => {
  it("Renders properly", () => {
    const applicant = { aml_kyc: {} };
    const { container } = getComponentWithRedux(UkIndividualPanel, {
      applicant,
    });

    expect(container).toBeDefined();
  });

  it("Does not render additional Proof of Address question", async () => {
    const applicant = { aml_kyc: {} };

    const { getByLabelText, queryByLabelText } = getComponentWithRedux(
      UkIndividualPanel,
      {
        applicant,
      }
    );

    const proofOfAddressInput = getByLabelText(/^Proof of Address/i);
    const additionalProofOfAddressInput = queryByLabelText(
      /^Additional Proof of Address/i
    );

    expect(proofOfAddressInput).toBeDefined();
    expect(additionalProofOfAddressInput).toBeNull();

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
      ).toBeNull();
    });

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
});
