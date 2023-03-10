import {useRoute} from '@react-navigation/native';
import {setData_cgu} from '@src/redux/counter/CounterSlice';
import {
  Box,
  Button,
  Center,
  HStack,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import {Constant_Navigator} from '../../../../navigation/Constant_Navigator';
import {get_cgu} from '../service/cgu';
import { useAppDispatch, useAppSelector } from "@src/redux/config/hooks";
function Example({Doc_Approve, navigation}: any) {
  const dispatch = useAppDispatch();

  const {
    params: {sessionUrl},
  }: any = useRoute();
  return (
    <Box
      bg="primary.600"
      py="4"
      px="3"
      borderRadius="5"
      rounded="md"
      width={375}
      maxWidth="100%"
    >
      <HStack justifyContent="space-between">
        <Box justifyContent="space-between">
          <VStack space="2">
            <Text
              fontSize="md"
              textAlign={'center'}
              py={4}
              color="white"
              bg={'red.600'}
            >
              Approve doc
            </Text>
            <Text color="white" fontSize="xl">
              OTP : {Doc_Approve.otp}
            </Text>
            <Text color="white" fontSize="xl">
              Actor : {Doc_Approve.signatures[0].actor}
            </Text>
            <Text color="white" fontSize="md">
              Documents : {Doc_Approve.signatures[0].document}
            </Text>
          </VStack>
          <Pressable
            rounded="xs"
            bg="primary.400"
            alignSelf="flex-start"
            py="1"
            mx={'auto'}
            px="3"
          >
            <Text
              textTransform="uppercase"
              fontSize="sm"
              fontWeight="bold"
              color="white"
            >
              ThreadId : {Doc_Approve.threadId}
            </Text>
            <Button
              onPress={async () => {
                const data = await get_cgu(sessionUrl);
                dispatch(setData_cgu(data));
                navigation.navigate(Constant_Navigator.Page_cgu, {
                  sessionUrl: sessionUrl,
                });
              }}
            >
              Get CGU
            </Button>
          </Pressable>
        </Box>
      </HStack>
    </Box>
  );
}
const PageApprovedoc = ({navigation}: any) => {
  const {Doc_Approve} = useAppSelector((state) => state.counter);
  return (
    <Center h={'100%'}>
      <Example Doc_Approve={Doc_Approve} navigation={navigation} />
    </Center>
  );
};

export default PageApprovedoc;
