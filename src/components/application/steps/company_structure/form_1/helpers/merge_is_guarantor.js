const mergeIsGuarantor = (directors = [], shareholders = []) => {
  directors.forEach((director, directorIndex) => {
    const shareholderIndex = shareholders.findIndex(
      (shareholder) =>
        shareholder.fk_shared_contact_id?.toString() ===
        director.fk_shared_contact_id?.toString()
    );
    if (shareholderIndex === -1) {
      return;
    }
    const shareholder = shareholders[shareholderIndex];
    if (shareholder.is_guarantor) {
      directors[directorIndex] = {
        ...director,
        is_guarantor: true,
      };
    }
    if (director.is_guarantor) {
      shareholders[shareholderIndex] = {
        ...shareholder,
        is_guarantor: true,
      };
    }
  });
  return [directors, shareholders];
};

export default mergeIsGuarantor;
