export default (property, finalizeStep) => {
  return (data) => {
    const newProperty = { ...property, ...data };
    finalizeStep({ data: newProperty });
  };
};
