import React, { useState } from "react";

import { Modal } from "components/atoms";
import { FilterIconButton } from "components/molecules";

import FilterForm from "./filter_cashflows_form";

const FilterModal = () => {
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const handleCloseFilterModal = () => setFilterModalOpen(false);
  const openFilterModal = () => setFilterModalOpen(true);

  return (
    <>
      <FilterIconButton openFilterModal={openFilterModal} />

      <Modal isOpen={filterModalOpen} onClose={handleCloseFilterModal}>
        <FilterForm afterSubmit={handleCloseFilterModal} />
      </Modal>
    </>
  );
};

export default FilterModal;
