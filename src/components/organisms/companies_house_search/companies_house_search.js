import React, { useState } from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

import { TextInput, Checkbox } from "components/atoms";
import { CompaniesHouseTable, OfficersModal } from "components/organisms";

import {
  StyledErrorLabel,
  StyledFindCompanyButton,
  StyledFindCompanyWrapper,
  StyledNotInChCheckbox,
} from "./styled_companies_house_search";
const CompaniesHouseSearch = ({ form, touched, errors, values }) => {
  const [companyToSearch, setCompanyToSearch] = useState("");

  const [officersCompanyName, setOfficersCompanyName] = useState("");
  const [officersCompanyNumber, setOfficersCompanyNumber] = useState("");
  const [shouldShowOfficersModal, setShouldShowOfficersModal] = useState(false);

  return (
    <>
      <OfficersModal
        companyNumber={officersCompanyNumber}
        companyName={officersCompanyName}
        isOpen={shouldShowOfficersModal}
        close={() => setShouldShowOfficersModal(false)}
      />
      <StyledFindCompanyWrapper>
        <div>
          <Field
            component={TextInput}
            type="text"
            name="CompanyName"
            label="Company name"
            placeholder="Enter Company Name"
          />

          <StyledErrorLabel>
            {touched.CompanyNumber && errors.CompanyNumber}
          </StyledErrorLabel>
        </div>

        <StyledFindCompanyButton
          type="button"
          kind="secondary"
          style={{ marginBottom: "40px" }}
          onClick={() => setCompanyToSearch(values.CompanyName)}
        >
          Find company
        </StyledFindCompanyButton>
      </StyledFindCompanyWrapper>

      <Field type="text" render={() => null} name="CompanyNumber" />

      {companyToSearch && (
        <CompaniesHouseTable
          selectedValue={values.CompanyNumber || null}
          companyToSearch={companyToSearch}
          setOfficersCompanyName={setOfficersCompanyName}
          setOfficersCompanyNumber={setOfficersCompanyNumber}
          setShouldShowOfficersModal={setShouldShowOfficersModal}
          changeFormValues={({ number, name }) => {
            form.change("CompanyNumber", number);
            form.change("CompanyName", name);
          }}
        />
      )}
      <StyledNotInChCheckbox>
        <Field
          component={Checkbox}
          type="checkbox"
          name="notInCh"
          label="Not In Companies House"
        />
      </StyledNotInChCheckbox>
    </>
  );
};

CompaniesHouseSearch.propTypes = {
  form: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default CompaniesHouseSearch;
