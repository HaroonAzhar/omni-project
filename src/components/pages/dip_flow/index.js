import React from "react";

import DipFlowTemplate from "components/templates/dip_flow_template";

const DipFlow = () => {
  return (
    <DipFlowTemplate
      canSkipAddressValidation={false}
      caseStage="dip"
      skipGeneratePdf={false}
    />
  );
};

export default DipFlow;
