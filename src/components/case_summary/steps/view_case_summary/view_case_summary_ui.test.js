import React from "react";
import TestRenderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import ViewCaseSummaryUI from "./view_case_summary_ui";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({ id: 123 }),
}));

describe("ViewCaseSummaryUI", () => {
  it("snapshot test", () => {
    const viewCaseSummaryData = {
      titleNumbers: ["foo", "bar", "second"],
      propertiesData: [
        {
          title_numbers: ["foo", "bar"],
          address: {
            line_1: "Brasteds Lodge, Manor Farm Barns, Fox Road",
            line_2: "Framingham Pigot",
            postcode: "NR14 7PZ",
            city: "Norwich",
            country: "united kingdom",
          },
          omv: 500000,
        },
        {
          title_numbers: ["second"],
          address: {
            line_1: "B 2 B Cashflow Solutions Ltd",
            line_2: "Manor Farm Barns, Fox Road, Framingham Pigot",
            postcode: "NR14 7PZ",
            city: "Norwich",
            country: "united kingdom",
          },
          surveyorFirm: "adas",
          surveyorIndividual: "ind adas",
          inspection_date: "2021-02-08",
          omv: 100000,
          omv_90_day: 200000,
        },
      ],
      underwriterName: "",
      startCaseSummaryDate: "2021-02-16T21:16:52.703Z",
      executiveSummary:
        "<h2>Borrower:</h2><br /><br /><h2>Loan Requirement:</h2><br /><br /><h2>Loan Purpose:</h2><br /><br /><h2>Loan Rationale:</h2><br /><br /><h2>Security:</h2><br /><br /><h2>Exit:</h2>",
      descriptionOfProperty:
        '<p>Nice styled description</p><p><br></p><p>with <strong>bold</strong> and with <u>underline</u></p><p><br></p><p><span style="color: rgb(230, 0, 0);">so much color</span></p>',
      valuer: "Bruton Knowles LLP",
      analysisOfProperty:
        "<p>Analysis of Property (including review of comparable evidence, risks, mitigations, planning</p>",
      riskInputs: [
        { risk: "goo", mitigation: "foo" },
        { risk: "test", mitigation: "third" },
      ],
      underwriterRationale: "<p>rational</p>",
      exitStrategy: "<p>exit st</p>",
      ongoingMonitoring: "<p>ong moni</p>",
      specialConditions: "<p>very special</p>",
      borrowerProfile: "<p>profile</p>",
      clientMeetingNotes: "<p>Some important notes</p>",
      clientMeetingAttendees:
        "<ol><li>First gentelman</li><li>Second lady</li></ol>",
      clientMeetingDate: "2021-02-09T00:00:00.000Z",
      associatedTags: [{ ColorCode: "#FFFFFF", Name: "foo" }],
    };

    const viewCaseSummaryUI = TestRenderer.create(
      <ThemeProvider theme={{ colors: {} }}>
        <ViewCaseSummaryUI viewCaseSummaryData={viewCaseSummaryData} />
      </ThemeProvider>
    ).toJSON();

    expect(viewCaseSummaryUI).toMatchSnapshot();
  });
});
