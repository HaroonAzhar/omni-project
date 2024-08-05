import { dateFormat } from "utils";

import asEntry from "./as_entry";
import formatAddress from "./format_address";

const getRole = (shareholder, directors = []) => {
  const directorsNames = directors.map((director) => director.name);
  if (directorsNames.includes(shareholder.name)) {
    return "Director and shareholder";
  } else {
    return "Shareholder";
  }
};

function addCompanyReplacements({
  data: { application },
  lists: { replacementList, removeList, cloneList },
}) {
  const addReplacement = (name, value) => {
    const entry = asEntry(name, value);
    replacementList.push(entry);
  };
  if (application.type_of_applicant !== "company") {
    // The application is not a company so remove the company section
    removeList.push({
      options: { needle: "{{companyTable}}", element: "table" },
    });
  } else {
    addReplacement("companyTable", "");
  }
  const [company = {}] = application.company;
  addReplacement("companyName", company.base_data?.name);
  addReplacement("companyNumber", company.base_data?.company_number); // e.g. "SC644470"
  addReplacement(
    "companyAddress",
    formatAddress(company.address?.registered) // "12 Stanhope Place, Edinburgh, Edinburgh, Midlothian, United Kingdom, EH12 5HH"
  );
  addReplacement(
    "companyIncorporationDate",
    dateFormat(company.base_data?.date_of_incorporation)
  ); // Not captured currently - e.g. "15/10/2019"

  // Company Directors/Shareholders (CI section)
  cloneList.push({
    options: {
      needle: "{{CIRow}}",
      element: "table-row",
      repeat: company.shared_holders?.length - 1,
    },
  });
  addReplacement(
    "CI_Name",
    company.shared_holders?.map((shareholder) => shareholder.name)
  ); // e.g. ["Daryl Robert Teague", "Amanda Marion Teague"]
  addReplacement(
    "CI_Shareholding",
    company.shared_holders?.map((shareholder) => shareholder.held)
  ); // e.g. ["50", "50"]
  addReplacement(
    "CI_Role",
    company.shared_holders?.map((shareholder) =>
      getRole(shareholder, company.directors)
    )
  ); // e.g. ["Director and shareholder", "Director and shareholder"]
  addReplacement(
    "CI_Guarantor",
    company.shared_holders?.map((shareholder) =>
      shareholder.is_guarantor ? "Yes" : "No"
    )
  ); // e.g. ["Yes", "Yes"]
  addReplacement("CIRow", "");
}

export default addCompanyReplacements;
