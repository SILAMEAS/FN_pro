import {
  setAllSession,
  setDATAofActor,
  setDATAofFile,
  setDATAofSession,
} from '@src/redux/counter/CounterSlice';

import {Constant_Navigator} from '@src/navigation/Constant_Navigator';
import {
  Box,
  Button,
  Center,
  DeleteIcon,
  FormControl,
  HStack,
  Input,
  Modal,
  Pressable,
  ScrollView,
  Text,
  useToast,
} from 'native-base';
import React, {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
// import {Pressable} from 'react-native';

import {add_actor, get_detail_actor} from '../../service/actors/index';
import Modal_scenario from '../../components/scenario/Modal_scenario';
import { useAppDispatch, useAppSelector } from "@src/redux/config/hooks";
// import {Constant_Navigator} from '../CloneUI/Constant_Navigator';
// import Modal_scenario from './components/scenario/Modal_scenario';
// import {add_actor, get_detail_actor} from './service/actors/service';

const API_NG_crud = ({navigation}: any) => {
  const [getURL, setGetUrl] = React.useState('');
  // modal
  const [showModal, setShowModal] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const [showModal3, setShowModal3] = React.useState(false);
  const [showModalScenario, setShowModal3Scenario] = React.useState(false);
  // state
  const [first, setfirst] = React.useState('');
  const [Uploads, setUploads] = React.useState([]);
  const [Have, setHave] = React.useState([]);
  const [LoginA, setLoginA] = React.useState('');
  // redux
  const dispatch = useAppDispatch();
  const {AllSession, DATAofSession, DATAofFile} = useAppSelector(
    (state) => state.counter,
  );

  // get session
  const getSession = async () => {
    try {
      const res = await fetch(Constant_Navigator.host_API_NG + '/sessions');
      const data = await res.json();
      dispatch(setAllSession(data.sessions));
      console.log('---------------------');
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  // add session
  const addSession = async () => {
    const res = await fetch(Constant_Navigator.host_API_NG + '/sessions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        certignarole: '2',
        certignahash: 'ySsPUR23',
        certignauser: 'pps#test',
      },
      body: JSON.stringify({ttl: 864000}),
    });
    const data = await res.json();
    console.log(data);
    if (data) {
      getSession();
    }
  };
  // delete session
  const deleteSession = async (id: any) => {
    const res = await fetch(
      Constant_Navigator.host_API_NG_ONE + id + '/close',
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json;charset=UTF-8',
          Certignarole: '2',
          Certignahash: 'ySsPUR23',
          Certignauser: 'pps#test',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          force: true,
          reason: 'culpa eu pariatur et',
          'manifest-data': {},
        }),
      },
    );
    const data = await res.json();
    if (data) {
      getSession();
    }
  };
  // get detail session
  const get_detail_session = async (first: string) => {
    const res = await fetch(Constant_Navigator.host_API_NG_ONE + first, {
      method: 'GET',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        certignarole: '2',
        certignahash: 'ySsPUR23',
        certignauser: 'pps#test',
      },
    });

    const data = await res.json();
    dispatch(setDATAofSession(data));
    setHave(data.documents);

    console.log(')((((((Get datail about session (((((((');
    console.log(data);
  };

  // get file
  const getfile = async () => {
    try {
      const res = await fetch(Constant_Navigator.host_API_NG + '/uploads');
      const {uploads} = await res.json();

      setUploads(uploads);
    } catch (error) {
      console.log(error);
    }
  };
  // get detail file
  const get_detail_file = async (first: string) => {
    const res = await fetch(Constant_Navigator.host_API_NG_ONE + first, {
      method: 'GET',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        certignarole: '2',
        certignahash: 'ySsPUR23',
        certignauser: 'pps#test',
      },
    });

    const data = await res.json();
    dispatch(setDATAofFile(data));

    console.log(')((((((Get datail about file (((((((');
    console.log(DATAofFile);
  };

  // modal when pop up to show detail about session
  const get_ALL_information_Session = (data: any) => {
    setShowModal(true);
    setfirst(data);
    getfile();
    get_detail_session(data);
  };
  // add file to sessioni
  const addFile = async (first: any, data: any) => {
    const res1 = Constant_Navigator.host_API_NG_ONE + first + '/documents';
    const data3 = {
      'file-name': data.filename + '.pdf',
      'manifest-data': {},
      'user-data': {},
      abstract: 'in et ex',
      title: data.title,
      upload: '/uploads/' + getURL.slice(15),
    };
    console.log(data3);
    const res = await fetch(res1, {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        certignarole: '2',
        certignahash: 'ySsPUR23',
        certignauser: 'pps#test',
        Accept: 'application/json',
        DefaultLanguage: 'fr',
      },
      body: JSON.stringify(data3),
    });
    const dataA = await res.json();
    console.log(dataA);
    if (data) {
      setShowModal(false);
      setShowModal2(false);
    }
  };
  // first component for run
  useEffect(() => {
    getSession();
  }, []);
  const Toast = useToast();
  //form
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = (data: any) => {
    // alert(data.filename + ' / ' + data.title);
    addFile(first, data);
    Toast.show({
      description: 'Success add doc to session ' + first,
      bg: 'green.600',
    });
  };

  return (
    <Center h={'100%'} w={'100%'}>
      <Modal isOpen={showModal2} onClose={() => setShowModal2(false)}>
        <Modal.Content maxWidth="400px" bg={'black'}>
          <Modal.CloseButton />
          <Modal.Header>Add to {first}</Modal.Header>
          <Modal.Body>
            <FormControl
              isRequired
              isInvalid={'filename' in errors}
              w={'95%'}
              py={2}
            >
              <Text color={'white'} py={2} fontWeight={'bold'} fontSize={'lg'}>
                Enter your filename
              </Text>

              <Controller
                control={control}
                render={c => (
                  <Input
                    onBlur={c.field.onBlur}
                    h={12}
                    bg={'yellow.100:alpha.50'}
                    borderWidth={'1'}
                    borderColor={'gray.900:alpha.20'}
                    color={'white'}
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
                name="filename"
                rules={{
                  required: 'filename required',
                }}
                defaultValue=""
              />
              <FormControl.ErrorMessage>
                {errors.filename?.message}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={'title' in errors}
              w={'95%'}
              py={2}
            >
              <Text color={'white'} py={2} fontWeight={'bold'} fontSize={'lg'}>
                Enter your title
              </Text>

              <Controller
                control={control}
                render={c => (
                  <Input
                    color={'white'}
                    onBlur={c.field.onBlur}
                    h={12}
                    bg={'yellow.100:alpha.50'}
                    borderWidth={'1'}
                    borderColor={'gray.900:alpha.20'}
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
                name="title"
                rules={{
                  required: 'title required',
                }}
                defaultValue=""
              />
              <FormControl.ErrorMessage>
                {errors.title?.message}
              </FormControl.ErrorMessage>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal2(false);
                  setShowModal(true);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={handleSubmit(onSubmit)}
                // onPress={() => {
                //   setShowModal2(false);
                //   // addFile(first);

                // }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <HStack w={'100%'} justifyContent={'space-between'} space={10} mt={10}>
        <Button onPress={addSession} zIndex={90} bg={'blue.600'}>
          Create session
        </Button>
        <Button
          onPress={() => {
            navigation.navigate(Constant_Navigator.FilePicker);
          }}
          zIndex={90}
          bg={'blue.600'}
        >
          Upload file
        </Button>
      </HStack>

      <ScrollView w={'100%'} mx={'auto'} overflowY="scroll">
        <Center mt={'15%'} w={'100%'}>
          {AllSession.map(i => (
            <Box w={'100%'} mx={'auto'} key={i}>
              <HStack justifyContent={'center'} alignItems={'center'}>
                <Pressable
                  onPress={() => {
                    get_ALL_information_Session(i);
                  }}
                  w={'1/2'}
                  bg={'green.600'}
                  _hover={{bg: 'red.600'}}
                  rounded="lg"
                >
                  <Text color={'white'} py={2} px={8} borderRadius={2}>
                    {i}
                  </Text>
                </Pressable>
              </HStack>
            </Box>
          ))}
          <Text color={'black'} fontWeight={'bold'} />
        </Center>
      </ScrollView>
      {/* session */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} h={'90%'}>
        <Modal.Content w={'100%'} _web={{w: '100%'}}>
          <Modal.CloseButton />
          <Modal.Header w={'100%'} bg={'blue.300'}>
            {first}
          </Modal.Header>
          <Modal.Body bg={'blue.900'}>
            {Uploads.map(i => {
              return (
                <Box key={i} w={'100%'}>
                  <HStack justifyContent={'center'} alignItems={'center'}>
                    <Text color={'white'} w={'1/2'}>
                      {i}
                    </Text>

                    <Text
                      bg={'green.500'}
                      color={'white'}
                      px={2}
                      py={1}
                      borderWidth={1}
                      borderColor={'white'}
                      borderRadius={'lg'}
                      onPress={() => {
                        setShowModal2(true);
                        setShowModal(false);
                        setGetUrl(i);
                      }}
                    >
                      Add Doc
                    </Text>
                  </HStack>
                </Box>
              );
            })}
          </Modal.Body>
          <ScrollView h={'60%'}>
            <Modal.Footer bg={'red.600'}>
              <Box w={'100%'}>
                <Center py={2}>
                  <Text
                    textAlign={'left'}
                    underline
                    fontWeight={'bold'}
                    fontSize={'lg'}
                  >
                    Information Session
                  </Text>
                  <Box borderBottomWidth={1} borderColor={'white'}>
                    Doc :
                    {DATAofSession.documents.map(i => {
                      return (
                        <Pressable
                          bg={'gray.100'}
                          px={4}
                          py={2}
                          mb={2}
                          key={i}
                          _hover={{
                            bg: 'red.500',

                            textDecoration: 'underline',
                          }}
                        >
                          <Text
                            color={'blue.800'}
                            fontWeight={'bold'}
                            onPress={() => {
                              get_detail_file(i);
                              navigation.navigate(
                                Constant_Navigator.API_NG_FILE,
                                {url: first},
                              );
                              setShowModal(false);
                            }}
                          >
                            {i}
                          </Text>
                        </Pressable>
                      );
                    })}
                    Actors :
                    {DATAofSession.actors.map(i => {
                      return (
                        <Pressable
                          bg={'gray.100'}
                          px={4}
                          py={2}
                          mb={2}
                          _hover={{
                            bg: 'red.500',
                            textDecoration: 'underline',
                          }}
                          key={i}
                        >
                          <Text
                            color={'blue.800'}
                            fontWeight={'bold'}
                            onPress={async () => {
                              const ad = await get_detail_actor(i);
                              dispatch(setDATAofActor(ad));
                              navigation.navigate(
                                Constant_Navigator.Api_ng_actor,
                              );
                              setShowModal(false);
                            }}
                          >
                            {i}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </Box>
                  <Text fontWeight={'bold'} fontSize={'lg'}>
                    Date : {DATAofSession.date.slice(0, 10)}
                  </Text>
                  <Text fontWeight={'bold'} fontSize={'lg'}>
                    expires : {DATAofSession.expires.slice(0, 10)}
                  </Text>
                </Center>
              </Box>
            </Modal.Footer>
          </ScrollView>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal3(!showModal3);
                  setShowModal(false);
                }}
                size={'xs'}
                bg={'green.600'}
              >
                <Text color={'white'}> Add Actor</Text>
              </Button>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                  setShowModal3Scenario(true);
                }}
                bg={'green.600'}
                size={'xs'}
              >
                <Text color={'white'}> Add Scenario</Text>
              </Button>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
                bg={'green.600'}
                size={'xs'}
              >
                <Text color={'white'}>
                  {Have.length !== 0 ? (
                    <Text
                      onPress={() => {
                        alert("can't delete because it have doc");
                      }}
                    >
                      <DeleteIcon color={'blue.800'} size={'lg'} />
                    </Text>
                  ) : (
                    <Text
                      onPress={() => {
                        deleteSession(first);
                        setShowModal(false);
                      }}
                    >
                      <DeleteIcon color={'red.800'} size={'lg'} />
                    </Text>
                  )}
                </Text>
              </Button>
              <Pressable
                onPress={() => {
                  setShowModal(false);
                  deleteSession(first);
                }}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Text
                  bg={'white'}
                  color={'red.600'}
                  textAlign={'center'}
                  alignSelf={'center'}
                >
                  force delete{' '}
                </Text>
              </Pressable>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {/* actor modal */}
      <Modal isOpen={showModal3} onClose={() => setShowModal3(false)} h={'90%'}>
        <Modal.Content w={'100%'} _web={{w: '100%'}}>
          <Modal.CloseButton />
          <Modal.Header w={'100%'} bg={'blue.300'}>
            Add Login for create Actor
          </Modal.Header>
          <Modal.Body bg={'blue.900'}>
            <FormControl
              isRequired
              isInvalid={'nameA' in errors}
              w={'95%'}
              py={2}
            >
              <Input
                color={'white'}
                h={12}
                bg={'yellow.100:alpha.50'}
                borderWidth={'1'}
                borderColor={'gray.900:alpha.20'}
                onChangeText={val => {
                  setLoginA(val);
                }}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer bg={'red.600'}>
            <HStack>
              <Button
                onPress={() => {
                  add_actor({idS: first, LoginA});
                  setShowModal3(false);
                }}
              >
                Add actor to session
              </Button>
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {/* senario modal */}
      <Modal_scenario
        closeOpen={showModalScenario}
        setCloseOpen={setShowModal3Scenario}
        first={first}
        navigation={navigation}
      />
    </Center>
  );
};

export default API_NG_crud;
