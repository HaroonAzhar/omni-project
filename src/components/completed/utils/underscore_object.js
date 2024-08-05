import { underscore } from "inflected";

const underscoreObject = (toUnderscore) => {
  if (typeof toUnderscore !== "object") {
    return toUnderscore;
  }
  return Object.entries(toUnderscore).reduce((acc, [key, value]) => {
    const newKey = underscore(key);
    let newValue = value;

    if (Array.isArray(value)) {
      newValue = value.map((element) => underscoreObject(element));
    } else if (typeof value === "object" && value !== null) {
      newValue = underscoreObject(value);
    }
    return { ...acc, [newKey]: newValue };
  }, toUnderscore);
};

export default underscoreObject;
