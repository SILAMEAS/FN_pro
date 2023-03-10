import Statusbar from '@src/components/compoents(ms)/statusbar/Statusbar';
import {useAppDispatch, useAppSelector} from '@src/redux/config/hooks';
import {setOne} from '@src/redux/counter/CounterSlice';
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  FormControl,
  Heading,
  HStack,
  Input,
  Text,
  useToast,
  VStack,
} from 'native-base';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Platform} from 'react-native';
import {Constant_Navigator} from '../../../navigation/Constant_Navigator';
const Facebook = ({navigation}: any) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const dispatch = useAppDispatch();
  const {GetOne} = useAppSelector(state => state.counter);

  const Toast = useToast();
  const checkLogin = async (dataV: any) => {
    const dataA = {
      email: dataV.email,
      password: dataV.pass,
    };
    console.log('uuuuuuuuuu', dataA);

    try {
      const res = await fetch(Constant_Navigator.host + '/user/check', {
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(dataA),
      });

      const data = await res.json();

      console.log('*----------------', data);
      if (data?.email === dataA.email && data?.password === dataA.password) {
        dispatch(setOne(data));

        Toast.show({
          title: 'Log in ... ',
          bg: 'green.600',
        });
        console.log('UseRole :', data.UserRole);

        data.userRole === 'ADMIN'
          ? navigation.navigate('View_CRUD')
          : navigation.navigate('Interface_facebook_profile');
      } else if (email === '' && name === '') {
        Toast.show({
          title: 'Problem',

          description: 'All field must complete',
          bg: 'red.600',
        });
      } else if (email === '' || name === '') {
        email === ''
          ? Toast.show({
              title: 'Problem',

              description: "Email can't empty",
              bg: 'red.600',
            })
          : Toast.show({
              title: 'Problem',

              description: "Name can't empty",
              bg: 'red.600',
            });
      } else {
        Toast.show({
          title: 'Problem',

          description: 'Invalid email and name',
          bg: 'red.600',
        });
      }
    } catch (error) {
      Toast.show({
        title: `${error}`,

        description: 'Invalid email and name',
        bg: 'red.600',
      });
    }
  };
  console.log('-------------------------main(facebook)');
  console.log(GetOne);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const onSubmit = (data: any) => {
    setName(data.name);
    setEmail(data.email);
    if (data) {
      checkLogin(data);
    }
  };

  return (
    <Center bg={'white'} safeArea _android={{pt: '3'}}>
      <Statusbar />
      <Container width={'90%'} mx={'auto'}>
        <VStack w={'100%'} h={'100%'} space={'6'}>
          <VStack space={2}>
            <HStack>
              {Platform.OS === 'ios' && (
                <VStack>
                  <Heading
                    color={'blue.700'}
                    fontSize={'md'}
                    onPress={() => {
                      navigation.navigate('View_CRUD');
                    }}
                  >
                    Facebook
                  </Heading>
                  <Text color={'black'}>
                    Connect with friends and the world around you on Facebook.
                  </Text>
                </VStack>
              )}

              <Box w={'100%'} rounded={'md'}>
                <VStack alignItems={'center'} space={2} pt={'1/6'}>
                  <Heading
                    color={'blue.600:alpha.90'}
                    fontSize={'2xl'}
                    onPress={() => {
                      navigation.navigate('View_CRUD');
                    }}
                  >
                    facebook
                  </Heading>
                </VStack>
                <VStack w={'100%'} mt={3}>
                  <Box alignItems="center">
                    <Box w="100%" maxWidth="800px">
                      <FormControl isRequired isInvalid={'email' in errors}>
                        <FormControl.Label>Email</FormControl.Label>
                        <Controller
                          control={control}
                          render={c => (
                            <Input
                              shadow={1}
                              onBlur={c.field.onBlur}
                              bg={'yellow.100:alpha.50'}
                              color={'gray.500'}
                              placeholder="xxxx@gmail.com"
                              onChangeText={val => {
                                c.field.onChange(val);
                              }}
                              value={c.field.value}
                              {...{
                                _focus: {
                                  bg: 'gray.500',
                                  color: 'gray.200',
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
                      <FormControl isRequired isInvalid={'pass' in errors}>
                        <FormControl.Label>Password</FormControl.Label>
                        <Controller
                          control={control}
                          render={c => (
                            <Input
                              onBlur={c.field.onBlur}
                              bg={'yellow.100:alpha.50'}
                              shadow={1}
                              color={'gray.500'}
                              placeholder="John"
                              onChangeText={val => {
                                c.field.onChange(val);
                              }}
                              value={c.field.value}
                              {...{
                                _focus: {
                                  bg: 'gray.500',
                                  color: 'gray.200',
                                },
                              }}
                            />
                          )}
                          name="pass"
                          rules={{
                            required: 'Password is required',
                          }}
                          defaultValue=""
                        />
                        <FormControl.ErrorMessage>
                          {errors.pass?.message}
                        </FormControl.ErrorMessage>
                      </FormControl>
                    </Box>
                  </Box>
                </VStack>
              </Box>
            </HStack>
            <VStack alignItems={'center'} space={1}>
              <Button
                w={'100%'}
                bg={'blue.600:alpha.90'}
                onPress={handleSubmit(onSubmit)}
                rounded={'sm'}
              >
                <Text fontWeight={'bold'} color={'white'} fontSize={'md'}>
                  Log in
                </Text>
              </Button>
              <Button
                bg={'white'}
                _pressed={{bg: 'white'}}
                onPress={() => {
                  navigation.navigate(
                    Constant_Navigator.Interface_facebook_forgetPassword,
                  );
                }}
              >
                <Text color={'blue.600'}>Forgot Password?</Text>
              </Button>
              <HStack
                w={'100%'}
                justifyContent={'center'}
                alignItems={'center'}
                px={'1/4'}
                mb={2}
              >
                <Divider bg="black:alpha.30" />
                <Text color={'black:alpha.70'} px={3}>
                  or
                </Text>
                <Divider bg="black:alpha.30" />
              </HStack>
              <Button
                bg={'white'}
                w={'90%'}
                rounded={'sm'}
                borderWidth={'1'}
                borderColor={'black:alpha.20'}
                _pressed={{bg: 'blue.100'}}
                py={2}
                onPress={() => {
                  navigation.navigate('Interface_facebook_create');
                }}
              >
                <Text color={'black'}>Create new account</Text>
              </Button>
            </VStack>
          </VStack>
          <VStack space={2} w={'100%'}>
            <HStack
              alignItems={'center'}
              justifyContent="space-between"
              w={'100%'}
              px={10}
              mt={30}
            >
              <VStack>
                <Center>
                  <Text color={'black:alpha.40'} fontWeight={'semibold'}>
                    English (US)
                  </Text>
                  <Text color={'black:alpha.40'} fontWeight={'semibold'}>
                    Francais (France)
                  </Text>
                  <Text color={'black:alpha.40'} fontWeight={'semibold'}>
                    dsf
                  </Text>
                  <Text color={'black:alpha.40'} fontWeight={'semibold'}>
                    Portunes (Brazil)
                  </Text>
                </Center>
              </VStack>
              <VStack>
                <Center>
                  <Text color={'black:alpha.40'} fontWeight={'semibold'}>
                    Khmer
                  </Text>
                  <Text color={'black:alpha.40'} fontWeight={'semibold'}>
                    Trend Viet
                  </Text>
                  <Text color={'black:alpha.40'} fontWeight={'semibold'}>
                    Espagnol
                  </Text>
                  <Text color={'black:alpha.40'} fontWeight={'semibold'}>
                    icon
                  </Text>
                </Center>
              </VStack>
            </HStack>
            <VStack justifyContent={'center'} alignItems={'center'} w={'100%'}>
              <Center>
                <Text color={'black:alpha.40'}>Meta &copy; 2023</Text>
              </Center>
            </VStack>
          </VStack>
        </VStack>
      </Container>
    </Center>
  );
};

export default Facebook;
