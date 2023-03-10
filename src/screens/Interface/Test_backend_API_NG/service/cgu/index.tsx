import {Constant_Navigator} from '@src/navigation/Constant_Navigator';

// get detail cgu
export const get_cgu = async (sessionId: string | undefined) => {
  const res1 =
    Constant_Navigator.host_API_NG_ONE +
    // '/api/v1/ca/2/cgu?session='
    Constant_Navigator.CGU +
    sessionId +
    '&actor=2';
  console.log(res1);
  const res = await fetch(res1, {
    method: 'GET',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      certignarole: '2',
      certignahash: 'ySsPUR23',
      certignauser: 'pps#test',
      accept: 'application/json',
      DefaultLanguage: 'fr',
    },
  });

  const data = await res.json();
  console.log('----------------------------DATA GCU-------------------------');
  console.log(data);
  return data;
};
