import {Constant_Navigator} from '@src/navigation/Constant_Navigator';
interface type {
  idS?: string;
  LoginA: string;
}
// add actor to session
export const add_actor = async ({idS, LoginA}: type) => {
  const res1 =
    Constant_Navigator.host_API_NG_ONE +
    Constant_Navigator.V1 +
    idS +
    '/actors';
  console.log(res1);
  const data3 = {
    name: 'actora',
    type: 0,
    roles: ['approval', 'sign'],
    'adm-id': 'dolore fugiat exercitation sed',
    'first-name': 'test',
    country: 'FR',
    login: LoginA,
    email: 'LwsyPS70m10aPpK@qnWdwQpJegBROOpjqauSYiaxLhRB.daa',
    mobile: 'enim occaecat et aliqua',
    'manifest-data': {},
    'user-data': {},
  };

  const res = await fetch(res1, {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      certignarole: '2',
      certignahash: 'ySsPUR23',
      certignauser: 'pps#test',
      Accept: 'application/json',
      DefaultLanguage: 'fr',
    },
    body: JSON.stringify(data3),
  });
  const dataA = await res.json();
  return dataA;
};

// get detail actor
export const get_detail_actor = async (first: string) => {
  const res1 = Constant_Navigator.host_API_NG_ONE + first;
  const res = await fetch(res1, {
    method: 'GET',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      certignarole: '2',
      certignahash: 'ySsPUR23',
      certignauser: 'pps#test',
    },
  });

  const data = await res.json();
  console.log(data);
  return data;
};
