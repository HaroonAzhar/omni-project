import moment from "moment";
import { useEffect, useState } from "react";

import { useRequestWithProgressToastRollbar } from "utils";
import { getAllWaypoints } from "utils/requests";

const dateFormatter = "YYYY-MM-DD";
const next7DaysFilter = new URLSearchParams({
  DueDateMin: moment(new Date()).format(dateFormatter),
  DueDateMax: moment(new Date()).add(7, "days").format(dateFormatter),
  limit: 50,
});

const todayFilter = new URLSearchParams({
  DueDateMin: moment(new Date()).add(-1, "days").format(dateFormatter),
  DueDateMax: moment(new Date()).add(1, "days").format(dateFormatter),
  limit: 50,
});

const overdueFilter = new URLSearchParams({
  DueDateMax: moment(new Date()).format(dateFormatter),
  IsCompleted: false,
  limit: 50,
});

const useNearWaypoints = () => {
  const fetchWaypoints = useRequestWithProgressToastRollbar(getAllWaypoints);
  const [waypoints7days = [], setWaypoints7days] = useState([]);
  const [waypointsToday = [], setWaypointsToday] = useState([]);
  const [waypointsOverdue = [], setWaypointsOverdue] = useState([]);

  useEffect(() => {
    fetchWaypoints(`?${next7DaysFilter}`).then((res = {}) => {
      const { data } = res;
      setWaypoints7days(data.data);
    });
    fetchWaypoints(`?${todayFilter}`).then((res = {}) => {
      const { data } = res;
      setWaypointsToday(data.data);
    });
    fetchWaypoints(`?${overdueFilter}`).then((res = {}) => {
      const { data } = res;
      setWaypointsOverdue(data.data);
    });
  }, [fetchWaypoints]);

  return {
    waypoints7days,
    waypointsToday,
    waypointsOverdue,
  };
};

export default useNearWaypoints;
