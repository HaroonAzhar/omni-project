const downloadResult = (response, file_name = "waterfall.xlsx") => {
  const url = window.URL.createObjectURL(response);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", file_name);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
};

export default downloadResult;
