import React from "react";
import PropTypes from "prop-types";

import { dateFormat, escapeTitlize, mapBooleanFieldToString } from "utils";

import {
  StepView,
  Rows,
  Column,
  ViewRowLeftRight,
  ViewRowMulti,
  RenderSectionConditionally,
} from "../shared";
import { useExpandForStatus } from "./hooks";
import { DirectorsShareholdersWrapper } from "../shared/shared_styles";

const percentFormatDirector = (number) => {
  if (number === undefined) {
    return "";
  }
  return `${(+number).toFixed(0)}%`;
};

const CompanyDetailsView = ({ companies, status, expanded }) => {
  const mergeDirectorsShareholders = () => [
    ...(companies?.directors ?? []).map((director) => ({
      ...director,
      role: "director",
    })),
    ...(companies?.shared_holders ?? []).map((shareholder) => ({
      ...shareholder,
      role: "shareholder",
    })),
  ];

  const mergedDirectorsShareholders = mergeDirectorsShareholders();

  const isExpanded = useExpandForStatus(status, expanded, "New");

  return (
    <StepView
      title={`${escapeTitlize("Company Details")}${
        companies?.base_data?.name !== undefined
          ? ` - ${escapeTitlize(companies?.base_data?.name)}`
          : ""
      }`}
      status={status}
      expanded={isExpanded}
    >
      <RenderSectionConditionally status={status}>
        <Rows>
          <Column>
            <ViewRowLeftRight
              title="Company Name:"
              value={escapeTitlize(companies?.base_data?.name)}
            />
            <ViewRowLeftRight
              title="Company Email:"
              value={companies?.base_data?.email}
            />
            <ViewRowMulti
              title="Contact Address:"
              value={[
                [
                  companies?.address?.is_correspondence_same
                    ? companies?.address?.registered?.address_line_1
                    : companies?.address?.correspondence?.address_line_1,
                ],
                [
                  companies?.address?.is_correspondence_same
                    ? companies?.address?.registered?.address_line_2
                    : companies?.address?.correspondence?.address_line_2,
                ],
                [
                  companies?.address?.is_correspondence_same
                    ? companies?.address?.registered?.city
                    : companies?.address?.correspondence?.city,
                ],
                [
                  companies?.address?.is_correspondence_same
                    ? companies?.address?.registered?.postcode
                    : companies?.address?.correspondence?.postcode,
                ],
              ]}
            />
            <ViewRowMulti
              title="Registered Address:"
              value={[
                [companies?.address?.registered?.address_line_1],
                [companies?.address?.registered?.address_line_2],
                [companies?.address?.registered?.city],
                [companies?.address?.registered?.postcode],
              ]}
            />
            <ViewRowLeftRight
              title="Nature of Business:"
              value={companies?.base_data?.nature_of_business}
            />
            <ViewRowLeftRight
              title="Trading Since:"
              value={companies?.base_data?.trading_since}
            />
            <ViewRowLeftRight
              title="Incorporation Date:"
              value={dateFormat(companies?.base_data?.date_of_incorporation)}
            />
          </Column>
          <Column>
            <DirectorsShareholdersWrapper>
              <ViewRowLeftRight
                title={`Directors/Partners/Shareholders (${
                  mergedDirectorsShareholders?.length
                    ? mergedDirectorsShareholders?.length
                    : ""
                })`}
                value="Guarantor?"
                align_right={false}
              />

              {mergedDirectorsShareholders?.map((director) => {
                return (
                  <>
                    <ViewRowLeftRight
                      title={`- ${escapeTitlize(
                        director?.name
                      )} ${escapeTitlize(
                        director?.role
                      )} ${percentFormatDirector(director?.held)}`}
                      value={mapBooleanFieldToString(director?.is_guarantor)}
                      align_right={false}
                    />
                  </>
                );
              })}
            </DirectorsShareholdersWrapper>

            <ViewRowLeftRight
              title="Company Accountant:"
              value={companies?.accountant?.name}
            />
            <ViewRowLeftRight
              title="Firm:"
              value={companies?.accountant?.firm}
            />
            <ViewRowLeftRight
              title="Qualification:"
              value={companies?.accountant?.qualification}
            />

            <ViewRowMulti
              title="Address:"
              value={[
                [companies?.accountant?.address?.address_line_1],
                [companies?.accountant?.address?.address_line_2],
                [companies?.accountant?.address?.city],
                [companies?.accountant?.address?.postcode],
              ]}
            />
          </Column>
        </Rows>
      </RenderSectionConditionally>
    </StepView>
  );
};

CompanyDetailsView.propTypes = {
  status: PropTypes.string,
  companies: PropTypes.object,
  expanded: PropTypes.bool,
};

export default CompanyDetailsView;
