import React from 'react';
import {Box, Text} from 'native-base';
interface type {
  v: string;
  l: string;
}

const TextLabel = (data: type) => {
  return (
    <Box>
      <Text color={'yellow.600'} fontWeight={'bold'} fontSize={'md'}>
        * {data.l}
      </Text>
      <Text ml={'1/3'} color={'yellow.600'} fontWeight={'bold'} fontSize={'md'}>
        {data.v}
      </Text>
    </Box>
  );
};

export default TextLabel;
