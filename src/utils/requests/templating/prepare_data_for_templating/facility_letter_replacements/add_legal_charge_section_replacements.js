import asEntry from "../as_entry";

const addLegalChargeSectionReplacements = (property, lists) => {
  const { charge = {} } = property;
  const {
    opfl_charge_type = "",
    security_owner,
    security_owner_title,
    security_owner_forename,
    security_owner_middle_name,
    security_owner_surname,
  } = charge;

  const [chargeName] = opfl_charge_type.split("_");
  lists.replacementList.push(asEntry(`chargeNameText`, chargeName));
  if (security_owner === "third_party") {
    const securityOwnerName = [
      security_owner_title,
      security_owner_forename,
      security_owner_middle_name,
      security_owner_surname,
    ]
      .filter(Boolean)
      .join(" ");

    lists.replacementList.push(
      asEntry(`securityOwnerNameText`, securityOwnerName)
    );
    lists.removeList.push({
      options: {
        needle: "{{nonThirdPartyLegalChargeOnly}}",
        element: "paragraph",
      },
    });
  } else {
    lists.removeList.push({
      options: {
        needle: "{{thirdPartyLegalChargeOnly}}",
        element: "paragraph",
      },
    });
  }

  lists.replacementList.push(asEntry(`nonThirdPartyLegalChargeOnly`, ""));
  lists.replacementList.push(asEntry(`thirdPartyLegalChargeOnly`, ""));
  lists.replacementList.push(asEntry(`legalChargePara`, ""));
};

export default addLegalChargeSectionReplacements;
