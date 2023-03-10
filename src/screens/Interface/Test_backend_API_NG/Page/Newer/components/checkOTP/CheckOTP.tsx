import { useState} from 'react';

const useCheckOTP = ({targetDate}: any) => {
   const [checkOTP,setOTP]= useState('');
   setOTP(targetDate)
  return checkOTP;
};


export {useCheckOTP};

