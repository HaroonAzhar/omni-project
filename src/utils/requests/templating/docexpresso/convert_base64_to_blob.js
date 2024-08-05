function convertBase64toBlob(content, type) {
  const contentType = type || "";
  const sliceSize = 512;
  const byteCharacters = window.atob(content); // method which converts base64 to binary
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i += 1) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, {
    type: contentType,
  }); // statement which creates the blob
  return blob;
}

export default convertBase64toBlob;
