import React from "react";

import {
  ChecklistRowChildren,
  ChecklistRowDescription,
  ChecklistRowTitle,
  ChecklistRowWrapper,
  ChecklistRowSignature,
  ChecklistHeaderContent,
} from "./styled_origination_checklist";
export default function ChecklistHeader() {
  return (
    <ChecklistHeaderContent>
      <ChecklistRowWrapper>
        <ChecklistRowTitle>Section</ChecklistRowTitle>
        <ChecklistRowDescription>Note</ChecklistRowDescription>

        <ChecklistRowSignature>First Sign-off</ChecklistRowSignature>
        <ChecklistRowSignature>Secondary Sign-off</ChecklistRowSignature>

        <ChecklistRowChildren>Details</ChecklistRowChildren>
      </ChecklistRowWrapper>
    </ChecklistHeaderContent>
  );
}
