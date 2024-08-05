import getComponentWithRedux from "test_helpers/get_component_with_redux";

import OverviewInfo from "./overview_info";

describe("<OverviewInfo>", () => {
  it("Test if gets calculator step properly", () => {
    const { getByText } = getComponentWithRedux(
      OverviewInfo,
      {},
      {
        application: {},
        calculator: {
          calculatorResponse: {
            gross_amount_of_first_advance: 10000.1,
            total_loan_facility: 200000.2,
          },
        },
      }
    );

    const dayOneGrossValue = getByText(
      /Day One Gross/i
    ).parentElement.querySelector("div:last-child").innerHTML;
    const totalFacilityValue = getByText(
      /Total facility/i
    ).parentElement.querySelector("div:last-child").innerHTML;

    expect(dayOneGrossValue).toBe("£10,000.10");
    expect(totalFacilityValue).toBe("£200,000.20");
  });
});
