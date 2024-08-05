import React, { useState } from "react";
import PropTypes from "prop-types";

import { SelectInput } from "components/atoms";
import { useAssociatedTagsData, useAddAssociatedTag } from "hooks";
import useUnAssociatedTags from "hooks/use_un_associated_tags";

const TagsDropdown = ({ prompt = "Add Tags" }) => {
  const savingRequest = useAddAssociatedTag();
  const { fetchAssociatedTagsAndStore, associatedTags } = useAssociatedTagsData(
    true
  );
  const unAssociatedTags = useUnAssociatedTags(associatedTags);

  const options = [
    { label: prompt, value: "" },
    ...unAssociatedTags.map((tag) => ({ label: tag.Name, value: tag.Id })),
  ];
  const [value, setValue] = useState(prompt);
  return (
    <>
      <SelectInput
        input={{
          onChange: async (event) => {
            if (event.target.value === "") {
              return;
            }
            savingRequest({ FkTagId: parseInt(event.target.value) }).then(
              (res) => {
                if (res) {
                  fetchAssociatedTagsAndStore();
                }
              }
            );

            setValue(prompt);
          },
          value,
        }}
        options={options}
      />
    </>
  );
};

TagsDropdown.propTypes = {
  prompt: PropTypes.string,
};

export default TagsDropdown;
