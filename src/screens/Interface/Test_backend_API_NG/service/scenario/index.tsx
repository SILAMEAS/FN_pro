import {Constant_Navigator} from '@src/navigation/Constant_Navigator';

// add scenario
export const add = async (d: any, first: any) => {
  const data = {
    documents: [d[0]],
    steps: [
      {
        process: 'legal',
        steps: [d[1]],
        cardinality: 'one',
      },
      {
        process: 'cosign',
        steps: [d[1]],
        signatureType: 1,
        cardinality: 'all',
      },
    ],
    level: 4,
    format: 1,
  };
  const res = await fetch(
    Constant_Navigator.host_API_NG_ONE +
      Constant_Navigator.V1 +
      first +
      '/scenarios',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        certignarole: '2',
        certignahash: 'ySsPUR23',
        certignauser: 'pps#test',
        Accept: 'application/json',
        defaultlanguage: 'application/json',
      },
      body: JSON.stringify(data),
    },
  );
  const dataRes = await res.json();
  return dataRes;
};
// get all scenario
export const getAllScenario = async (first: any) => {
  const res = await fetch(
    Constant_Navigator.host_API_NG_ONE + first + '/scenarios',
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        certignarole: '2',
        certignahash: 'ySsPUR23',
        certignauser: 'pps#test',
      },
    },
  );
  const dataRes = await res.json();

  return dataRes;
};
// active scenario
export const ActiveScenario = async (res1: any) => {
  const dataActive = {
    'manifest-data': {},
  };
  try {
    const res = await fetch(
      Constant_Navigator.host_API_NG_ONE + res1 + '/activate',
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          certignarole: '2',
          certignahash: 'ySsPUR23',
          certignauser: 'pps#test',
          Accept: 'application/json',
          defaultlanguage: 'application/json',
        },
        body: JSON.stringify(dataActive),
      },
    );
    const data = await res.json();
    console.log('Scenario was active' + data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
