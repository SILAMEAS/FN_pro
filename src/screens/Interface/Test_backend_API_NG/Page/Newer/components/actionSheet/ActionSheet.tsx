import {Actionsheet, Button, Center, Text, useToast} from 'native-base';
import React from 'react';

import {setDoc_Approve, setIsSubmitOTP} from '@src/redux/counter/CounterSlice';
import {ApproveDoc} from '@screens/Interface/Test_backend_API_NG/service/document';
import {InputOTP} from '@screens/Interface/Test_backend_API_NG/Page/Newer/utils/OTP/InputOTP';
import {useSlide} from '@screens/Interface/Test_backend_API_NG/Page/Newer/components/cheaNit_picker_file/slide';
import {useAppDispatch, useAppSelector} from '@src/redux/config/hooks';

export function ActionSheet({isOpen, onOpen, onClose, otp}: any) {
  const {next} = useSlide();
  console.log(otp);
  const {IsSubmitOTP, ForSign} = useAppSelector(state => state.counter);
  //===============================

  const dispatch = useAppDispatch();
  const toast = useToast();
  const submit = () => {
    dispatch(setIsSubmitOTP(true));
    toast.show({
      bgColor: 'yellow.500',
      title: 'Press next to continue',
      placement: 'top',
    });
  };

  return (
    <Center mt={10}>
      <Button
        onPress={() => {
          onOpen();

          if (IsSubmitOTP) {
            onClose();
          }
        }}
        bg={'black'}
      >
        <Text color={'yellow.600'} fontWeight={'bold'} fontSize={'md'}>
          Press here to complete OTP
        </Text>
      </Button>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content
          h={200}
          justifyContent={'center'}
          w={'100%'}
          bg={'black'}
        >
          <Center h={'100%'} py={10}>
            <InputOTP otpValue={otp} />
            <Button
              mt={5}
              borderColor={'yellow.600'}
              bg={'black'}
              borderWidth={2}
              onPress={async () => {
                submit();
                const data = await ApproveDoc(
                  ForSign.IdSession,
                  ForSign.Actor,
                  ForSign.Document,
                  otp,
                );
                const da = data?.data1;
                dispatch(setDoc_Approve(da));
                if (data?.message === 'done') {
                  next();
                }
              }}
            >
              <Text color={'yellow.600'}> Submit OTP</Text>
            </Button>
          </Center>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
}
