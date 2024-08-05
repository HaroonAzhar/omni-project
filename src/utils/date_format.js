import moment from "moment";

const dateFormat = (date) => date && moment(date).format("DD/MM/YYYY");

export default dateFormat;
