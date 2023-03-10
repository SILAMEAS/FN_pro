import {days} from '@src/utils/Date/CalculateDate';
import {
  // convertUTCToLocalTime,
  convertUTCToLocalTime_second,
} from '@src/utils/Date/ConvertDate';
import {useEffect, useState} from 'react';

export const Countdown = (timeS: any, timeE: any) => {
  let [TM, setTM]: any = useState();

  // total second
  let time =
    convertUTCToLocalTime_second(timeE) - convertUTCToLocalTime_second(timeS);
  useEffect(() => {
    const data = setInterval(() => {
      time--;
      console.log('time ' + time);
      console.log(timeS);
      console.log(timeE);

      setTM(days(timeE, timeS));
    }, 1000);
    return () => {
      clearInterval(data);
    };
  }, [time]);

  return TM;
};
