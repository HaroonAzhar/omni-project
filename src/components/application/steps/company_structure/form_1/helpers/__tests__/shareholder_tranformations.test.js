import makeTreeFromLinear from "../makeTreeFromLinear";
import makeLinearFromTree from "../makeLinearFromTree";
import {
  expectedEntriesRepresentation,
  entiresDetails,
  structureOfEntries,
} from "./data_for_test.json";

describe("Shareholder transformations", () => {
  it("makeTreeFromLinear", () => {
    const entriesRepresentation = makeTreeFromLinear(
      entiresDetails,
      structureOfEntries
    );

    expect(entriesRepresentation).toEqual(expectedEntriesRepresentation);
  });

  it("bidrectional", () => {
    const [
      intermediateEntriesDetails,
      intermediateStructureOfEntries,
    ] = makeLinearFromTree(expectedEntriesRepresentation);

    const entriesRepresentation = makeTreeFromLinear(
      intermediateEntriesDetails,
      intermediateStructureOfEntries
    );

    expect(entriesRepresentation).toEqual(expectedEntriesRepresentation);
  });
});
