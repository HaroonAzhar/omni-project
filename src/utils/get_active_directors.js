export default (officers) =>
  officers.filter(
    ({ officer_role, resigned_on }) =>
      officer_role === "director" && !resigned_on
  );
