export default (applicant, finalizeStep) => {
  return (data) => {
    const newIndividuals = { ...applicant, ...data };
    finalizeStep({ data: newIndividuals });
  };
};
