import { titleize } from "inflected";

const escapeTitlize = (text) => titleize(text ?? "");

export default escapeTitlize;
