import {useState} from 'react';

export function ExpireOrNot(ttl: number) {
  const [check, setcheck] = useState('');
  if (ttl < 0) setcheck("'red.500'");
  else setcheck('blue.500');
  return check;
}
export const hi = () => {
  alert('hi');
};
