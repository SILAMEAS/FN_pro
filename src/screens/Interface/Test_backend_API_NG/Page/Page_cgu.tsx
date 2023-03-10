import {useRoute} from '@react-navigation/native';
import {setData_certificate} from '@src/redux/counter/CounterSlice';

import {Box, Button, Heading, Text, VStack} from 'native-base';
import React from 'react';

import {Constant_Navigator} from '../../../../navigation/Constant_Navigator';
// import {Constant_Navigator} from '../../CloneUI_Facebook/Constant_Navigator';
import {Generate_certificate} from '../service/certificate';
import { useAppDispatch, useAppSelector } from "@src/redux/config/hooks";

const Page_cgu = ({navigation}: any) => {
  const {Data_cgu} = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  const {
    params: {sessionUrl},
  }: any = useRoute();
  const GenerateCertificate = async () => {
    console.log(
      '========================= Waiting ===============================',
    );
    const data = await Generate_certificate(sessionUrl, Data_cgu);
    dispatch(setData_certificate(data));
    console.log(
      '========================= Waiting ===============================',
    );
    navigation.navigate(Constant_Navigator.Page_certificate);
  };
  return (
    <Box>
      <VStack>
        <Heading mx={'auto'} py={10}>
          CGU
        </Heading>
        <Box bg={'blue.800'} rounded={'lg'} p={10}>
          <Text color={'white'}>Actor : {Data_cgu.actor}</Text>
          <Text color={'white'}>Authority : {Data_cgu.authority}</Text>
          <Text color={'white'}>DownloadUrl : {Data_cgu['download-url']}</Text>
          <Text color={'white'}>Session : {Data_cgu.session}</Text>
          <Text color={'white'}>Token : {Data_cgu.token}</Text>
          <Text color={'white'}>Version : {Data_cgu.version}</Text>
          <Button onPress={GenerateCertificate} mt={5}>
            Generate Certificate
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default Page_cgu;
