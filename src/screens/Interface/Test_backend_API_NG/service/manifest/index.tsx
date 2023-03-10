import {Constant_Navigator} from '@src/navigation/Constant_Navigator';

// recover or get manifest
export const recover_manifest = async (Id_session: any) => {
  try {
    const res = await fetch(
      Constant_Navigator.host_API_NG_ONE +
        // '/api/v1/session/'
        Constant_Navigator.V1 +
        Id_session +
        '/manifest',
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          certignarole: '2',
          certignahash: 'ySsPUR23',
          certignauser: 'pps#test',
          Accept: 'application/json',
          DefaultLanguage: 'fr',
        },
      },
    );
    const data = await res.json();
    console.log('Recover manifest---------------------------------->');
    return data;
  } catch (error) {
    console.log(error);
  }
};

// download manifest

export const download = async (Id_download: any) => {
  try {
    const res = await fetch(Constant_Navigator.host_API_NG_ONE + Id_download, {
      method: 'GET',
      headers: {
        'content-type': 'application/pdf',
        certignarole: '2',
        certignahash: 'ySsPUR23',
        certignauser: 'pps#test',
        Accept: 'application/json',
        DefaultLanguage: 'fr',
      },
    });
    const data = await res.blob();
    const da = await convertBlobToBase64(data);
    console.log('Download manifest---------------------------------->');
    return da as string;
  } catch (error) {
    console.log(error);
  }
};
const convertBlobToBase64 = async (blob: Blob) => {
  // blob data
  return await blobToBase64(blob);
};

const blobToBase64 = (blob: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
