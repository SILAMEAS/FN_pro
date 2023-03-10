import Statusbar from '@src/components/compoents(ms)/statusbar/Statusbar';
import {setDATA} from '@src/redux/counter/CounterSlice';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Modal,
  Stack,
  Text,
  useToast,
  VStack,
} from 'native-base';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Constant_Navigator} from '../../../navigation/Constant_Navigator';
import {useAppDispatch, useAppSelector} from '@src/redux/config/hooks';

type Props = {
  navigation: any;
};

const Facebook_forgetPass = ({navigation}: Props) => {
  const {DATA} = useAppSelector(state => state.counter);
  const dispatch = useAppDispatch();
  const Toast = useToast();
  const [showModal, setShowModal] = React.useState(false);

  const GetData = async () => {
    try {
      const res = await fetch(Constant_Navigator.host + '/user');
      const data = await res.json();
      dispatch(setDATA(data));
      // console.log(data);
    } catch (error) {
      alert(error);
    }
  };
  console.log(DATA);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = (data: any) => {
    if (data) {
      console.log('form');
      console.log(data.email);

      const checkEmail = DATA.find((i: any) => i.email === data.email);
      if (checkEmail) {
        Toast.show({
          description: 'Account Found But need to change Password',
          bg: 'green.600',
        });
        setShowModal(true);
      } else {
        Toast.show({
          description: 'Cannot find  your account or not yet register',
          bg: 'red.600',
        });
      }
    }
  };
  const [IsEmail, setIsEmail] = React.useState(true);
  React.useEffect(() => {
    GetData();
  }, []);
  return (
    <Box w={'100%'} h={'100%'} bg={'white'}>
      <Button shadow={2} onPress={() => setShowModal(true)}>
        Button
      </Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px" bg={'black'}>
          <Modal.CloseButton />
          <Modal.Header>Update Profile</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Re-Password</FormControl.Label>
              <Input />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Statusbar colorT={'white'} />
      <Stack>
        <VStack>
          <Center>
            <Heading
              color={'blue.600'}
              borderTopWidth={0.5}
              borderBottomWidth={0.5}
              borderColor={'gray.200'}
              w={'100%'}
              textAlign={'center'}
              py={4}
              fontSize={'2xl'}
            >
              facebook
            </Heading>

            <FormControl
              isRequired
              isInvalid={'email' in errors}
              w={'95%'}
              py={2}
            >
              {IsEmail ? (
                <Text
                  color={'black'}
                  py={2}
                  fontWeight={'bold'}
                  fontSize={'lg'}
                >
                  Enter your moblie phone
                </Text>
              ) : (
                <Text
                  color={'black'}
                  py={2}
                  fontWeight={'bold'}
                  fontSize={'lg'}
                >
                  Enter your moblie email
                </Text>
              )}

              <Controller
                control={control}
                render={c => (
                  <Input
                    onBlur={c.field.onBlur}
                    h={12}
                    bg={'yellow.100:alpha.50'}
                    borderWidth={'1'}
                    borderColor={'gray.900:alpha.20'}
                    color={'gray.500'}
                    onChangeText={val => {
                      c.field.onChange(val);
                    }}
                    value={c.field.value}
                    {...{
                      _focus: {
                        bg: 'yellow.100:alpha.80',
                        color: 'black',
                        borderColor: 'black',
                        borderWidth: '2',
                        shadow: '1',
                      },
                      _web: {
                        _focus: {
                          bg: 'gray.500',
                          color: 'gray.200',
                        },
                      },
                    }}
                  />
                )}
                name="email"
                rules={{
                  validate: {
                    required: value1 => {
                      let re = /\S+@\S+\.\S+/;
                      let regex =
                        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
                      if (regex.test(value1) || re.test(value1)) {
                      } else {
                        return 'Invalid email';
                      }
                    },
                  },

                  required: 'Email required',
                }}
                defaultValue=""
              />
              <FormControl.ErrorMessage>
                {errors.email?.message}
              </FormControl.ErrorMessage>
            </FormControl>
            <HStack w={'95%'} justifyContent={'space-between'}>
              <Button
                w={'49%'}
                bg={'white'}
                borderColor={'blue.600'}
                borderWidth={1}
                rounded={'sm'}
                size={'sm'}
                shadow={1}
                onPress={() => {
                  navigation.navigate(Constant_Navigator.Interface_facebook);
                }}
              >
                <Text color={'blue.600'} fontWeight={'semibold'}>
                  Cancel
                </Text>
              </Button>
              <Button
                onPress={handleSubmit(onSubmit)}
                w={'49%'}
                rounded={'sm'}
                bg={'blue.600'}
                shadow={1}
              >
                <Text fontWeight={'bold'} color={'white'}>
                  Search
                </Text>
              </Button>
            </HStack>
            <Button
              onPress={() => {
                setIsEmail(!IsEmail);
              }}
              bg={'white'}
              _pressed={{bg: 'white'}}
              _web={{_hover: {bg: 'white'}}}
            >
              {IsEmail ? (
                <Text color={'blue.600:alpha.80'} mt={2} fontSize={'md'}>
                  Search by your email or name instead
                </Text>
              ) : (
                <Text color={'blue.600:alpha.80'} mt={2} fontSize={'md'}>
                  Search by your phone number instead
                </Text>
              )}
            </Button>
          </Center>
        </VStack>
      </Stack>
    </Box>
  );
};

export default Facebook_forgetPass;
