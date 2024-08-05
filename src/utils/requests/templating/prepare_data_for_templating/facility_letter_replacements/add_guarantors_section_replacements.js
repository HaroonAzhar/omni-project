import asEntry from "../as_entry";
import formatName from "../format_name";
import formatAddress from "../format_address";
import getGuarantors from "../../../../../components/pages/loan_facility/pdf/document/particulars/get_guarantors";

const addGuarantorsSectionReplacements = (application, lists) => {
  const applicants = application?.individuals;

  const guarantors = getGuarantors(application);

  lists.replacementList.push(asEntry("guarantorOnlyRow", ""));

  lists.replacementList.push(asEntry("guarantorsPara", ""));

  switch (guarantors.length) {
    case 0:
      lists.removeList.push({
        options: {
          needle: "{{guarantorOnlyRow}}",
          element: "table-row",
        },
      });
      break;
    case 1:
      lists.replacementList.push(
        asEntry(
          "g_Name",
          guarantors.map((x) => x.personal_data).map((x) => formatName(x))
        )
      );
      lists.replacementList.push(
        asEntry(
          "g_Address",
          guarantors.map((x) => formatAddress(x?.addresses[0]))
        )
      );
      break;
    default:
      lists.cloneList.push({
        options: {
          needle: "{{guarantorsPara}}",
          element: "paragraph",
          repeat: applicants?.length - 1,
        },
      });

      lists.replacementList.push(
        asEntry(
          "g_Name",
          guarantors.map((x) => x.personal_data).map((x) => formatName(x))
        )
      );
      lists.replacementList.push(
        asEntry(
          "g_Address",
          guarantors.map((x) => formatAddress(x?.addresses[0]))
        )
      );
      break;
  }

  const guaranteesText =
    guarantors.length > 1
      ? `Guarantees in a form specified by the Lender, executed or to be executed, by the Guarantors`
      : `A guarantee in a form specified by the Lender, executed or to be executed, by the Guarantor`;

  lists.replacementList.push(asEntry("guaranteesText", guaranteesText));
};

export default addGuarantorsSectionReplacements;
