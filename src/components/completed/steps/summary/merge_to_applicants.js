const mergeEntries = (entries) =>
  entries.reduce((acc, current) => ({
    Email: current.Email || acc.Email,
    HomePhone: current.HomePhone || acc.HomePhone,
    WorkPhone: current.WorkPhone || acc.WorkPhone,
    MobilePhone: current.MobilePhone || acc.MobilePhone,
    Name: current.Name || acc.Name,
    registeredAddress: current.registeredAddress || acc.registeredAddress,

    correspondenceAddress:
      current.correspondenceAddress || acc.correspondenceAddress,
    addresses: [...(acc.addresses ?? []), ...(current.addresses ?? [])],
  }));

export const mergeCompanies = ({ companies, contacts }) => {
  const companyContacts = contacts.filter(
    (contact) => contact.ContactType === "company"
  );
  const allCompanies = Object.fromEntries(
    companies.map((company) => [company.Name, [company]])
  );
  companyContacts.forEach((companyContact) => {
    const existingCompanies = allCompanies[companyContact.Name] ?? [];
    allCompanies[companyContact.Name] = [...existingCompanies, companyContact];
  });

  const mergedCompanies = Object.values(allCompanies).map(mergeEntries);
  return mergedCompanies;
};

export const mergeIndividuals = ({ individuals, contacts }) => {
  const individualContacts = contacts.filter(
    (contact) => contact.ContactType !== "company"
  );

  const namedIndividuals = individuals.map((individual) => {
    return {
      ...individual,
      Name: [individual.Forename, individual.MiddleName, individual.Surname]
        .filter(Boolean)
        .join(" "),
    };
  });
  const allIndividuals = Object.fromEntries(
    namedIndividuals.map((individual) => [individual.Name, [individual]])
  );
  individualContacts.forEach((individualContact) => {
    const existingIndividuals = allIndividuals[individualContact.Name] ?? [];
    allIndividuals[individualContact.Name] = [
      ...existingIndividuals,
      individualContact,
    ];
  });

  const mergedIndividuals = Object.values(allIndividuals).map(mergeEntries);
  return mergedIndividuals;
};

const mergeToApplicants = ({
  companies = [],
  individuals = [],
  contacts = [],
}) => {
  return [
    ...mergeCompanies({ companies, contacts }),
    ...mergeIndividuals({ individuals, contacts }),
  ];
};

export default mergeToApplicants;
