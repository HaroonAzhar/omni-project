import asEntry from "../as_entry";
import formatName from "../format_name";
import formatAddress from "../format_address";

const addThePartiesSectionReplacements = (application, lists) => {
  const addReplacement = (name, value) => {
    const entry = asEntry(name, value);
    lists.replacementList.push(entry);
  };

  const applicants = application?.individuals;

  if (application?.type_of_applicant === "company") {
    lists.replacementList.push(asEntry("companyOnlyRow", ""));

    lists.replacementList.push(
      asEntry("companyName", `${application?.company_name}`)
    );
    lists.replacementList.push(
      asEntry("companyNo", `${application?.company_number}`)
    );

    lists.replacementList.push(
      asEntry(
        "companyAddress",
        formatAddress(application?.company[0]?.address?.registered)
      )
    );
    lists.removeList.push({
      options: {
        needle: "{{individualBorrowerOnlyRow}}",
        element: "table-row",
      },
    });
    lists.removeList.push({
      options: {
        needle: "{{individualOnlyTable}}",
        element: "table-row",
      },
    });

    lists.removeList.push({
      options: {
        needle: "{{individualTransactionDocumentsOnlyPara}}",
        element: "paragraph",
      },
    });
  } else {
    switch (applicants?.length) {
      case 0:
        lists.removeList.push({
          options: {
            needle: "{{individualBorrowerOnlyRow}}",
            element: "table-row",
          },
        });
        break;
      case 1:
        lists.replacementList.push(
          asEntry(
            "a_Name",
            applicants?.map((x) => x.personal_data).map((x) => formatName(x))
          )
        );
        lists.replacementList.push(
          asEntry(
            "a_Address",
            applicants?.map((x) => formatAddress(x?.addresses?.[0]))
          )
        );
        break;
      default:
        lists.cloneList.push({
          options: {
            needle: "{{applicantsPara}}",
            element: "paragraph",
            repeat: applicants?.length - 1,
          },
        });

        lists.replacementList.push(
          asEntry(
            "a_Name",
            applicants?.map((x) => x.personal_data).map((x) => formatName(x))
          )
        );
        lists.replacementList.push(
          asEntry(
            "a_Address",
            applicants?.map((x) => formatAddress(x?.addresses[0]))
          )
        );
        break;
    }

    lists.removeList.push({
      options: {
        needle: "{{companyOnlyRow}}",
        element: "table-row",
      },
    });
    lists.removeList.push({
      options: {
        needle: "{{companyTransactionDocumentsOnlyPara}}",
        element: "paragraph",
      },
    });
  }
  addReplacement("companyTransactionDocumentsOnlyPara", ""); // Clear placeholders
  addReplacement("individualTransactionDocumentsOnlyPara", ""); // Clear placeholders
  addReplacement("individualOnlyTable", ""); // Clear placeholders
  addReplacement("individualBorrowerOnlyRow", ""); // Clear placeholders
  addReplacement("individualOnlyRow", ""); // Clear placeholders
  addReplacement("individualOnlyTable", ""); // Clear placeholders
  addReplacement("applicantsPara", ""); // Clear placeholders
};

export default addThePartiesSectionReplacements;
