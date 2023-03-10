export const Base64FileHeaderMapper = (fileBase64: string) => {
  let fileHeader = new Map();

  //get the first 3 char of base64
  fileHeader.set('/9j', 'image/jpg');
  fileHeader.set('iVB', 'image/png');
  fileHeader.set('Qk0', 'image/bmp');
  fileHeader.set('JVB', 'application/pdf');

  let res = '';

  fileHeader.forEach((v, k) => {
    if (k == fileBase64.substring(0, 3)) {
      res = v;
    }
  });

  //if file is not supported

  if (res === '') {
    res = 'unknown file';
  }

  //return map value
  return res;
};
