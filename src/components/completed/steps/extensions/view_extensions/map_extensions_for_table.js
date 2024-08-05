const mapSingleExtension = (extension) => ({
  ...extension,
});

const mapExtensionsForTable = (extensionsData) => {
  return extensionsData.map(mapSingleExtension);
};

export default mapExtensionsForTable;
