import {Constant_Navigator} from '@src/navigation/Constant_Navigator';

//add sign doc
export const sign_with_certificate = async ({Actor, Document, Url}: any) => {
  console.log('generate');
  const data = {
    actor: Actor,
    documents: [Document],
    certificate: Url,
    tag: 'cosign',
    signMode: 'generate'
  };

  console.log('==================== Waiting =============================');
  console.log(data);
  console.log('==================== Waiting =============================');

  const res = await fetch(
    Constant_Navigator.host_API_NG_ONE +
      Constant_Navigator.V1 +
      Actor.split('/')[4] +
      '/sign-documents',
    {
      method: 'PUT',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        certignarole: '2',
        certignahash: 'ySsPUR23',
        certignauser: 'pps#test',
        Accept: 'application/json',
        DefaultLanguage: 'fr',
      },
      body: JSON.stringify(data),
    },
  );
  const dataRes = await res.json();
  console.log('singature---------------');
  console.log(dataRes);

  return dataRes;
};
export const sign_with_server = async ({Actor, Document, mode}: any) => {
  console.log('server');
  const data = {
    actor: Actor,
    documents: [Document],
    signMode: mode,
    tag: 'cosign',
  };

  console.log('==================== Generate =============================');
  console.log(data);
  console.log('==================== Waiting =============================');

  const res = await fetch(
    Constant_Navigator.host_API_NG_ONE +
      Constant_Navigator.V1 +
      Actor.split('/')[4] +
      '/sign-documents',
    {
      method: 'PUT',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        certignarole: '2',
        certignahash: 'ySsPUR23',
        certignauser: 'pps#test',
        Accept: 'application/json',
        DefaultLanguage: 'fr',
      },
      body: JSON.stringify(data),
    },
  );
  const dataRes = await res.json();
  console.log('singature---------------');
  console.log(dataRes);

  return dataRes;
};
