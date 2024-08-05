import parseGoogleAutocompleteResponse from "../parse_google_autocomplete_response";
import apiResponse from "./autocomplete_api_response";

describe("parseGoogleAutocompleteResponse", () => {
  it("Parse autocomplete api data correctly", () => {
    const parsedOutput = parseGoogleAutocompleteResponse(apiResponse);

    const correctOutput = {
      line_1: "12, Shrigley Road North",
      town_city: "Stockport",
      line_2: "Cheshire East, England",
      country: "united kingdom",
      postcode: "SK12 1TE",
    };

    expect(parsedOutput).toEqual(correctOutput);
  });
});
