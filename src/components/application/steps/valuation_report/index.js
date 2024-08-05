import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { ApplicationFlowContainer } from "components/templates";
import { saveValuationReport } from "store/application/actions";
import { saveValuationReportFlow } from "utils/requests";
import { H1 } from "components/atoms";
import { useFetchAndStoreApplicants } from "components/application/helpers/hooks";
import { useInfoMessage } from "hooks";

import Form1 from "./form_1";
import Form2 from "./form_2";
import Form3 from "./form_3";
import Form4 from "./form_4";
import Form5 from "./form_5";
import ValuationReportHomeScreen from "./valuation_report_home_screen";

const getPropertyName = (property = {}) =>
  property.address && property.address.line_1;

const forms = [
  {
    component: Form1,
  },
  {
    component: Form2,
  },
  {
    component: Form3,
  },
  {
    component: Form4,
  },
  {
    component: Form5,
  },
];

const getPropertyId = (properties, index) => {
  return properties && properties[index] && properties[index].id;
};

const ValuationReportTool = () => {
  const { id: caseId, indexOfElement: indexOfProperty } = useParams();

  const properties = useSelector(({ application }) => application.properties);
  const propertyId = getPropertyId(properties, indexOfProperty);

  const savingRequest = (_, propertiesFromStore) => {
    const payload = propertiesFromStore[indexOfProperty].valuation_report;
    payload.status = "Edited";
    payload.date_edited = new Date();
    return saveValuationReportFlow(caseId, propertyId, payload);
  };
  const saveFlowToStore = (data) => saveValuationReport(data, indexOfProperty);

  const [, setInfoBox] = useInfoMessage();
  const sendInitialRequest = useFetchAndStoreApplicants({
    showInfoBox: setInfoBox,
  });

  useEffect(() => {
    sendInitialRequest();
  }, [sendInitialRequest]);
  if (indexOfProperty) {
    if (
      properties &&
      properties[indexOfProperty] &&
      properties[indexOfProperty].status !== "New"
    ) {
      const propertyName = getPropertyName(properties[indexOfProperty]);
      const title = `Valuation report - ${propertyName}`;
      return (
        <ApplicationFlowContainer
          title={title}
          flowKey="valuation_report"
          shouldShowFinalPopUp={true}
          shouldShowBackToChecklist={false}
          forms={forms}
          flowStoreName="properties"
          savingRequest={savingRequest}
          saveFlowToStore={saveFlowToStore}
          shouldUseApplicationData={true}
        />
      );
    } else {
      return <H1> Security details not completed</H1>;
    }
  } else {
    return <ValuationReportHomeScreen nextStepName="solicitor_details" />;
  }
};

export default ValuationReportTool;
