import asEntry from "./as_entry";

function addRiskReplacements({
  data: { application },
  lists: { cloneList, removeList, replacementList },
}) {
  const risks = application.summary.risk_mitigations?.risk_inputs ?? [];
  const addReplacement = (name, value) => {
    const entry = asEntry(name, value);
    replacementList.push(entry);
  };
  switch (risks.length) {
    case 0:
      removeList.push({
        options: { needle: "{{riskRow}}", element: "table-row" },
      });
      break;
    case 1:
      break;
    default:
      cloneList.push({
        options: {
          needle: "{{riskRow}}",
          element: "table-row",
          repeat: risks.length - 1,
        },
      });
      break;
  }
  addReplacement(
    "risk",
    risks.map((r) => r.risk)
  );
  addReplacement(
    "riskMitigation",
    risks.map((r) => r.mitigation)
  );
  addReplacement("riskRow", "");
}

export default addRiskReplacements;
