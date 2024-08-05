import checkIfPdfCanNotBeGenerated from "../check_if_pdf_can_be_generated";

describe("checkIfPdfCanBeGenerated", () => {
  it("Returns list of missing steps", () => {
    const exptected = {
      missingSteps: [
        "security_details",
        "applicant_details",
        "solicitor_details",
      ],

      pdfCanNotBeGenerated: true,
    };
    const result = checkIfPdfCanNotBeGenerated({
      steps: [],
    });

    expect(result).toEqual(exptected);
  });

  it("Steps must not be new", () => {
    const exptected = {
      missingSteps: ["security_details", "applicant_details"],

      pdfCanNotBeGenerated: true,
    };
    const result = checkIfPdfCanNotBeGenerated({
      steps: [
        { name: "security_details", status: "New" },
        { name: "applicant_details", status: "New" },
        { name: "solicitor_details", status: "Edited" },
        { name: "other_details", status: "Edited" },
      ],
    });

    expect(result).toEqual(exptected);
  });

  it("Passes if all required edited", () => {
    const exptected = {
      missingSteps: [],

      pdfCanNotBeGenerated: false,
    };
    const result = checkIfPdfCanNotBeGenerated({
      steps: [
        { name: "security_details", status: "Edited" },
        { name: "applicant_details", status: "Edited" },
        { name: "solicitor_details", status: "Edited" },
      ],
    });

    expect(result).toEqual(exptected);
  });
});
