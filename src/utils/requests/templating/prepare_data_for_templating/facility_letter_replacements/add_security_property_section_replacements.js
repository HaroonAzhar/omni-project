import { currencyFormat } from "utils";

import asEntry from "../as_entry";
import formatAddress from "../format_address";

const addSecurityPropertySectionReplacements = (properties, lists) => {
  lists.replacementList.push(asEntry("securityOnlyRow", ""));
  lists.replacementList.push(asEntry("priorChargeOnlyRow", ""));

  const secondChargeProperties = properties?.filter(
    (property) => property.charge?.opfl_charge_type === "second_charge"
  );

  const arrayPrior = secondChargeProperties?.flatMap(
    (property) => property.charge?.lenders ?? []
  );

  switch (arrayPrior?.length) {
    case 0:
      lists.removeList.push({
        options: {
          needle: "{{priorChargeOnlyRow}}",
          element: "table-row",
        },
      });
      break;
    case 1:
      lists.replacementList.push(
        asEntry(
          "priorChargeLenderNameText",
          arrayPrior?.map((x) => x.name ?? "")
        ),
        asEntry(
          "priorChargeLenderCurrentMortgageText",
          arrayPrior?.map((x) => currencyFormat(x.current_mortgage_outstanding))
        )
      );

      lists.replacementList.push(asEntry(`priorChargeOnlyPara`, ""));
      break;
    default:
      lists.cloneList.push({
        options: {
          needle: "{{priorChargeOnlyPara}}",
          element: "paragraph",
          repeat: arrayPrior?.length - 1,
        },
      });

      lists.replacementList.push(
        asEntry(
          "priorChargeLenderNameText",
          arrayPrior?.map((x) => x.name ?? "")
        ),
        asEntry(
          "priorChargeLenderCurrentMortgageText",
          arrayPrior?.map((x) => currencyFormat(x.current_mortgage_outstanding))
        )
      );

      lists.replacementList.push(asEntry(`priorChargeOnlyPara`, ""));

      break;
  }

  switch (properties?.length) {
    case 0:
      lists.removeList.push({
        options: {
          needle: "{{securityOnlyRow}}",
          element: "table-row",
        },
      });
      break;
    case 1:
      lists.replacementList.push(
        asEntry(
          "securityAddress",
          properties?.map((x) => formatAddress(x?.address))
        )
      );
      lists.replacementList.push(asEntry(`securityOnlyPara`, ""));

      break;
    default:
      lists.cloneList.push({
        options: {
          needle: "{{securityOnlyPara}}",
          element: "paragraph",
          repeat: properties?.length - 1,
        },
      });

      lists.replacementList.push(
        asEntry(
          "securityAddress",
          properties?.map((x) => formatAddress(x?.address))
        )
      );
      lists.replacementList.push(asEntry(`securityOnlyPara`, ""));

      break;
  }
};

export default addSecurityPropertySectionReplacements;
