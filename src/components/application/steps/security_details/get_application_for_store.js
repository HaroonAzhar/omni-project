import convertSecurityIntoProperty from "./convert_security_into_property";

const getApplicationForStore = (application) => {
  const copyOfApplication = { ...application };

  const getPropertyIfExists = (index) =>
    (application.properties && application.properties[index]) || {};
  copyOfApplication.properties = application.securities.map(
    (security, index) => ({
      ...convertSecurityIntoProperty(security, getPropertyIfExists(index)),
    })
  );
  if (application.loan_purpose === "purchase") {
    copyOfApplication.properties[0].details.being_purchased = true;
    copyOfApplication.properties[0].details.already_owned = false;
    copyOfApplication.properties[0].details.purchase_price =
      application.purchase_price;
  } else {
    copyOfApplication.properties[0].details.being_purchased = false;
    copyOfApplication.properties[0].details.already_owned = true;
  }

  return copyOfApplication;
};

export default getApplicationForStore;
