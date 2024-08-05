import getSumOfAssets from "./get_sum_of_assets";

const multipleApplicants = [
  {
    name: "John Doe",
    tableData: [
      {
        type: "vehicle",
        description: "Car",
        gross_value: 11,
        debt: "",
        net_value: 22,
        monthly_mortgage: "",
        monthly_rental: "",
        _buttons: "",
      },
      {
        type: "equities",
        description: "Example Equity",
        gross_value: 111,
        debt: "",
        net_value: 222,
        monthly_mortgage: "",
        monthly_rental: "",
        _buttons: "",
      },
      {
        type: "property",
        description: "Example description 0",
        gross_value: 1111,
        debt: 2222,
        net_value: null,
        monthly_mortgage: 3333,
        monthly_rental: 4444,
        _buttons: "",
      },
    ],
  },
  {
    name: "Joe Smith",
    tableData: [
      {
        type: "other",
        description: "test",
        gross_value: 5,
        debt: "",
        net_value: 6,
        monthly_mortgage: "",
        monthly_rental: "",
        _buttons: "",
      },
      {
        type: "property",
        description: "Example description",
        gross_value: 55,
        debt: 66,
        net_value: null,
        monthly_mortgage: 77,
        monthly_rental: 88,
        _buttons: "",
      },
      {
        type: "property",
        description: "Example description 2",
        gross_value: 555,
        debt: 666,
        net_value: null,
        monthly_mortgage: 777,
        monthly_rental: 888,
        _buttons: "",
      },
    ],
  },
];

const singleApplicantNonProperty = [
  {
    name: "name",
    tableData: [
      {
        type: "vehicle",
        description: "Example description",
        gross_value: 11,
        debt: null,
        net_value: 11,
        monthly_mortgage: null,
        monthly_rental: null,
        _buttons: "",
      },
      {
        type: "equity",
        description: "Example description",
        gross_value: 11,
        debt: null,
        net_value: 11,
        monthly_mortgage: null,
        monthly_rental: null,
        _buttons: "",
      },
      {
        type: "property",
        description: "Example description",
        gross_value: 55,
        debt: 66,
        net_value: null,
        monthly_mortgage: 77,
        monthly_rental: 88,
        _buttons: "",
      },
    ],
  },
];

const singleApplicantProperty = [
  {
    name: "name",
    tableData: [
      {
        type: "vehicle",
        description: "Example description",
        gross_value: 11,
        debt: null,
        net_value: 11,
        monthly_mortgage: null,
        monthly_rental: null,
        _buttons: "",
      },
      {
        type: "property",
        description: "Example description",
        gross_value: 55,
        debt: 66,
        net_value: null,
        monthly_mortgage: 77,
        monthly_rental: 88,
        _buttons: "",
      },
    ],
  },
];

describe("getSumOfAssets", () => {
  it("Calculate property subtotal", () => {
    const output = getSumOfAssets(singleApplicantProperty);

    expect(output).toMatchObject({
      overallPropertySubtotal: {
        gross_value: 55,
        debt: 66,
        net_value: 0,
        monthly_mortgage: 77,
        monthly_rental: 88,
      },
    });
  });

  it("Sum non property fields from one applicant", () => {
    const output = getSumOfAssets(singleApplicantNonProperty);

    expect(output).toMatchObject({
      overallNonPropertySubtotal: {
        gross_value: 22,
        net_value: 22,
      },
    });
  });

  it("Sum overall fields from multiple applicant", () => {
    const output = getSumOfAssets(multipleApplicants);

    expect(output).toMatchObject({
      overallSubtotal: {
        gross_value: 1848,
        debt: 2954,
        net_value: 250,
        monthly_mortgage: 4187,
        monthly_rental: 5420,
      },
    });
  });
});
