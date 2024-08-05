import { removeWhitespaces } from "utils";

describe("removeWhitespaces", () => {
  it("removes redundant whitespaces", () => {
    expect(removeWhitespaces("Double  whitespace")).toBe("Double whitespace");
    expect(removeWhitespaces("Triple   whitespace")).toBe("Triple whitespace");
    expect(removeWhitespaces("Quadruple    whitespace")).toBe(
      "Quadruple whitespace"
    );
  });

  it("keeps space at the end", () => {
    expect(removeWhitespaces("Space at the end ")).toBe("Space at the end ");
  });

  it("remove double space at the end", () => {
    expect(removeWhitespaces("Double space at the end  ")).toBe(
      "Double space at the end "
    );
  });
});
