import {useRoute} from '@react-navigation/native';

import {Box, Center, HStack, Image, Pressable, Text, VStack} from 'native-base';
import React from 'react';

import {Constant_Navigator} from '../../../../navigation/Constant_Navigator';
import { useAppSelector } from "@src/redux/config/hooks";

const API_NG_FILE = ({navigation}: any) => {
  const {DATAofFile} = useAppSelector((state) => state.counter);
  const {
    params: {url},
  }: any = useRoute();
  console.log(url);
  // Delete file in session
  const delete_file = async () => {
    const res1 =
      Constant_Navigator.host_API_NG_ONE + url + '/document/' + DATAofFile.did;
    const res = await fetch(res1, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        certignarole: '2',
        certignahash: 'ySsPUR23',
        certignauser: 'pps#test',
      },
    });

    const data = await res.json();
    if (data) {
      navigation.navigate(Constant_Navigator.API_NG);
    }
  };

  return (
    <Center h={'100%'}>
      <Box
        bg="cyan.900"
        py="4"
        px="3"
        borderRadius="5"
        rounded="md"
        width={375}
        maxWidth="100%"
        borderWidth={2}
        borderColor={'red.500'}
      >
        <HStack justifyContent="space-between">
          <Box justifyContent="space-between">
            <VStack space="2">
              <Text color="white" fontSize="sm">
                Id :{DATAofFile.did}
              </Text>
              <Text color="white" fontSize="sm">
                Name : {DATAofFile['file-name'].toUpperCase()}
              </Text>
              <Text fontSize="sm" color="white" mb={5}>
                Date : {DATAofFile.date.slice(0, 10)}
              </Text>
            </VStack>
            <Pressable
              rounded="xs"
              bg={'red.500'}
              alignSelf="flex-start"
              py="1"
              px="3"
              onPress={() => {
                navigation.navigate(Constant_Navigator.API_NG);
              }}
            >
              <Text
                textTransform="uppercase"
                fontSize="sm"
                fontWeight="bold"
                color="white"
              >
                Back
              </Text>
            </Pressable>
            <Pressable
              rounded="xs"
              bg={'red.500'}
              alignSelf="flex-start"
              py="1"
              px="3"
              onPress={delete_file}
            >
              <Text
                textTransform="uppercase"
                fontSize="sm"
                fontWeight="bold"
                color="white"
              >
                delete_file
              </Text>
            </Pressable>
          </Box>
          <Image
            source={{
              uri: 'https://play-lh.googleusercontent.com/BkRfMfIRPR9hUnmIYGDgHHKjow-g18-ouP6B2ko__VnyUHSi1spcc78UtZ4sVUtBH4g',
            }}
            alt="Aang flying and surrounded by clouds"
            height="100"
            rounded="full"
            width="100"
          />
        </HStack>
      </Box>
    </Center>
  );
};

export default API_NG_FILE;
