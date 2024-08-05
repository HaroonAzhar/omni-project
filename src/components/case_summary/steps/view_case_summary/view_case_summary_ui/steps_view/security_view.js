import React from "react";
import PropTypes from "prop-types";
import { titleize } from "inflected";

import { Table } from "components/molecules";
import { currencyFormat, dateFormat, propertyAddressFormat } from "utils";

import { SECURITY } from "../../../../case_summary_steps";
import { RichTextContent, StepView, Columns, Column } from "../shared";

const columns = [
  {
    Header: "",
    accessor: "name",
  },
  {
    Header: "Title Numbers",
    accessor: "titleNumbers",
  },
  {
    Header: "Surveyor",
    accessor: "surveyor",
  },
  {
    Header: "Date",
    accessor: "inspectionDate",
  },
  {
    Header: "OMV",
    accessor: "omv",
  },
  {
    Header: "OMV 90 day",
    accessor: "omv90day",
  },
];

const SecurityView = ({
  titleNumbers = [],
  analysisOfProperty,
  descriptionOfProperty,
  propertiesData = [],
  valuer = "",
}) => {
  const propertiesTableData = propertiesData.map((property) => ({
    ...property,
    name: propertyAddressFormat(property),
    surveyor: [property.surveyorFirm, property.surveyorIndividual]
      .filter(Boolean)
      .join(", "),
    inspectionDate: dateFormat(property.inspection_date),
    omv: currencyFormat(property.omv),
    omv90day: currencyFormat(property.omv_90_day),
    titleNumbers: property.title_numbers?.join(", "),
  }));
  return (
    <StepView
      title={`${titleize(SECURITY)} - ${titleNumbers.join(" ")} - ${valuer}`}
    >
      <Table
        columns={columns}
        data={propertiesTableData}
        shouldShowHeaders={true}
      />
      <Columns>
        <Column>
          <RichTextContent title="Description of property">
            {descriptionOfProperty}
          </RichTextContent>
        </Column>
        <Column>
          <RichTextContent title="Analysis of Property">
            {analysisOfProperty}
          </RichTextContent>
        </Column>
      </Columns>
    </StepView>
  );
};

SecurityView.propTypes = {
  valuer: PropTypes.string,
  descriptionOfProperty: PropTypes.string,
  analysisOfProperty: PropTypes.string,
  titleNumbers: PropTypes.array,
  propertiesData: PropTypes.array,
};

export default SecurityView;
