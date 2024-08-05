import moment from "moment";

const timeFormat = (date) => (date && moment.utc(date).format("h:mm A")) || "";

export default timeFormat;
