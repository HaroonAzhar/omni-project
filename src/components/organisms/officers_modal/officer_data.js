import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import LOCALE from "core/locale";

import OfficerEntry from "./officer_entry";

const StyledOfficerData = styled.div`
  float: left;
`;

const getAddressContent = (address) => (
  <>
    <p>
      {address.address_line_1} {address.address_line_2}
    </p>
    <p>
      {address.locality}
      {", "}
      {address.country}
      {", "}
      {address.postal_code}
    </p>
  </>
);

const OfficerAddress = ({ address }) => (
  <OfficerEntry label="Address:" content={getAddressContent(address)} />
);

const getDateOfBirthContent = (date_of_birth) => {
  const birthDate = new Date(date_of_birth.year, date_of_birth.month - 1);
  const birthMonthName = birthDate.toLocaleString(LOCALE, { month: "long" });
  const birthYear = date_of_birth.year;
  return <p>{`${birthMonthName} ${birthYear}`}</p>;
};

const OfficerDateOfBirth = ({ date_of_birth }) => (
  <OfficerEntry label="DOB:" content={getDateOfBirthContent(date_of_birth)} />
);

const OfficerRole = ({ role }) => (
  <OfficerEntry label="Officer Role:" content={role} />
);

const OfficerLastName = ({ name }) => {
  const lastName = name.split(",")[0];

  return <OfficerEntry label="Last Name:" content={lastName} />;
};

const OfficerFirstName = ({ name }) => {
  const firstName = name.split(",")[1];

  return <OfficerEntry label="First Name:" content={firstName} />;
};

const OfficerData = ({ officer }) => (
  <StyledOfficerData>
    <OfficerLastName name={officer.name} />
    <OfficerFirstName name={officer.name} />
    <OfficerRole role={officer.officer_role} />
    {officer.address && <OfficerAddress address={officer.address} />}
    {officer.date_of_birth && (
      <OfficerDateOfBirth date_of_birth={officer.date_of_birth} />
    )}
  </StyledOfficerData>
);

OfficerData.propTypes = {
  officer: PropTypes.object.isRequired,
};

OfficerAddress.propTypes = {
  address: PropTypes.object.isRequired,
};

OfficerDateOfBirth.propTypes = {
  date_of_birth: PropTypes.object.isRequired,
};

OfficerFirstName.propTypes = {
  name: PropTypes.string.isRequired,
};

OfficerLastName.propTypes = {
  name: PropTypes.string.isRequired,
};

OfficerAddress.propTypes = {
  address: PropTypes.object.isRequired,
};

OfficerDateOfBirth.propTypes = {
  date_of_birth: PropTypes.object.isRequired,
};

OfficerRole.propTypes = {
  role: PropTypes.string.isRequired,
};

export default OfficerData;
