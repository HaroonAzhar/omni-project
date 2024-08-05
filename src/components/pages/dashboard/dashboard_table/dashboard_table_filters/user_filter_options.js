import { getAdminRecords } from "utils/requests/api";

export const ALL = "All";
const getUsers = async () => {
  const userFilterOptions = [ALL];

  const { data } = await getAdminRecords("users");

  return [...userFilterOptions, ...data.map((item) => item.Name)];
};

export default getUsers;
