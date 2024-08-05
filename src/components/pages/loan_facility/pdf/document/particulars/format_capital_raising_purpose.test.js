import formatCapitalRaisingPurpose from "./format_capital_raising_purpose";

describe("format capital raising purpose", () => {
  it("If no value has been entered for Purpose of borrowings (empty string) then the value should be 'Capital Raising' - with no ' for' added.", () => {
    const purpose_of_borrowings = "";
    const expectedValue = "Capital Raising";

    const actualValue = formatCapitalRaisingPurpose(purpose_of_borrowings);

    expect(actualValue).toBe(expectedValue);
  });

  it("If no value has been entered for Purpose of borrowings undefined then the value should be 'Capital Raising' - with no ' for' added.", () => {
    const purpose_of_borrowings = undefined;
    const expectedValue = "Capital Raising";

    const actualValue = formatCapitalRaisingPurpose(purpose_of_borrowings);

    expect(actualValue).toBe(expectedValue);
  });

  it("If a purpose of borrowings was added, then this should be 'Capital Raising for {purpose of borrowings}'", () => {
    const purpose_of_borrowings = "sample purpose";
    const expectedValue = "Capital Raising for sample purpose";

    const actualValue = formatCapitalRaisingPurpose(purpose_of_borrowings);

    expect(actualValue).toBe(expectedValue);
  });

  it("If the purpose of borrowing value starts with 'Capital Raising' it does not get prefixed with 'Capital Raising for ' ", () => {
    const purpose_of_borrowings = "Capital Raising for other";
    const expectedValue = "Capital Raising for other";

    const actualValue = formatCapitalRaisingPurpose(purpose_of_borrowings);

    expect(actualValue).toBe(expectedValue);
  });

  it("If the purpose of borrowing value starts with 'Capital Raising' it does not get prefixed with 'Capital Raising for ' - case insensitive", () => {
    const purpose_of_borrowings = "cApital Raising for other";
    const expectedValue = "cApital Raising for other";

    const actualValue = formatCapitalRaisingPurpose(purpose_of_borrowings);

    expect(actualValue).toBe(expectedValue);
  });

  it("If the purpose of borrowing contains 'Capital Raising' it gets prefixed with 'Capital Raising for ' ", () => {
    const purpose_of_borrowings = "b cApital Raising for other";
    const expectedValue = "Capital Raising for b cApital Raising for other";

    const actualValue = formatCapitalRaisingPurpose(purpose_of_borrowings);

    expect(actualValue).toBe(expectedValue);
  });
});
