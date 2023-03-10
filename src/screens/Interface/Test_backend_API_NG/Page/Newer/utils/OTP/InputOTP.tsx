import {Box, Center, HStack, Text, VStack} from 'native-base';
import React from 'react';

export const InputOTP = ({otpValue}: any) => {
  console.log(otpValue[0]);
  return (
    <Box w={'100%'} bg={'black'} h={'80%'}>
      <Center h={'100%'}>
        <VStack space={10}>
          <HStack space={5}>
            <Box
              p={5}
              borderColor={'yellow.600'}
              borderWidth={3}
              rounded={'md'}
            >
              <Text color={'yellow.600'}>{otpValue[0]}</Text>
            </Box>
            <Box
              p={5}
              borderColor={'yellow.600'}
              borderWidth={3}
              rounded={'md'}
            >
              <Text color={'yellow.600'}>{otpValue[1]}</Text>
            </Box>
            <Box
              p={5}
              borderColor={'yellow.600'}
              borderWidth={3}
              rounded={'md'}
            >
              <Text color={'yellow.600'}>{otpValue[2]}</Text>
            </Box>
            <Box
              p={5}
              borderColor={'yellow.600'}
              borderWidth={3}
              rounded={'md'}
            >
              <Text color={'yellow.600'}>{otpValue[3]}</Text>
            </Box>
            <Box
              p={5}
              borderColor={'yellow.600'}
              borderWidth={3}
              rounded={'md'}
            >
              <Text color={'yellow.600'}>{otpValue[4]}</Text>
            </Box>
          </HStack>
        </VStack>
      </Center>
    </Box>
  );
};
