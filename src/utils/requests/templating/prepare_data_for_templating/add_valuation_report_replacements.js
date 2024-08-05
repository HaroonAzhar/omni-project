import { currencyFormat, dateFormat } from "utils";

import formatNumber from "./format_number";
import asEntry from "./as_entry";
import { numberedEntries } from "./helpers";

const mapBoolFromValuationReport = (properties, name_of_field) =>
  properties.reduce(
    (prev, { valuation_report = {} }) =>
      prev || valuation_report[name_of_field],
    false
  )
    ? "Yes"
    : "No";

const addValuationReportReplacements = ({
  data: { application },
  lists: { removeList, replacementList },
}) => {
  const addReplacement = (name, value) => {
    const entry = asEntry(name, value);
    replacementList.push(entry);
  };

  const { properties = [] } = application;

  addReplacement(
    "s_singleMultiUnit",
    numberedEntries(
      properties.map(({ valuation_report = {} }) =>
        valuation_report.number_of_units === "1" ? "Single-unit" : "Multi-unit"
      )
    )
  ); // e.g. ["Multi-unit"]
  addReplacement(
    "s_areaPrice",
    numberedEntries(
      properties.map(
        ({ valuation_report = {} }) =>
          valuation_report.price_per_square_foot &&
          `${currencyFormat(valuation_report.price_per_square_foot)} /sq. ft`
      )
    )
  ); //  e.g. ["1033 / sqm (land only)"]
  addReplacement(
    "s_totalArea",
    numberedEntries(
      properties.map(
        ({ valuation_report = {} }) =>
          valuation_report.total_square_feet &&
          `${formatNumber(valuation_report.total_square_feet)} sq. ft`
      )
    )
  ); //  e.g. ["0.39 acres / 0.16 hectares (land only)"]
  addReplacement(
    "s_marketRent",
    numberedEntries(
      properties.map(({ valuation_report = {} }) =>
        currencyFormat(valuation_report.market_rent, "-")
      )
    )
  ); // e.g. ["1000"]
  addReplacement(
    "s_valuerIndividual",
    numberedEntries(
      properties.map(
        ({ valuation_report = {} }) =>
          valuation_report.name_of_the_individual_surveyor
      )
    )
  ); // e.g. ["Jonathan Steele"]
  addReplacement(
    "s_valuerFirm",
    numberedEntries(
      properties.map(({ valuation_report = {} }) => valuation_report.surveyor)
    )
  ); //  e.g. ["Graham and Sibbald"]
  addReplacement(
    "s_valuer",
    numberedEntries(
      properties.map(
        ({ valuation_report = {} }) =>
          `${valuation_report.name_of_the_individual_surveyor ?? ""}\n${
            valuation_report.surveyor ?? ""
          }`
      )
    )
  );
  addReplacement(
    "s_valuationDate",
    numberedEntries(
      properties.map(({ valuation_report = {} }) =>
        dateFormat(valuation_report.inspection_date)
      )
    )
  ); // - e.g. ["05/08/2020"]
  addReplacement(
    "s_planningReference",
    numberedEntries(
      properties.map(({ valuation_report = {} }) =>
        valuation_report.planning_reference_numbers?.join(" ")
      )
    )
  ); //  e.g. ["20/00496/FUL"]
  addReplacement("s_planningExpiryDate", ""); // Not currently captured? - e.g. ["04/06/2023"]
  addReplacement(
    "s_planningLinks",
    numberedEntries(
      properties.map(
        ({ valuation_report = {} }) =>
          valuation_report.link_to_planning_permission
      )
    )
  );

  addReplacement(
    "s_sstNitrateNeutrality",
    mapBoolFromValuationReport(properties, "nitrate_neutrality")
  ); //  - e.g. ["No"]
  addReplacement("s_sstAONB", mapBoolFromValuationReport(properties, "anob")); //  - e.g. ["No"]
  addReplacement(
    "s_sstListed",
    mapBoolFromValuationReport(properties, "listed_grade")
  ); //  - e.g. ["No"]
  addReplacement(
    "s_sstFloodZone",
    mapBoolFromValuationReport(properties, "flood_zone")
  ); //  - e.g. ["No"]
  addReplacement("s_sstSANG", mapBoolFromValuationReport(properties, "sang")); //  - e.g. ["No"]
  addReplacement(
    "s_sstGreenBelt",
    mapBoolFromValuationReport(properties, "green_belt")
  ); //  - e.g. ["No"]
  addReplacement("s_sstSSSI", mapBoolFromValuationReport(properties, "sssi")); //  - e.g. ["No"]
  addReplacement("s_sstESW1", mapBoolFromValuationReport(properties, "esw1")); //  - e.g. ["No"]
  addReplacement("s_sstComment", ""); // Not currently captured?

  // Facility Letter Replacements
  if (mapBoolFromValuationReport(properties, "nitrate_neutrality") !== "Yes") {
    removeList.push({
      options: {
        needle: "{{nitrateNeutralityOnlyPara}}",
        element: "paragraph",
      },
    });
  }
  addReplacement("nitrateNeutralityOnlyPara", ""); // Not currently captured?
  if (mapBoolFromValuationReport(properties, "anob") !== "Yes") {
    removeList.push({
      options: {
        needle: "{{aonbOnlyPara}}",
        element: "paragraph",
      },
    });
  }
  addReplacement("aonbOnlyPara", ""); // Not currently captured?
  if (mapBoolFromValuationReport(properties, "listed_grade") !== "Yes") {
    removeList.push({
      options: {
        needle: "{{listedBuildingOnlyPara}}",
        element: "paragraph",
      },
    });
  }
  addReplacement("listedBuildingOnlyPara", ""); // Not currently captured?
  if (mapBoolFromValuationReport(properties, "flood_zone") !== "Yes") {
    removeList.push({
      options: {
        needle: "{{floodzoneOnlyPara}}",
        element: "paragraph",
      },
    });
  }
  addReplacement("floodzoneOnlyPara", ""); // Not currently captured?
  if (mapBoolFromValuationReport(properties, "sang") !== "Yes") {
    removeList.push({
      options: {
        needle: "{{sangOnlyPara}}",
        element: "paragraph",
      },
    });
  }
  addReplacement("sangOnlyPara", ""); // Not currently captured?
  if (mapBoolFromValuationReport(properties, "green_belt") !== "Yes") {
    removeList.push({
      options: {
        needle: "{{greenbeltOnlyPara}}",
        element: "paragraph",
      },
    });
  }
  addReplacement("greenbeltOnlyPara", ""); // Not currently captured?
  if (mapBoolFromValuationReport(properties, "sssi") !== "Yes") {
    removeList.push({
      options: {
        needle: "{{sssiOnlyPara}}",
        element: "paragraph",
      },
    });
  }
  addReplacement("sssiOnlyPara", ""); // Not currently captured?
  if (mapBoolFromValuationReport(properties, "esw1") !== "Yes") {
    removeList.push({
      options: {
        needle: "{{esw1OnlyPara}}",
        element: "paragraph",
      },
    });
  }
  addReplacement("esw1OnlyPara", ""); // Not currently captured?
};

export default addValuationReportReplacements;
