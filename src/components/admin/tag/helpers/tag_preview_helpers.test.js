import { isBackgroundDark } from "./tag_preview_helpers";
describe(" Tests for 'isBackgroundDark' helper function", () => {
  test("returns true for no value ", () => {
    const result = isBackgroundDark();

    expect(result).toStrictEqual(true);
  });

  test("returns true for a dark color code ", () => {
    const result = isBackgroundDark("#000000");

    expect(result).toStrictEqual(true);
  });

  test("returns false for a bright color code ", () => {
    const result = isBackgroundDark("#ffffff");

    expect(result).toStrictEqual(false);
  });
});
