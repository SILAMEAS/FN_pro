import {useRoute} from '@react-navigation/native';
import {setDATAofActor} from '@src/redux/counter/CounterSlice';
import {Constant_Navigator} from '@src/navigation/Constant_Navigator';
import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  Text,
  useToast,
} from 'native-base';
import React from 'react';
import {useDispatch} from 'react-redux';
import {get_detail_actor} from '../../service/actors/index';

const Otp = ({navigation}: any) => {
  const [OTP, setOTP] = React.useState('');
  const [showModal, setShowModal] = React.useState(true);
  const {
    params: {urlSession, service1, service},
  }: any = useRoute();
  console.log(' OTP page');
  console.log(service1 + ' / ' + service);
  // const {DATAofActor} = useSelector((state: RootState) => state.counter);
  const Toast = useToast();
  const dispatch = useDispatch();
  const sumbitOTP = async () => {
    const res = await fetch(
      Constant_Navigator.host_API_NG_ONE + urlSession + '/check-otp',
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          certignarole: '2',
          certignahash: 'ySsPUR23',
          certignauser: 'pps#test',
          Accept: 'application/json',
          DefaultLanguage: 'fr',
        },
        body: JSON.stringify({otp: OTP}),
      },
    );
    const data = await res.json();
    if (data.otp || data.actor) {
      Toast.show({
        title: 'Verify Account',
        variant: 'solid',
        description: 'Success',
        style: {
          backgroundColor: 'green',
        },
      });
      navigation.navigate(Constant_Navigator.Api_ng_profile_actor, {
        actorUrl: service1,
        pdfUrl: service,
        sessionUrl: urlSession,
        otp: data.otp,
      });
      setShowModal(false);

      dispatch(setDATAofActor(await get_detail_actor(service1)));
    } else {
      Toast.show({
        title: 'Not success',
        variant: 'solid',
        style: {
          backgroundColor: 'red',
        },
        description: 'Sorry, Your OTP is invalid',
      });
    }
  };
  return (
    <Box>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          navigation.navigate(Constant_Navigator.API_NG);
        }}
      >
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Check OTP</Modal.Header>
          <Modal.Body bg={'black'}>
            <FormControl>
              <FormControl.Label>Enter your OTP</FormControl.Label>
              <Input
                value={OTP}
                onChangeText={val => {
                  setOTP(val);
                }}
                color={'white'}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                bg={'red.500'}
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate(Constant_Navigator.API_NG);
                }}
              >
                <Text color={'white'}>Cancel</Text>
              </Button>
              <Button
                bg={'green.600'}
                onPress={() => {
                  sumbitOTP();
                }}
              >
                Submit OTP
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default Otp;
