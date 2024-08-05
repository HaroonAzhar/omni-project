import { getComponentWithRedux } from "test_helpers";

import ApplicantDetailsFork from "./index";

describe("<ApplicantDetailsFork>", () => {
  it("render company details step based on whichApplicantStepToShow", () => {
    const states = [
      {
        state: "individual",
        title: "Applicant details",
      },
      {
        state: "company",
        title: "Applicant details",
      },
    ];

    for (const { state } of states) {
      const { getByText } = getComponentWithRedux(
        ApplicantDetailsFork,
        {},
        {
          dip: {
            ContactType: state,
          },
        }
      );

      const titleElement = getByText("Applicant 1");
      expect(titleElement).toBeDefined();
    }
  });
});
