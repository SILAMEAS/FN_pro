import {Constant_Navigator} from '@src/navigation/Constant_Navigator';
import {download} from '../../../manifest';
import {close_session} from '../../../sessions';

// download pdf
export const Download_pdf_manifest = async ({IdSession}: any) => {
  const done = await close_session(IdSession);
  // const done = 'sf';
  if (done) {
    const res = await fetch(
      Constant_Navigator.host_API_NG_ONE +
        '/api/v1/session/' +
        IdSession +
        '/manifest',
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          certignarole: '2',
          certignahash: 'ySsPUR23',
          certignauser: 'pps#test',
          accept: 'application/json',
          defaultLanguage: 'fr',
        },
      },
    );
    const data = await res.json();
    console.log(res);
    console.log(
      '================================URL for download manifest============================',
    );
    const {url} = data;
    console.log(data);
    console.log(url);
    if (url) {
      const resT = await download(url);
      console.log(resT);
      return resT;
    }
  }

  //
  // if (url) {
  //    const resT = await download_manifest(url);
  //   console.log(resT);
  //   return resT;
  // }
};
export const Download_pdf = async ({IdSession, Document}: any) => {
  console.log(IdSession, Document);
  const res = await fetch(
    Constant_Navigator.host_API_NG_ONE +
      '/api/v1/session/' +
      IdSession +
      '/document/' +
      Document.split('/')[6] +
      '/current',
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        certignarole: '2',
        certignahash: 'ySsPUR23',
        certignauser: 'pps#test',
        accept: 'application/json',
        defaultLanguage: 'fr',
      },
    },
  );
  const data = await res.json();
  console.log('ON THE FLY --------------------------------------------');

  console.log(
    '================================URL for download============================',
  );
  const {url} = data;
  console.log(url);

  if (url) {
    const resT = await download(url);
    return resT;
  }
};
