import { useEffect, useState } from "react";

import getUsers from "../dashboard_table_filters/user_filter_options";

const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((responseUsers) => setUsers(responseUsers));
  }, []);

  return users;
};

export default useUsers;
