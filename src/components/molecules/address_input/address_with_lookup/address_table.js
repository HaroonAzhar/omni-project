import React from "react";
import PropTypes from "prop-types";

import { Button } from "components/atoms";
import Table from "components/molecules/table";

const addressTableColumns = [
  {
    Header: "Select",
    accessor: "select",
  },
  {
    Header: "Address",
    accessor: "address",
  },
];

const PER_PAGE = 5;

const AddressTable = ({
  addresses,
  addressSelected,
  currentPageIndex,
  setCurrentPageIndex,
}) => {
  const totalPages = Math.ceil(addresses.length / PER_PAGE);

  const data = addresses.map((address) => {
    return {
      address: (
        <Button
          kind="extra"
          type="button"
          onClick={() => addressSelected(address)}
        >
          {address.summaryline}
        </Button>
      ),
    };
  });

  const goPageBack = () => {
    setCurrentPageIndex((prevState) => prevState - 1);
  };

  const goToNextPage = () => {
    setCurrentPageIndex((prevState) => prevState + 1);
  };

  const dataChunk = data.slice(
    currentPageIndex * PER_PAGE,
    (currentPageIndex + 1) * PER_PAGE
  );

  return (
    <Table
      columns={addressTableColumns}
      data={dataChunk}
      kind={{ paddings: "small", marginTop: "small" }}
      goPageBack={goPageBack}
      goToNextPage={goToNextPage}
      currentPage={currentPageIndex + 1}
      totalPages={totalPages}
    />
  );
};

export default AddressTable;

AddressTable.propTypes = {
  addresses: PropTypes.arrayOf(
    PropTypes.shape({
      summaryline: PropTypes.string.isRequired,
    })
  ),
  addressSelected: PropTypes.func.isRequired,
  currentPageIndex: PropTypes.number,
  setCurrentPageIndex: PropTypes.func.isRequired,
};
