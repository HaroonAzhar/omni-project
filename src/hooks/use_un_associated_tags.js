import useRecords from "components/admin/data_view_page/hooks/use_records";

const useUnAssociatedTags = (associatedTags) => {
  const [allTags] = useRecords("tags");

  const associatedTagsNames = associatedTags.map((tag) => tag.Name);
  const unAssociatedTags = allTags.filter(
    (tag) => !associatedTagsNames.includes(tag.Name)
  );
  return unAssociatedTags;
};

export default useUnAssociatedTags;
