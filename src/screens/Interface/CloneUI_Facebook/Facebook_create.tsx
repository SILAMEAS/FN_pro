import Statusbar from '@src/components/compoents(ms)/statusbar/Statusbar';
import {setDATA} from '@src/redux/counter/CounterSlice';

import {
  Box,
  Button,
  Center,
  ChevronLeftIcon,
  CircleIcon,
  FormControl,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useToast,
  VStack,
} from 'native-base';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';

import {Constant_Navigator} from '@src/navigation/Constant_Navigator';
import {useAppDispatch, useAppSelector} from '@src/redux/config/hooks';

const Facebook_create = ({navigation}: any) => {
  const [ps, setPs] = React.useState();
  const Toast = useToast();
  const dispatch = useAppDispatch();
  const datas = useAppSelector(state => state.counter.DATA);

  const Create_Acc = async (dataA: any) => {
    const dataa = {
      name: dataA.name,
      password: dataA.pass,
      email: dataA.email,
      userRole: 'USER',
    };
    console.log('// Fornt end-------------------------------------');
    console.log(dataa);
    try {
      const res = await fetch(Constant_Navigator.host + '/user/create', {
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(dataa),
      });
      const data = await res.json();
      console.log('// back end');
      console.log(data);
      if (data.message === 'T') {
        Toast.show({
          title: 'Success',

          description: 'Acount create successfully',
          bg: 'blue.600',
        });
        dispatch(setDATA([...datas, data]));
        navigation.navigate('Interface_facebook');
      } else {
        Toast.show({
          title: 'Faild',
          description: 'Create Account fail email used',
          bg: 'red.600',
        });
      }
    } catch (error) {
      Toast.show({
        title: 'Problem',

        description: `${error}`,
        bg: 'red.600',
      });
      if (error) {
      }
    }
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = (data: any) => {
    if (data) {
      Create_Acc(data);
    }
  };
  return (
    <Stack w={'100%'} safeArea space={'5%'}>
      <VStack>
        <Statusbar />
        <HStack
          w={'100%'}
          justifyContent={'space-between'}
          bg={'blue.900:alpha.90'}
          h={'10'}
          alignItems={'center'}
          px={2}
        >
          <Text
            color={'white'}
            onPress={() => {
              navigation.navigate('Interface_facebook');
            }}
          >
            <ChevronLeftIcon color={'white'} />
          </Text>
          <Text fontSize={'lg'} fontWeight={'bold'}>
            Join Facebook
          </Text>
          <HStack>
            <CircleIcon color="green.500" />
          </HStack>
        </HStack>
      </VStack>
      <VStack justifyContent={'center'} w={'100%'} mt={2}>
        <Center>
          <Heading fontSize={'xl'}>Want create Account ?</Heading>
          <Text color={'black'}>
            if you want to create account complete this form below.
          </Text>
          <HStack w={'100%'} justifyContent={'center'} space={2} mt={5}>
            <FormControl isRequired w={'45%'} isInvalid={'name' in errors}>
              <Stack>
                <FormControl.Label> Name</FormControl.Label>
                <Controller
                  control={control}
                  render={c => (
                    <Input
                      onBlur={c.field.onBlur}
                      bg={'gray.200'}
                      color={'gray.500'}
                      placeholder="Jonh"
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
                  name="name"
                  rules={{
                    required: 'Name is required',
                  }}
                  defaultValue=""
                />

                <FormControl.ErrorMessage>
                  {errors.name?.message}
                </FormControl.ErrorMessage>
              </Stack>
            </FormControl>
            <FormControl isRequired isInvalid={'email' in errors} w={'45%'}>
              <FormControl.Label>Email</FormControl.Label>
              <Controller
                control={control}
                render={c => (
                  <Input
                    onBlur={c.field.onBlur}
                    bg={'gray.200'}
                    color={'gray.500'}
                    placeholder="Jonh@gmail.com"
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
                        /^\+?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
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
          </HStack>
          <Box w={'80%'}>
            <FormControl isRequired isInvalid={'pass' in errors}>
              <FormControl.Label>Password</FormControl.Label>
              <Controller
                control={control}
                render={c => (
                  <Input
                    onBlur={c.field.onBlur}
                    bg={'gray.200'}
                    color={'gray.500'}
                    placeholder="Password"
                    onChangeText={(val: any) => {
                      c.field.onChange(val);
                      setPs(val);
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
                name="pass"
                rules={{
                  required: 'Password required',
                }}
                defaultValue=""
              />
              <FormControl.ErrorMessage>
                {errors.pass?.message}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={'passRe' in errors}>
              <FormControl.Label>Re-Password</FormControl.Label>
              <Controller
                control={control}
                render={c => (
                  <Input
                    onBlur={c.field.onBlur}
                    bg={'gray.200'}
                    color={'gray.500'}
                    placeholder="Re-Password"
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
                name="passRe"
                rules={{
                  validate: {
                    required: (value1: any) => {
                      if (value1 !== ps) {
                        return 'Re-Password must be match with Password';
                      }
                    },
                  },
                  required: 'Re-Password required',
                }}
                defaultValue=""
              />
              <FormControl.ErrorMessage>
                {errors.passRe?.message}
              </FormControl.ErrorMessage>
            </FormControl>
          </Box>
          <Button
            bg={'blue.600:alpha.90'}
            rounded={'md'}
            mt={3}
            w={'60%'}
            py={'1.5'}
            onPress={handleSubmit(onSubmit)}
          >
            <Text fontWeight={'bold'} fontSize={'lg'}>
              Create Acc
            </Text>
          </Button>
          <VStack space={3} w={'100%'}>
            <HStack
              alignItems={'center'}
              justifyContent="space-between"
              w={'80%'}
              mx={'auto'}
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
                    Portuhues (Brasil)
                  </Text>
                </Center>
              </VStack>
              <VStack>
                <Center>
                  <Text color={'black:alpha.40'} fontWeight={'semibold'}>
                    Khmer
                  </Text>
                  <Text color={'black:alpha.40'} fontWeight={'semibold'}>
                    Treng Viet
                  </Text>
                  <Text color={'black:alpha.40'} fontWeight={'semibold'}>
                    Espanol
                  </Text>
                  <Text color={'black:alpha.40'} fontWeight={'semibold'}>
                    icon
                  </Text>
                </Center>
              </VStack>
            </HStack>
            <VStack justifyContent={'center'} alignItems={'center'} w={'100%'}>
              <Center width={'100%'}>
                <Text color={'black:alpha.40'}>Meta &copy; 2023</Text>
              </Center>
            </VStack>
          </VStack>
        </Center>
      </VStack>
    </Stack>
  );
};

export default Facebook_create;
