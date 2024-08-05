import asEntry from "../as_entry";
import formatName from "../format_name";

const addWitnessesSectionReplacements = (additionalOptions, lists) => {
  const addReplacement = (name, value) => {
    const entry = asEntry(name, value);
    lists.replacementList.push(entry);
  };

  addReplacement("opflSignatoryName", additionalOptions?.opfl_signatory_name); // Clear the placeholder

  if (additionalOptions?.type_of_applicant === "company") {
    lists.removeList.push({
      options: {
        needle: "{{individualOnlyWitnessPara}}",
        element: "table-row",
      },
    });
    lists.removeList.push({
      options: {
        needle: "{{individualOnlyPara}}",
        element: "table-row",
      },
    });

    switch (additionalOptions?.individuals.length) {
      case 0:
        lists.removeList.push({
          options: {
            needle: "{{corporateOnlyWitnessPara}}",
            element: "paragraph",
          },
        });

        break;
      case 1:
        lists.replacementList.push(
          asEntry(
            "borrowerName",
            additionalOptions?.individuals
              ?.map((x) => x.personal_data)
              .map((x) => formatName(x))
          )
        );
        addReplacement("corporateOnlyWitnessPara", ""); // Clear the placeholder
        break;
      default:
        lists.cloneList.push({
          options: {
            needle: "{{corporateOnlyWitnessPara}}",
            element: "table-row",
            repeat: additionalOptions?.individuals.length - 1,
          },
        });

        lists.replacementList.push(
          asEntry(
            "borrowerName",
            additionalOptions?.individuals
              ?.map((x) => x.personal_data)
              .map((x) => formatName(x))
          )
        );
        addReplacement("corporateOnlyWitnessPara", ""); // Clear the placeholder
        break;
    }
  } else {
    lists.removeList.push({
      options: {
        needle: "{{corporateOnlyWitnessPara}}",
        element: "table-row",
      },
    });
    switch (additionalOptions?.individuals.length) {
      case 0:
        lists.removeList.push({
          options: {
            needle: "{{individualOnlyWitnessPara}}",
            element: "paragraph",
          },
        });
        lists.removeList.push({
          options: {
            needle: "{{individualOnlyPara}}",
            element: "paragraph",
          },
        });
        break;
      case 1:
        lists.replacementList.push(
          asEntry(
            "borrowerName",
            additionalOptions?.individuals
              ?.map((x) => x.personal_data)
              .map((x) => formatName(x))
          )
        );
        addReplacement("individualOnlyWitnessPara", ""); // Clear the placeholder
        addReplacement("individualOnlyTableApplicantsRow", ""); // Clear the placeholder
        break;
      default:
        lists.cloneList.push({
          options: {
            needle: "{{individualOnlyWitnessPara}}",
            element: "table-row",
            repeat: additionalOptions?.individuals.length - 1,
          },
        });
        lists.cloneList.push({
          options: {
            needle: "{{individualOnlyTableApplicantsRow}}",
            element: "table-row",
            repeat: additionalOptions?.individuals.length - 1,
          },
        });

        lists.replacementList.push(
          asEntry(
            "borrowerName",
            additionalOptions?.individuals
              ?.map((x) => x.personal_data)
              .map((x) => formatName(x))
          )
        );
        addReplacement("individualOnlyWitnessPara", ""); // Clear the placeholder
        addReplacement("individualOnlyTableApplicantsRow", ""); // Clear the placeholder
        break;
    }
  }
};

export default addWitnessesSectionReplacements;
