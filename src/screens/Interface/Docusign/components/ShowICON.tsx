import React, {ReactNode} from 'react';
import {Box} from 'native-base';
interface props {
  items: ReactNode;
}
function ShowIcon({items}: props) {
  return <Box>{items}</Box>;
}

export default ShowIcon;
