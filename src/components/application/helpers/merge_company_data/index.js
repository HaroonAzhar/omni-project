import { titleize } from "inflected";

import { getActiveDirectors } from "utils";

const formatDirectorName = (value) => {
  const [surname, firstNames] = value.split(",");
  return [firstNames, surname].join(" ").trim();
};

const formatIfExists = (directors) => {
  if (directors) {
    return directors.map((director) => ({
      ...director,
      name: formatDirectorName(director.name),
      company: formatIfExists(director.company),
    }));
  }

  return undefined;
};

export default (companyData) => {
  const {
    companyDetailsResponse,
    companyOfficersResponse,
    base_data,
    address,
    directors,
    shared_holders,
    companyNumber = undefined,
    companyName = undefined,
    ...rest
  } = companyData;

  const companyDetailsBaseData = {};
  const companyDetailsAddress = {};
  if (companyDetailsResponse) {
    companyDetailsBaseData.name = companyDetailsResponse.company_name;
    companyDetailsBaseData.date_of_creation =
      companyDetailsResponse.date_of_creation;

    companyDetailsBaseData.company_number =
      companyDetailsResponse.company_number;

    const {
      locality,
      postal_code,
      country,
      address_line_1,
    } = companyDetailsResponse.registered_office_address;
    companyDetailsAddress.registered = {
      address_line_1,
      postcode: postal_code,
      city: locality,
      country: country && country.toLowerCase(),
    };

    const companyType = companyDetailsResponse.type;
    companyDetailsBaseData.company_type = companyType;
  }
  const companyOfficersBaseData = {};
  let companyOfficersDirectors = [];
  if (companyOfficersResponse) {
    const activeDirectors = getActiveDirectors(companyOfficersResponse.items);
    const numberOfActiveDirectors = activeDirectors.length;

    companyOfficersDirectors = activeDirectors.map(({ name, links }) => ({
      name: formatDirectorName(titleize(name)),
      links: links.officer.appointments,
      is_guarantor: true,
    }));
    companyOfficersBaseData.number_of_partners = numberOfActiveDirectors;
  }
  return {
    base_data: {
      ...companyOfficersBaseData,
      ...companyDetailsBaseData,
      ...base_data,
      company_number: companyNumber ?? base_data?.company_number,
      name: companyName ?? base_data?.name,
    },
    address: {
      ...companyDetailsAddress,
      ...address,
    },
    directors: formatIfExists(directors) || companyOfficersDirectors,
    shared_holders: formatIfExists(shared_holders),

    ...rest,
  };
};
