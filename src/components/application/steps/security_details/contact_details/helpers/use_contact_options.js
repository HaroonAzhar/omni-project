export default (
  manualContactData,
  individualsContactData,
  introducerContactData
) => {
  const individualOptions = Object.keys(individualsContactData).map(
    (applicant_id) => ({
      label: individualsContactData[applicant_id].name,
      value: applicant_id,
    })
  );

  const data = {
    manual: manualContactData,
    ...individualsContactData,
    introducer: introducerContactData,
  };

  const options = [
    {
      label: "Manual",
      value: "manual",
    },
    ...individualOptions,
  ];

  if (introducerContactData) {
    options.push({
      label: "Introducer/Broker",
      value: "introducer",
    });
  }

  return [data, options];
};
