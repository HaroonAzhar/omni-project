import { getNumbersOfFields, isRelevantField } from "./get_result_state";

const getRelevantFieldNames = (fieldNames) => {
  return fieldNames.filter((fieldName) => isRelevantField(fieldName));
};

describe("get_result_state", () => {
  it("filters out irrelevant fields", () => {
    const fieldNames = [
      "proof_of_id",
      "proof_of_address",
      "proof_of_id_expiry_date",
      "additional_notes",
      "creditsafe",
      "creditsafe_clear",
      "is_pep",
      "links_to_high_risk_jurisdiction",
      "any_suspicion_of_money_laundering",
      "status",
      "creditsafe_clear_user_comments",
      "creditsafe_clear_mlro_comments",
      "creditsafe_clear_mlro_username",
      "creditsafe_clear_mlro_date",
    ];

    const expectedRelevantFields = [
      "proof_of_id",
      "proof_of_address",
      "creditsafe",
      "creditsafe_clear",
      "is_pep",
      "links_to_high_risk_jurisdiction",
      "any_suspicion_of_money_laundering",
    ];

    const relevantFields = getRelevantFieldNames(fieldNames);

    expect(expectedRelevantFields).toEqual(relevantFields);
  });

  it("number of fields", () => {
    const fields = [
      {
        name: "foo",
        value: undefined,
      },
      {
        name: "bar",
        value: {
          referral: false,
          value: "test",
        },
      },
      {
        name: "bar",
        value: {
          referral: true,
          value: "test",
        },
      },
      {
        name: "baz",
        value: {
          referral: true,
          value: "test",
        },
      },
    ];
    const values = {
      baz_mlro_state: {
        innerValue: "signed",
      },
    };
    const expectedNoIncompleteFields = 1;
    const expectedNoReferralFields = 2;
    const expectedNoReferralFieldsWithoutMlro = 1;

    const {
      noIncompleteFields,
      noReferralFields,
      noReferralFieldsWithoutMlro,
    } = getNumbersOfFields(fields, values);

    expect(expectedNoIncompleteFields).toEqual(noIncompleteFields);
    expect(expectedNoReferralFields).toEqual(noReferralFields);
    expect(expectedNoReferralFieldsWithoutMlro).toEqual(
      noReferralFieldsWithoutMlro
    );
  });
});
