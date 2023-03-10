import {
  setActor_ng,
  setDataScenario,
  setDoc_ng,
} from '@src/redux/counter/CounterSlice';
import {Constant_Navigator} from '@src/navigation/Constant_Navigator';
import {
  Button,
  CheckIcon,
  FormControl,
  HStack,
  Input,
  Modal,
  Select,
  Text,
} from 'native-base';
import React from 'react';
import {ActiveScenario, add, getAllScenario} from '../../service/scenario';
import {generate_OTP} from '../../service/sessions';
import {useAppDispatch, useAppSelector} from '@src/redux/config/hooks';

interface type {
  closeOpen?: boolean;
  setCloseOpen?: any;
  first: any;
  navigation: any;
}

const Modal_scenario = ({closeOpen, setCloseOpen, first, navigation}: type) => {
  console.log(closeOpen);
  const dispatch = useAppDispatch();
  //   const [showModal, setShowModal] = React.useState(closeOpen);
  const [service, setService] = React.useState('');
  const [service1, setService1] = React.useState('');
  const [close, setClose] = React.useState(false);
  const {DATAofSession, DataScenario} = useAppSelector(state => state.counter);

  const onSubmit = async () => {
    const data = {service, service1};
    dispatch(setActor_ng(service1));
    dispatch(setDoc_ng(service));
    // console.log(service + ' : ' + service1);
    const daTa = await add(data, first);
    dispatch(setDataScenario(daTa));
  };

  const showScenario = async () => {
    const data = await getAllScenario(first);
    dispatch(setDataScenario(data));
  };

  React.useEffect(() => {
    showScenario;
  }, []);
  return (
    <>
      {/* add scenario */}
      <Modal
        isOpen={closeOpen}
        h={'90%'}
        onClose={() => {
          setCloseOpen(false);
        }}
      >
        <Modal.Content w={'100%'} _web={{w: '100%'}}>
          <Modal.CloseButton
            onPress={() => {
              setCloseOpen(false);
            }}
          />
          <Modal.Header w={'100%'} bg={'blue.300'}>
            Add Scenario to session {first}
          </Modal.Header>
          <Modal.Body bg={'blue.900'}>
            <FormControl py={2} minWidth="200">
              <Text>Process</Text>
              <Input value="cosign" />
            </FormControl>
            <Select
              selectedValue={service}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => setService(itemValue)}
            >
              {DATAofSession.documents.map((i: string) => {
                return <Select.Item label={i} value={i} key={i} />;
              })}
            </Select>
            <Select
              selectedValue={service1}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => setService1(itemValue)}
            >
              {DATAofSession.actors.map((i: string) => {
                return <Select.Item label={i} value={i} key={i} />;
              })}
            </Select>
          </Modal.Body>
          <Modal.Footer>
            <HStack
              justifyContent={'space-around'}
              w={'100%'}
              alignItems={'center'}
            >
              <Button
                onPress={() => {
                  setClose(true);
                  setCloseOpen(false);
                  showScenario();
                }}
              >
                Show scenario
              </Button>
              <Button onPress={onSubmit}>Add SCENARIO</Button>
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {/* show scenario */}
      <Modal
        isOpen={close}
        h={'90%'}
        onClose={() => {
          setClose(false);
        }}
      >
        <Modal.Content w={'100%'} _web={{w: '100%'}}>
          <Modal.CloseButton
            onPress={() => {
              setClose(false);
            }}
          />
          <Modal.Header w={'100%'} bg={'blue.300'}>
            show scenario
          </Modal.Header>
          <Modal.Body bg={'blue.900'}>
            <Text color={'white'}>{DataScenario['0']}</Text>
          </Modal.Body>
          <Modal.Footer>
            <HStack
              justifyContent={'space-around'}
              w={'100%'}
              alignItems={'center'}
            >
              <Button
                onPress={() => {
                  navigation.navigate(Constant_Navigator.Otp, {
                    urlSession: first,
                    service1: service1,
                    service: service,
                  });
                }}
                bg={'red.800'}
              >
                <Text color={'white'} fontWeight={'bold'}>
                  Check OTP
                </Text>
              </Button>
              <Button
                bg={'green.600'}
                onPress={() => {
                  generate_OTP({first, service, service1});
                }}
              >
                Generate OTP
              </Button>
              <Button
                onPress={() => {
                  ActiveScenario(DataScenario[0]);
                }}
              >
                Ative Scenario
              </Button>
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default Modal_scenario;
