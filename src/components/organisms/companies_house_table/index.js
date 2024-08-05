import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Table } from "components/molecules";
import { RadioInput, Button } from "components/atoms";
import { handleCompaniesHouse } from "utils/requests";

const StyledChooseCompanyInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 50px;
`;

const StyledSeeDetailsButtonWrapper = styled.div`
  margin-left: 20px;
  width: 100px;
`;

const StyledCompanyTitle = styled.span`
  font-weight: 500;
`;

const companiesTablesColumns = [
  {
    Header: "Select",
    accessor: "select",
  },
  {
    Header: "Company Name",
    accessor: "company_name",
  },
  {
    Header: "Company Address",
    accessor: "company_address",
  },
  {
    Header: "Officer",
    accessor: "officer",
  },
];

let companiesHouseCache = {};
const PER_PAGE = 5;
const HOW_MANY_PAGES_FORWARD_FETCH = 2;

const CompaniesHouseTable = ({
  selectedValue,
  changeFormValues,
  setOfficersCompanyName,
  companyToSearch,
  setOfficersCompanyNumber,
  setShouldShowOfficersModal,
}) => {
  const [companies, setCompanies] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  let selectedIndex;

  const onSelected = (event) => {
    const selectedCompany = companies.find(
      (company) => company.company_number === event.target.value
    );

    changeFormValues({
      number: event.target.value,
      name: selectedCompany.title,
    });
  };

  const onOfficersClicked = (companyName, companyNumber) => {
    setOfficersCompanyName(companyName);
    setOfficersCompanyNumber(companyNumber);
    setShouldShowOfficersModal(true);
  };

  const prepareCompaniesData = (company, index) => {
    const checked = selectedValue === company.company_number;
    if (checked) selectedIndex = index;

    const input = {
      type: "radio",
      name: "company_number",
      value: company.company_number,
      onChange: onSelected,
      checked,
    };

    const meta = {
      error: "error",
      touched: false,
    };

    return {
      select: (
        <StyledChooseCompanyInputWrapper>
          <RadioInput input={input} label="" meta={meta} />
        </StyledChooseCompanyInputWrapper>
      ),
      company_name: <StyledCompanyTitle>{company.title}</StyledCompanyTitle>,
      company_address: company.address_snippet,
      officer: (
        <StyledSeeDetailsButtonWrapper>
          <Button
            kind="extra"
            type="button"
            onClick={() =>
              onOfficersClicked(company.title, company.company_number)
            }
          >
            See details
          </Button>
        </StyledSeeDetailsButtonWrapper>
      ),
    };
  };

  useEffect(() => {
    setTotalPages(0);
    setCurrentPageIndex(0);
    setCompanies([]);
    companiesHouseCache = {};
  }, [companyToSearch]);

  const fetchCompanies = (isFirstFetch) => {
    return handleCompaniesHouse({
      companyName: companyToSearch,
      startIndex: isFirstFetch ? 0 : (currentPageIndex + 1) * PER_PAGE,
      perPage: isFirstFetch
        ? PER_PAGE * HOW_MANY_PAGES_FORWARD_FETCH
        : PER_PAGE,
    }).then(({ items, total_results, page_number }) => {
      if (!isFirstFetch) {
        companiesHouseCache[page_number] = items;
        return;
      }

      setTotalPages(Math.ceil(total_results / PER_PAGE));

      let cachedPageIndex = 1;
      while (items.length > 0) {
        companiesHouseCache[cachedPageIndex] = items.splice(0, PER_PAGE);
        cachedPageIndex += 1;
      }

      setCompanies(companiesHouseCache[1]);
    });
  };

  const getCompanies = () => {
    const isFurtherPageInCache = (howMuchFurther) => {
      return !!companiesHouseCache[currentPageIndex + howMuchFurther];
    };

    if (isFurtherPageInCache(1)) {
      setCompanies(companiesHouseCache[currentPageIndex + 1]);
    }

    const isFirstFetch = currentPageIndex === 0;
    if (!isFurtherPageInCache(HOW_MANY_PAGES_FORWARD_FETCH)) {
      fetchCompanies(isFirstFetch).then(() => {
        if (isFirstFetch) {
          setCompanies(companiesHouseCache[1]);
        }
      });
    }
  };
  useEffect(getCompanies, [currentPageIndex, companyToSearch]);

  const goPageBack = () => {
    setCurrentPageIndex(currentPageIndex - 1);
  };

  const goToNextPage = () => {
    setCurrentPageIndex(currentPageIndex + 1);
  };

  const data = companies.map(prepareCompaniesData);

  return (
    <Table
      columns={companiesTablesColumns}
      data={data}
      selectedIndex={selectedIndex}
      goPageBack={goPageBack}
      goToNextPage={goToNextPage}
      currentPage={currentPageIndex + 1}
      totalPages={totalPages}
      kind={{ paddings: "small", marginTop: "small" }}
    />
  );
};

export default CompaniesHouseTable;

CompaniesHouseTable.propTypes = {
  selectedValue: PropTypes.string,
  companyToSearch: PropTypes.string,
  changeFormValues: PropTypes.func.isRequired,
  setOfficersCompanyName: PropTypes.func.isRequired,
  setOfficersCompanyNumber: PropTypes.func.isRequired,
  setShouldShowOfficersModal: PropTypes.func.isRequired,
};
