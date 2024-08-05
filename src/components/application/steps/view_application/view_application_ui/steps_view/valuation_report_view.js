import React from "react";
import PropTypes from "prop-types";
import { capitalize } from "inflected";

import { currencyFormat, dateFormat, escapeTitlize, numberMonths } from "utils";

import {
  StepView,
  Columns,
  Rows,
  Column,
  ViewRowLeftRight,
  ViewRowMulti,
  RenderSectionConditionally,
} from "../shared";
import { useExpandForStatus } from "./hooks";

const generatePropertyTitle = (line1, city, postCode, surveyor, value) => {
  const line1Text = line1 !== "undefined" ? `${capitalize(line1)}` : "";
  const cityText = city !== "undefined" ? `, ${capitalize(city)}` : "";
  const postCodeText = postCode !== "undefined" ? `, ${postCode}` : "";
  const surveyorText = surveyor !== undefined ? ` - ${surveyor}` : "";
  const valueText = value !== undefined ? ` - ${currencyFormat(value)}` : "";

  return `${line1Text}${cityText}${postCodeText}${surveyorText}${valueText}`;
};

const ValuationReportItem = ({ property, status, expanded }) => {
  const isExpanded = useExpandForStatus(status, expanded, "New");

  return (
    <Columns>
      <StepView
        title={generatePropertyTitle(
          property?.address?.line_1,
          property?.address?.city,
          property?.address?.postcode,
          property?.valuation_report?.surveyor,
          property?.valuation_report?.market_value
        )}
        status={status}
        expanded={isExpanded}
      >
        <RenderSectionConditionally status={status}>
          <Rows>
            <Column>
              <ViewRowLeftRight
                title="Status:"
                value={escapeTitlize(property?.valuation_report?.status)}
              />
              <ViewRowLeftRight
                title="Surveyor"
                value={property?.valuation_report?.surveyor}
              />
              <ViewRowLeftRight
                title="Valuation Basis"
                value={escapeTitlize(
                  property?.valuation_report?.valuation_basis
                )}
              />
              <ViewRowLeftRight
                title="Valuation Method"
                value={escapeTitlize(
                  property?.valuation_report?.valuation_method
                )}
              />
              <ViewRowLeftRight
                title="Report Date"
                value={dateFormat(property?.valuation_report?.report_date)}
              />
              <ViewRowLeftRight
                title="Inspection Date"
                value={dateFormat(property?.valuation_report?.inspection_date)}
              />
              <ViewRowLeftRight
                title="Title Number"
                value={escapeTitlize(property?.valuation_report?.title_no)}
              />
              <ViewRowLeftRight
                title="Security Description"
                value={property?.valuation_report?.security_description}
              />
              <ViewRowLeftRight
                title="Security Subtype"
                value={
                  property?.valuation_report?.security_subtype === undefined
                    ? null
                    : `${escapeTitlize(
                        property?.valuation_report?.security_subtype
                      )} [${escapeTitlize(
                        property?.valuation_report?.number_of_units
                      )}] units`
                }
              />
              <ViewRowLeftRight
                title="Planning Permission"
                value={
                  property?.valuation_report?.planning_required
                    ? `Required [${property?.valuation_report?.link_to_planning_permission}]`
                    : ""
                }
              />
              <ViewRowLeftRight
                title="Planning Reference No.s"
                value={`${
                  property?.valuation_report?.planning_reference_numbers !==
                  undefined
                    ? property?.valuation_report?.planning_reference_numbers?.map(
                        (number) => number
                      )
                    : ""
                }`}
              />
              <ViewRowLeftRight
                title="Country"
                value={escapeTitlize(property?.valuation_report?.country)}
              />

              <ViewRowMulti
                title="Conditions:"
                value={[
                  property?.valuation_report?.nitrate_neutrality && [
                    "- Nitrate Neutrality",
                  ],
                  property?.valuation_report?.listed_grade && [
                    "- Listed Grade I or II",
                  ],
                  property?.valuation_report?.sang && ["- SANG"],
                  property?.valuation_report?.sssi && ["- SSSI"],
                  property?.valuation_report?.anob && ["- ANOB"],
                  property?.valuation_report?.esw1 && ["- EWS1 is required"],
                  property?.valuation_report?.flood_zone && ["- Flood Zone"],
                  property?.valuation_report?.green_belt && ["- Green Belt"],
                ]}
                multi={true}
              />

              <ViewRowLeftRight
                title="Build Duration"
                value={
                  property?.valuation_report?.build_duration === undefined
                    ? null
                    : `${numberMonths(
                        property?.valuation_report?.build_duration,
                        "Months"
                      )} from (${dateFormat(
                        property?.valuation_report?.commencement_date_of_works
                      )})`
                }
              />
            </Column>
            <Column>
              <ViewRowLeftRight
                title="Market Value"
                value={
                  property?.valuation_report?.market_value === undefined
                    ? null
                    : currencyFormat(property?.valuation_report?.market_value)
                }
              />
              <ViewRowLeftRight
                title="Market Value (90 Days)"
                value={
                  property?.valuation_report?.day_value === undefined
                    ? null
                    : currencyFormat(property?.valuation_report?.day_value)
                }
              />
              <ViewRowLeftRight
                title="GDV"
                value={
                  property?.valuation_report?.gdv === undefined
                    ? null
                    : currencyFormat(property?.valuation_report?.gdv)
                }
              />
              <ViewRowLeftRight
                title="GDV (90 Days)"
                value={
                  property?.valuation_report?.day_gdv === undefined
                    ? null
                    : currencyFormat(property?.valuation_report?.day_gdv)
                }
              />
              <ViewRowLeftRight
                title="Reinstatement Value"
                value={
                  property?.valuation_report?.reinstatement_value === undefined
                    ? null
                    : currencyFormat(
                        property?.valuation_report?.reinstatement_value
                      )
                }
              />
              <ViewRowLeftRight
                title="Market Rent"
                value={
                  property?.valuation_report?.market_rent === undefined
                    ? null
                    : currencyFormat(property?.valuation_report?.market_rent)
                }
              />
              <ViewRowLeftRight
                title="Price"
                value={
                  property?.valuation_report?.price_per_square_foot ===
                  undefined
                    ? null
                    : `${currencyFormat(
                        property?.valuation_report?.price_per_square_foot
                      )} (per sq. ft) / ${currencyFormat(
                        property?.valuation_report?.price_per_square_meters
                      )} (per sq.m)`
                }
              />
              <ViewRowLeftRight
                title="Total Size"
                value={
                  property?.valuation_report?.total_square_feet === undefined
                    ? null
                    : `${property?.valuation_report?.total_square_feet}  Sq. Ft / ${property?.valuation_report?.total_square_meters} Sq. M`
                }
              />
              <ViewRowLeftRight
                title="First Charge Outstanding"
                value={
                  property?.valuation_report?.first_charge_outstanding ===
                  undefined
                    ? null
                    : currencyFormat(
                        property?.valuation_report?.first_charge_outstanding
                      )
                }
              />
              <ViewRowLeftRight
                title="Build Costs"
                value={
                  property?.valuation_report?.build_costs === undefined
                    ? null
                    : `${currencyFormat(
                        property?.valuation_report?.build_costs
                      )} (
                      ${currencyFormat(
                        property?.valuation_report?.price_per_square_foot
                      )} per sq. m
                      / ${currencyFormat(
                        property?.valuation_report?.price_per_square_meters
                      )} per
                      sq. ft)`
                }
              />

              <ViewRowLeftRight
                title="Contractor"
                value={escapeTitlize(property?.valuation_report?.contractor)}
              />
              <ViewRowLeftRight
                title="Project Manager"
                value={escapeTitlize(
                  property?.valuation_report?.project_manager
                )}
              />
              <ViewRowLeftRight
                title="Architect"
                value={escapeTitlize(property?.valuation_report?.architect)}
              />
              <ViewRowLeftRight
                title="Structural Engineer"
                value={escapeTitlize(
                  property?.valuation_report?.structural_engineer
                )}
              />
              <ViewRowLeftRight
                title="Other Relevant Sub Contractors"
                value={escapeTitlize(
                  property?.valuation_report?.other_relevant_subcontractors
                )}
              />
              <ViewRowLeftRight
                title="Omni Experience with the professional team"
                value={
                  property?.valuation_report
                    ?.omni_experience_with_the_profesional_team
                }
              />
            </Column>
          </Rows>
        </RenderSectionConditionally>
      </StepView>
    </Columns>
  );
};

const ValuationReportView = ({ properties, status, expanded }) => {
  const isExpanded = useExpandForStatus(status, expanded, "New");

  return (
    <StepView title="Valuation Report" status={status} expanded={isExpanded}>
      <RenderSectionConditionally status={status}>
        {properties?.map((property) => {
          return (
            <ValuationReportItem
              key={property?.id}
              property={property}
              status={property?.valuation_report?.status ?? "New"}
              expanded={expanded}
            />
          );
        })}
      </RenderSectionConditionally>
    </StepView>
  );
};

ValuationReportItem.propTypes = {
  status: PropTypes.string,
  property: PropTypes.object,
  expanded: PropTypes.bool,
};
ValuationReportView.propTypes = {
  status: PropTypes.string,
  properties: PropTypes.array,
  expanded: PropTypes.bool,
};

export default ValuationReportView;
