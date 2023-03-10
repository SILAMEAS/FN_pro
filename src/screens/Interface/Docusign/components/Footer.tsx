import React, {ReactNode} from 'react';
import {Center, HStack, Box, Text, IBoxProps} from 'native-base';
interface Type {
  TextIn?: ReactNode;
  prop?: IBoxProps;
}
function Footer({
  TextIn = <Text color={'black'}>Enter your text here </Text>,
  prop,
}: Type) {
  return (
    <Box h={'5%'} position={'absolute'} bottom={0} w={'100%'} {...prop}>
      <Center>
        <HStack
          h={'100%'}
          justifyContent={'space-between'}
          w={'100%'}
          space={10}
          alignItems={'center'}
          bg={'white'}
        >
          {TextIn}
        </HStack>
      </Center>
    </Box>
  );
}

export default Footer;
