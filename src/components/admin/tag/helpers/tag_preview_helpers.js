export const isBackgroundDark = (colorCode = "#000000") => {
  colorCode = colorCode.replace("#", "");
  const r = parseInt(colorCode.substr(0, 2), 16);
  const g = parseInt(colorCode.substr(2, 2), 16);
  const b = parseInt(colorCode.substr(4, 2), 16);
  const isDark = (r * 299 + g * 587 + b * 114) / 1000;
  return isDark < 128 ? true : false;
};
