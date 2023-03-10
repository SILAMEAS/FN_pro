import {setIsSubmitOTP} from '@src/redux/counter/CounterSlice';

import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';


import {ActiveScenario} from '../../../service/scenario';
import {generate_OTP} from '../../../service/sessions';
import {ActionSheet} from '../components/actionSheet/ActionSheet';
import {useDialog} from '../components/cheaNit_picker_file/dailog';
import Notification from '../components/notification';
import {Constant_Navigator} from '@src/navigation/Constant_Navigator';
import { useAppDispatch, useAppSelector } from "@src/redux/config/hooks";

const PageScenario = () => {
  const {DataScenario} = useAppSelector((state) => state.counter);
  console.log(
    '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
  );

  // state
  const [ALERT, SetAlert] = useState(false);
  const [IsOtp, setIsOtp] = useState(false);
  const [otp, setOtp] = useState(0);
  const [ScenarioOrOTP, setScenarioOrOTP] = useState(true);
  //======================================================

  // redux
  const {ForSign} = useAppSelector((state) => state.counter);
  const otpCompete = useDialog();
  const {isOpen, onOpen, onClose} = useDisclose();
  const dispatch = useAppDispatch();
  useEffect(() => {
    setIsOtp(false);
  }, [isOpen]);
  //=====================================

  return (
    <Box
      py={4}
      px={4}
      rounded={'lg'}
      w={['100%']}
      h={['60%', `${Constant_Navigator.HeightScreenWeb}`]}
    >
      <Notification
        bg={'black'}
        ColorText={'yellow.600'}
        isOpen={ALERT}
        text="Your Scenario was Active Successfully."
      />
      <Notification
        bg={'black'}
        isOpen={IsOtp}
        ColorText={'yellow.600'}
        text={'OTP is ' + otp + ' will expire after 15 minutes'}
      />
      <Heading
        color={'yellow.600'}
        fontWeight={'bold'}
        textAlign={'center'}
        mb={5}
      >
        {!ScenarioOrOTP
          ? 'Generate OTP for Process Next Step'
          : ' Scenario was created'}
      </Heading>
      {!ScenarioOrOTP ? (
        <Center h={'70%'} borderWidth={1} borderColor={'yellow.600'}>
          <VStack space={2}>
            <Button color={'blue.700'} bg={'black'}>
              Press OK for generate OTP
            </Button>
            <HStack w={'100%'} space={10}>
              <Button
                borderWidth={1}
                borderColor={'white'}
                bg={'black'}
                onPress={() => {
                  SetAlert(false);
                  setScenarioOrOTP(true);
                  setIsOtp(false);
                }}
                px={5}
              >
                Cancel
              </Button>
              <Button
                borderWidth={1}
                borderColor={'white'}
                bg={'yellow.600'}
                fontWeight={'extrabold'}
                px={10}
                onPress={async () => {
                  SetAlert(false);
                  const gen = await generate_OTP(ForSign);
                  setOtp(gen);
                  setIsOtp(true);
                  otpCompete.onOpen();
                }}
              >
                OK
              </Button>
            </HStack>
          </VStack>
          <ActionSheet
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            otp={otp}
          />
        </Center>
      ) : (
        <>
          <Center h={'70%'}>
            <VStack
              w={['100%', '50%']}
              py={4}
              px={8}
              space={3}
              borderTopWidth={2}
              borderBottomWidth={3}
              borderColor={'yellow.600'}
              justifyContent={'center'}
              alignItems={'center'}
              rounded={'lg'}
            >
              <Box py={[10, 20]}>
                <VStack space={5}>
                  <Text fontWeight={'bold'} color={'yellow.600'}>
                    Date :{DataScenario?.date?.split('T')[0]}
                  </Text>
                  <Text fontWeight={'bold'} color={'yellow.600'}>
                    Time :{DataScenario?.date?.split('T')[1].split('.')[0]}
                  </Text>
                  <Text fontWeight={'bold'} color={'yellow.600'}>
                    Id :{DataScenario?.url?.split('/')[6]}
                  </Text>
                  <Text fontWeight={'bold'} color={'yellow.600'}>
                    In session :{DataScenario?.url?.split('/')[4]}
                  </Text>
                  <Text fontWeight={'bold'} color={'yellow.600'}>
                    Version :{DataScenario?.url?.split('/')[2]}
                  </Text>
                </VStack>
              </Box>
            </VStack>
          </Center>
          <VStack
            space={2}
            w={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Button bg={'black'}>
              <Text
                color={'yellow.600'}
                borderBottomWidth={1}
                borderColor={'yellow.600'}
              >
                Press ok to activate your scenario
              </Text>
            </Button>
            <Button
              w={['100%', '20%']}
              borderWidth={1}
              borderColor={'yellow.600'}
              bg={'black'}
              onPress={async () => {
                dispatch(setIsSubmitOTP(false));
                SetAlert(true);

              const data= await ActiveScenario(DataScenario.url);
              if(data){
                setScenarioOrOTP(false);
              }

              }}
            >
              <Text color={'yellow.600'} fontWeight={'bold'}>
                OK
              </Text>
            </Button>
          </VStack>
        </>
      )}
    </Box>
  );
};

export default PageScenario;
