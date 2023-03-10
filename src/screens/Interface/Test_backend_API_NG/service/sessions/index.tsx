import {Constant_Navigator} from '@src/navigation/Constant_Navigator';
// add session
export const addSession = async () => {
  const res = await fetch(Constant_Navigator.host_API_NG + '/sessions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      certignarole: '2',
      certignahash: 'ySsPUR23',
      certignauser: 'pps#test',
      aceept: 'application/json',
      defaultlanguage: 'fr',
    },
    body: JSON.stringify({ttl: 3000}),
  });
  const data = await res.json();
  console.log(data);
  return 'ok';
};
// generta OTP
export const generate_OTP = async ({Actor, Document, IdSession}: any) => {
  const dataActive = {
    actor: Actor,
    documents: [Document],
    length: 5,
    numeric: true,
    ttl: 600,
    tag: 'legal',
  };
  console.log(
    '******************************************************************',
  );

  console.log(
    Constant_Navigator.host_API_NG_ONE +
      '/session/' +
      IdSession +
      '/generate-otp',
  );
  console.log(
    '******************************************************************',
  );
  try {
    const res = await fetch(
      Constant_Navigator.host_API_NG_ONE +
        Constant_Navigator.prefix +
        IdSession +
        '/generate-otp',
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          certignarole: '2',
          certignahash: 'ySsPUR23',
          certignauser: 'pps#test',
          Accept: 'application/json',
          DefaultLanguage: 'fr',
        },
        body: JSON.stringify(dataActive),
      },
    );
    const data = await res.json();
    return data.otp;
  } catch (error) {
    console.log(error);
  }
};
//===============================================OLD
// export const generate_OTP = async (res1: any, d: any) => {
//   const dataActive = {
//     actor: d.service1,
//     documents: [d.service],
//     length: 5,
//     numeric: true,
//     ttl: 600,
//     tag: 'legal',
//   };
//   console.log(dataActive);
//   try {
//     const res = await fetch(
//       Constant_Navigator.host_API_NG_ONE + res1 + '/generate-otp',
//       {
//         method: 'PUT',
//         headers: {
//           'content-type': 'application/json',
//           certignarole: '2',
//           certignahash: 'ySsPUR23',
//           certignauser: 'pps#test',
//           Accept: 'application/json',
//           DefaultLanguage: 'fr',
//         },
//         body: JSON.stringify(dataActive),
//       },
//     );
//     const data = await res.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };
// close session
export const close_session = async (Id_session: any) => {
  const dataActive = {
    force: true,
    reason: 'culpa eu pariatur et',
    'manifest-data': {},
  };
  console.log(dataActive);
  try {
    const res = await fetch(
      Constant_Navigator.host_API_NG_ONE +
        '/api/v1/session/' +
        Id_session +
        '/close',
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          certignarole: '2',
          certignahash: 'ySsPUR23',
          certignauser: 'pps#test',
          Accept: 'application/json',
          DefaultLanguage: 'fr',
        },
        body: JSON.stringify(dataActive),
      },
    );
    const data = await res.json();
    console.log('Close session---------------------------------->');
    const {status} = data;
    return status;
  } catch (error) {
    console.log(error);
  }
};
// get session
export const get_session = async () => {
  console.log(Constant_Navigator.host_API_NG + '/sessions');
  try {
    const res = await fetch(Constant_Navigator.host_API_NG + '/sessions');
    const data = await res.json();
    return data.sessions;
  } catch (error) {
    console.log(error);
  }
};
// get detail session
export const get_detail_session = async (first: string) => {
  const res = await fetch(Constant_Navigator.host_API_NG_ONE + first, {
    method: 'GET',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      certignarole: '2',
      certignahash: 'ySsPUR23',
      certignauser: 'pps#test',
    },
  });
  const data = await res.json();

  return data;
};
// delete session
export const deleteSession = async (id: any) => {
  const res = await fetch(Constant_Navigator.host_API_NG_ONE + id + '/close', {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
      Certignarole: '2',
      Certignahash: 'ySsPUR23',
      Certignauser: 'pps#test',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      force: true,
      reason: 'culpa eu pariatur et',
      'manifest-data': {},
    }),
  });
  const data = await res.json();
  if (data) {
    return 'deleted';
  }
};
