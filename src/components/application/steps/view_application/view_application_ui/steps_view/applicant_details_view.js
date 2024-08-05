import React from "react";
import PropTypes from "prop-types";
import * as _ from "lodash";

import { capitalize, dateFormat, numberMonths, escapeTitlize } from "utils";
import { Accordion } from "components/molecules";

import {
  StepView,
  Columns,
  Column,
  Rows,
  ViewRowLeftRight,
  ViewRowMulti,
  RenderSectionConditionally,
} from "../shared";
import { useExpandForStatus } from "./hooks";

const contactPreferred = (contactType, contact, preferred) => {
  const contactText = contact ?? "";

  if (contactType === preferred) {
    return `${contactText} (Preferred)`;
  }
  return `${contactText}`;
};

const formatMonthsYears = (years, months) => {
  return `${numberMonths(years, "Years")} ${numberMonths(months, "Months")}`;
};

const ApplicantDetailsItem = ({ individual, status, expanded }) => {
  const isExpanded = useExpandForStatus(status, expanded, "New");

  const otherAddresses = individual?.addresses.slice(1);

  const generateTitle = (forename, surname, preferred) => {
    const fullNameText = `${capitalize(forename ?? "")} ${capitalize(
      surname ?? ""
    )}`;

    if (preferred === "either" || preferred === undefined)
      return `${fullNameText}`;

    const preferredContactText = `${
      individual?.contact?.[`${preferred}`]
    } (${capitalize((preferred ?? "").split("_")[0])})`;

    return [fullNameText, preferredContactText].filter(Boolean).join(" - ");
  };

  return (
    <Columns>
      <StepView
        title={generateTitle(
          individual?.personal_data?.forename,
          individual?.personal_data?.surname,
          individual?.contact?.contact_method
        )}
        status={status}
        expanded={isExpanded}
      >
        <RenderSectionConditionally status={status}>
          <Rows>
            <Column>
              <ViewRowLeftRight
                title="Name:"
                value={`${escapeTitlize(
                  individual?.personal_data?.forename
                )} ${escapeTitlize(individual?.personal_data?.surname)}`}
              />
              <ViewRowLeftRight
                title="Other Name:"
                value={escapeTitlize(individual?.personal_data?.other_name)}
              />
              <ViewRowLeftRight
                title="Middle Name:"
                value={escapeTitlize(individual?.personal_data?.middle_name)}
              />
              <ViewRowLeftRight
                title="Mothers Maiden Name:"
                value={escapeTitlize(
                  individual?.personal_data?.mothers_maiden_name
                )}
              />
              <ViewRowLeftRight
                title="Property Residence:"
                value={escapeTitlize(
                  individual?.personal_data
                    ?.information_regarding_property_residence
                )}
              />

              <ViewRowMulti
                title="Address:"
                value={[
                  [individual?.addresses?.[0]?.address_line_1],
                  [individual?.addresses?.[0]?.address_line_2],
                  [individual?.addresses?.[0]?.city],
                  [individual?.addresses?.[0]?.postcode],
                ]}
              />
              <ViewRowLeftRight
                title="Time At Address:"
                value={formatMonthsYears(
                  individual?.addresses?.[0]?.how_long_here_years,
                  individual?.addresses?.[0]?.how_long_here_months
                )}
              />

              {!_.isEmpty(otherAddresses) && (
                <Accordion title="Other Addresses" defaultExpanded={!expanded}>
                  {otherAddresses.map((address) => {
                    return (
                      <ViewRowMulti
                        title="Address:"
                        value={[
                          [address?.address_line_1],
                          [address?.address_line_2],
                          [address?.city],
                          [address?.postcode],
                        ]}
                      />
                    );
                  })}
                </Accordion>
              )}
            </Column>
            <Column>
              <ViewRowLeftRight
                title="Date of Birth:"
                value={dateFormat(individual?.personal_data?.date_of_birth)}
              />
              <ViewRowLeftRight
                title="Place of Birth:"
                value={individual?.personal_data?.city_of_birth}
              />
              <ViewRowLeftRight
                title="National Insurance:"
                value={`${escapeTitlize(
                  individual?.personal_data?.insurance_number
                )}`}
              />
              <ViewRowLeftRight
                title="Nationality:"
                value={`${
                  individual?.personal_data?.has_dual_nationality
                    ? `British/`
                    : ""
                }${escapeTitlize(individual?.personal_data?.nationality)}`}
              />
              <ViewRowLeftRight
                title="Right To Reside:"
                value={`${escapeTitlize(
                  individual?.personal_data?.uk_residential_status
                )}`}
              />
              <ViewRowLeftRight
                title="Residential Status:"
                value={`${escapeTitlize(
                  individual?.personal_data?.uk_residential_status
                )}`}
              />
              <ViewRowLeftRight
                title="Home:"
                value={contactPreferred(
                  "home_phone",
                  individual?.contact?.home_phone,
                  individual?.contact?.contact_method
                )}
              />

              <ViewRowLeftRight
                title="Mobile:"
                value={contactPreferred(
                  "mobile_phone",
                  individual?.contact?.mobile_phone,
                  individual?.contact?.contact_method
                )}
              />
              <ViewRowLeftRight
                title="Work:"
                value={contactPreferred(
                  "work_phone",
                  individual?.contact?.work_phone,
                  individual?.contact?.contact_method
                )}
              />
              <ViewRowLeftRight
                title="Email:"
                value={contactPreferred(
                  "email",
                  individual?.contact?.email,
                  individual?.contact?.contact_method
                )}
              />
              <ViewRowLeftRight
                title="Number of Dependents:"
                value={`${escapeTitlize(
                  individual?.contact?.number_of_dependants
                )}`}
              />
            </Column>
          </Rows>
        </RenderSectionConditionally>
      </StepView>
    </Columns>
  );
};

const ApplicantDetailsView = ({ individuals, status, expanded }) => {
  const isExpanded = useExpandForStatus(status, expanded, "New");

  return (
    <StepView
      title="Director/Shareholder Details [or Application Details for individual application]"
      status={status}
      expanded={isExpanded}
    >
      <RenderSectionConditionally status={status}>
        {individuals?.map((individual) => {
          return (
            <ApplicantDetailsItem
              key={individual.applicant_id}
              individual={individual}
              status={individual.status}
              expanded={expanded}
            />
          );
        })}
      </RenderSectionConditionally>
    </StepView>
  );
};

ApplicantDetailsItem.propTypes = {
  status: PropTypes.string,
  individual: PropTypes.object,
  expanded: PropTypes.bool,
};
ApplicantDetailsView.propTypes = {
  status: PropTypes.string,
  individuals: PropTypes.array,
  expanded: PropTypes.bool,
};

export default ApplicantDetailsView;
