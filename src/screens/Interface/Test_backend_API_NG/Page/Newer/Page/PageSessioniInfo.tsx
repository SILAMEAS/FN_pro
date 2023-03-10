import {
  setAllFileUpload,
  setDataScenario,
  setForSign,
  setOne,
} from '@src/redux/counter/CounterSlice';

import {addDoc} from '@screens/Interface/Test_backend_API_NG/service/document';
import {SecondOfDay} from '@src/utils/Date/CalculateDate';
import {
  Box,
  Center,
  HStack,
  Text,
  VStack,
  Pressable,
  Button,
  useToast,
  Heading,
} from 'native-base';
import React, {useEffect, useState} from 'react';

import {add_actor} from '../../../service/actors/index';
import {add} from '../../../service/scenario';

import {MyRadioButton} from '../components/cheaNit_picker_file/my_radio_button';
import {CountdownTimer} from '../components/countdown/CountdownTimer';
import ModalA from '../components/modal/Modal';
import {ConvertArrayToObject} from '../utils/session/convert_A_O/Convert';
import {useSlide} from '@screens/Interface/Test_backend_API_NG/Page/Newer/components/cheaNit_picker_file/slide';
import {Constant_Navigator} from '@src/navigation/Constant_Navigator';
import {useAppDispatch, useAppSelector} from '@src/redux/config/hooks';
const PageSessionDetail = ({navigation}: any) => {
  const [doc, setDoc] = useState('');
  const [act, setActor] = useState('');

  //////////////////////////////////////////////////// modal
  const [modalVisibleAct, setModalVisibleAct] = useState(false);
  const [modalVisibleDoc, setModalVisibleDoc] = useState(false);
  //////////////////////////////////////////////////// redux

  const dispatch = useAppDispatch();
  const toast = useToast();
  const {AllFileUpload, GetOne, ForSign} = useAppSelector(
    state => state.counter,
  );
  console.log('==============XXX');
  console.log(ForSign);
  //////////////////////////////////////////////////// get file upload
  // add doc
  const AddDoc = async (n: any) => {
    const {url} = await addDoc({urlDoc: n, idS: GetOne.id});
    console.log('//////////////////////////////////////////////////// add doc');
    dispatch(setOne({...GetOne, documents: [...GetOne.documents, url]}));
    console.log('888888888888888888888888888888888');
    console.log(n);
    console.log(AllFileUpload.uploads);
    console.log('888888888888888888888888888888888');

    const newData = AllFileUpload.uploads.filter(i => i !== n);
    dispatch(
      setAllFileUpload({
        uploads: [...newData],
      }),
    );
  };
  // get actors
  const AddActor = async (ILogin: string) => {
    const {url, e} = await add_actor({LoginA: ILogin, idS: GetOne.id});
    console.log(
      '//////////////////////////////////////////////////// get actors',
    );

    if (e?.name !== 'ERR_CONFLICT' || e?.name === undefined) {
      dispatch(setOne({...GetOne, actors: [...GetOne.actors, url]}));
      console.log(url);
      setActor(url);
    } else {
      toast.show({
        title: 'Actor have been created in session',
        bg: 'red.600',
      });
    }
  };
  const {next} = useSlide();
  const dataA = ConvertArrayToObject(GetOne.actors);

  const dataD = ConvertArrayToObject(GetOne.documents);

  const AddScenario = async () => {
    try {
      const data = await add(
        [ForSign.Document, ForSign.Actor],
        ForSign.IdSession,
      );
      console.log('hghg');
      console.log(data);
      data && next();
      dispatch(setDataScenario(data));
    } catch (error) {
      console.log(error);
    }
  };

  const saveData = () => {
    dispatch(
      setForSign({
        Actor: act,
        Document: doc,
        IdSession: '' + GetOne.id,
        Certificate: '',
      }),
    );
    console.log(
      'SAVE DATA==============================================================',
    );
    console.log(act);
  };
  console.log(
    '////////////////////////////////////////////////////////',
    modalVisibleDoc,
  );
  const {back} = useSlide();
  useEffect(() => {
    if (ForSign === undefined) {
      back();
      navigation.navigate(Constant_Navigator.NewP_Session);
    }
  }, []);

  return (
    // GetOne.expires.split('T')[0]
    <Box
      py={4}
      px={4}
      rounded={'lg'}
      w={['100%', '50%']}
      h={['100%', `${Constant_Navigator.HeightScreenWeb}`]}
    >
      <Heading
        color={'yellow.600'}
        fontWeight={'bold'}
        fontSize={'xl'}
        textAlign={'center'}
      >
        Choose file before make scenario
      </Heading>
      <Center opacity={modalVisibleAct || modalVisibleDoc ? 0.5 : 1} h={'100%'}>
        <Text fontWeight={'bold'} fontSize={['lg', 'xl']} color={'yellow'}>
          Session : {GetOne.id}
        </Text>

        <Box
          borderColor={'yellow.600'}
          borderWidth={2}
          p={[4, 50]}
          my={5}
          rounded={'md'}
          bg={'black'}
          w={'100%'}
        >
          <VStack space={'1'} w={'100%'}>
            <HStack w={'100%'} space={10}>
              <VStack w={'100%'}>
                <Text fontWeight={'bold'} color={'yellow.600'}>
                  *Actor in Session :{' <>'}
                  {ForSign?.Actor !== '' && ForSign?.Actor?.slice(16)}
                </Text>
                {ForSign?.Actor === '' &&
                  (dataA?.length === 0 ? (
                    <Text> none</Text>
                  ) : (
                    <MyRadioButton
                      data={dataA}
                      onChange={v => {
                        setActor(v);
                      }}
                    />
                  ))}
                {ForSign?.Actor === '' && (
                  <Pressable
                    onPress={() => {
                      setModalVisibleAct(true);
                    }}
                    ml={'70%'}
                  >
                    <Text
                      w={100}
                      textAlign={'center'}
                      rounded={'md'}
                      px={2}
                      color={'yellow.600'}
                      fontWeight={'bold'}
                      borderWidth={1}
                    >
                      Add actor
                    </Text>
                  </Pressable>
                )}
              </VStack>
            </HStack>
            <HStack space={2}>
              <VStack w={'100%'}>
                <Text fontWeight={'bold'} color={'yellow.600'}>
                  *Document in Session :{'  <>'}
                  {ForSign?.Document !== '' && ForSign?.Document?.slice(16)}
                </Text>
                {ForSign?.Document === '' &&
                  (dataD?.length === 0 ? (
                    <Text> none</Text>
                  ) : (
                    <MyRadioButton
                      data={dataD}
                      onChange={v => {
                        setDoc(v);
                      }}
                    />
                  ))}
                {ForSign?.Document === '' && (
                  <Pressable
                    ml={'70%'}
                    onPress={() => {
                      setModalVisibleDoc(true);
                    }}
                  >
                    <Text
                      w={[100, 100]}
                      rounded={'md'}
                      px={2}
                      color={'yellow.600'}
                      fontWeight={'bold'}
                      borderWidth={1}
                    >
                      Select Doc
                    </Text>
                  </Pressable>
                )}
              </VStack>
            </HStack>
            {ForSign?.Actor !== '' &&
            ForSign?.Document !== '' &&
            ForSign?.IdSession !== '' ? (
              <Button
                onPress={AddScenario}
                borderColor={'yellow.600'}
                borderWidth={1}
                bg={'black'}
                mt={'10'}
              >
                <Text color={'yellow.600'} fontWeight={'bold'}>
                  ADD TO SCENARIO
                </Text>
              </Button>
            ) : (
              <Button
                onPress={saveData}
                borderColor={'yellow.600'}
                borderWidth={1}
                bg={'black'}
                mt={'10%'}
              >
                <Text color={'yellow.600'}>SAVE</Text>
              </Button>
            )}
          </VStack>
        </Box>

        <CountdownTimer
          targetDate={
            new Date().getTime() + SecondOfDay(GetOne.expires, new Date())
          }
          prop={{
            borderColor: 'yellow.600',
            borderWidth: 2,
            p: 2,
            rounded: 'lg',
          }}
        />
      </Center>
      <Box>
        <ModalA
          modalVisible={modalVisibleAct}
          setModalVisible={setModalVisibleAct}
          title={'Add Actor'}
          isForm={true}
          body={AllFileUpload?.uploads}
          Func={async (s: any) => {
            await AddActor(s);
          }}
        />

        <ModalA
          modalVisible={modalVisibleDoc}
          setModalVisible={setModalVisibleDoc}
          title={"If you don't see file please upload"}
          body={AllFileUpload.uploads}
          Func={async (s: any) => {
            await AddDoc(s);
          }}
        />
      </Box>
    </Box>
  );
};

export default PageSessionDetail;
