import React, {useEffect, useState} from 'react';
import {
  AddIcon,
  Box,
  Button,
  Center,
  HStack,
  Menu,
  Pressable,
  ScrollView,
  Text,
  useDisclose,
  useToast,
  VStack,
} from 'native-base';
import HeaderCustom from '@screens/Interface/Docusign/components/HeaderCustom';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChevronLeft,
  faCloudUpload,
  faFileImport,
  faFileLines,
  faFilePdf,
  faHomeUser,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import {COLOR} from '@screens/Interface/Docusign/color/Color';
import {Constant_Navigator} from '@src/navigation/Constant_Navigator';
import {useNavigation} from '@src/navigation';
import CardDocument from '@screens/Interface/Docusign/components/CardDocument';
import MyActionSheet from '@screens/Interface/Docusign/components/MyActionSheet';
import {
  logout,
  setBlurScreen,
  setDocInSession,
  setFileBase64,
  setFileNamePicker,
  setFileType,
  setForScenarioProcess,
  setForSign,
  setSourcePDF,
} from '@src/redux/counter/CounterSlice';
import {FilePicker} from '@components/commons/file_picker';
import {useAppDispatch, useAppSelector} from '@src/redux/config/hooks';
import {decode} from '@utils/base64_arraybuffer';
import {
  SignatureFormat,
  SignatureLevel,
  SignatureType,
  // SignatureType,
} from '@utils/classes/interfaces/APIInterface';
import {
  caApi,
  certificateApi,
  documentsApi,
  scenarioApi,
  scenariosApi,
  sessionApi,
  TypeApprove,
  TypeCreateDoc,
  TypeGCU,
  TypeGenuine,
  TypeOTP,
  TypeScenarioI,
  TypeUpload,
  uploadApi,
} from '@screens/Interface/Docusign/page/Type';
import {MyRadioButton} from '@components/commons/my_radio_button';
import {ConvertArrayToObject} from '@screens/Interface/Test_backend_API_NG/Page/Newer/utils/session/convert_A_O/Convert';
import StepAfterGenerateCertificate from '@screens/Interface/Docusign/utils/StepAfterGenerateCertificate';
import {DropMenu} from '@screens/Interface/Docusign/components/DropMenu';
import {MyToast} from '@screens/Interface/Test_backend_API_NG/Page/Newer/components/cheaNit_picker_file/my_toast';
function PageAddPdfDocusign() {
  const navigate = useNavigation();
  const addMoreFile = useDisclose();
  const addMoreFileReady = useDisclose();
  const {
    FileBase64,
    ForSign,
    FileNamePicker,
    DocInSession,
    ForScenarioProcess,
    IsScenarioInput,
  } = useAppSelector(state => state.counter);
  const [rotate, setRotate] = useState(false);
  const dispatch = useAppDispatch();
  const DataDoc = ConvertArrayToObject(DocInSession, 'url', 'fileName');
  const [docSelected, setDocSelected] = useState<string | undefined>();
  const [AddFileType, setAddFileType] = useState('');
  const toast = useToast();
  useEffect(() => {
    setDocSelected(prev => (!prev ? DataDoc[0].value : prev));
  }, [DataDoc]);

  const uploadFile = async () => {
    const upload = await uploadApi.upload<TypeUpload>(decode(FileBase64), {
      'Content-Type': AddFileType,
      Accept: 'application/json',
    });
    if (upload) {
      try {
        const data = await documentsApi.createDocument<TypeCreateDoc>(
          ForSign.IdSession + '/documents',
          {
            'file-name': FileNamePicker,
            title: 'consequat officia irure laboris',
            abstract: 'in et ex',
            'manifest-data': {},
            'user-data': {},
            upload: upload.url,
          },
        );
        data &&
          toast.show({
            bg: 'blue.800',
            render: ({id}: {id: number}) => {
              return (
                <MyToast
                  id={id}
                  variant={'solid'}
                  status={'primary'}
                  title="success to upload file"
                  isClosable
                />
              );
            },
          });
        setTimeout(() => {
          toast.closeAll();
        }, 2000);
        await getDetailDocOfSession();
      } catch (e) {
        console.log(e);
      }
    }
    addMoreFile.onClose();
    addMoreFileReady.onClose();
    addMoreFileReady.isOpen && dispatch(setBlurScreen(false));
    !addMoreFileReady.isOpen && dispatch(setBlurScreen(true));
  };
  const AddDocToScenario = async (IsServer: string) => {
    try {
      if (docSelected) {
        const createScenario = await scenariosApi.createScenario<TypeScenarioI>(
          {
            documents: [docSelected!],
            format: IsScenarioInput
              ? ForScenarioProcess.format
              : SignatureFormat.PAdES,
            level: IsScenarioInput
              ? ForScenarioProcess.level
              : SignatureLevel.LTA,
            steps: IsScenarioInput
              ? ForScenarioProcess.steps
              : [
                  {
                    process: IsScenarioInput
                      ? ForScenarioProcess.steps[0].process
                      : 'legal',
                    steps: [ForSign.Actor ?? ''],
                    cardinality: IsScenarioInput
                      ? ForScenarioProcess.steps[0].cardinality
                      : 'one',
                  },
                  {
                    process: IsScenarioInput
                      ? ForScenarioProcess.steps[1].process
                      : 'cosign',
                    steps: [ForSign.Actor ?? ''],
                    cardinality: IsScenarioInput
                      ? ForScenarioProcess.steps[1].cardinality
                      : 'all',
                    signatureType: IsScenarioInput
                      ? ForScenarioProcess.steps[1].signatureType
                      : SignatureType.Envelopped,
                  },
                ],
          },
          ForSign.IdSession + '/scenarios',
        );

        if (createScenario) {
          dispatch(
            setForSign({
              ...ForSign,
              Document: docSelected,
            }),
          );
          try {
            const activeScenario = await scenarioApi.activateScenario(
              {
                'manifest-data': {},
              },
              createScenario.url + '/activate' ?? '',
            );
            if (activeScenario) {
              const otp = await sessionApi.generateOtp<TypeOTP>(
                ForSign.IdSession + '/generate-otp',
                {
                  actor: ForSign.Actor ?? '',
                  documents: [docSelected],
                  length: 5,
                  numeric: true,
                  tag: 'legal',
                },
              );
              if (otp) {
                const approveDoc =
                  await sessionApi.approveDocument<TypeApprove>(
                    ForSign.IdSession + '/approve-documents',
                    {
                      actor: ForSign.Actor ?? '',
                      documents: [docSelected],
                      otp: otp.otp,
                      tag: 'legal',
                    },
                  );
                if (approveDoc) {
                  const sesID = ForSign?.IdSession?.split('/')[4];
                  const actorID = ForSign?.Actor?.split('/')[6];
                  const getCGU = await caApi.getGcu<TypeGCU>(
                    Constant_Navigator.CGU + sesID + '&actor=' + actorID,
                  );
                  if (getCGU) {
                    try {
                      if (IsServer == 'server') {
                        toast.show({
                          bg: 'blue.800',
                          render: ({id}: {id: number}) => {
                            return (
                              <MyToast
                                id={id}
                                variant={'solid'}
                                status={'primary'}
                                title="server processing"
                                isClosable
                              />
                            );
                          },
                        });
                        setTimeout(() => {
                          toast.closeAll();
                        }, 2000);
                        const dataPDF = await StepAfterGenerateCertificate({
                          docSelected: docSelected,
                          sesID: sesID!,
                        });
                        if (dataPDF) {
                          dispatch(setSourcePDF(dataPDF));
                          navigate.navigate(
                            Constant_Navigator.PAGE_SIGN_DOCUSIGN,
                          );
                        }
                      } else if (IsServer == 'gen') {
                        toast.show({
                          bg: 'blue.800',
                          render: ({id}: {id: number}) => {
                            return (
                              <MyToast
                                id={id}
                                variant={'solid'}
                                status={'primary'}
                                title="generate certificate processing"
                                isClosable
                              />
                            );
                          },
                        });
                        const generateCertificate =
                          await certificateApi.createCertificate<TypeGenuine>(
                            {
                              actor: ForSign.Actor ?? '',
                              authority: getCGU.authority,
                              token: getCGU.token,
                              ttl: 1200,
                            },
                            undefined,
                            ForSign.IdSession + '/certificates',
                          );
                        dispatch(
                          setForSign({
                            ...ForSign,
                            Certificate: generateCertificate?.url,
                          }),
                        );
                        if (generateCertificate) {
                          const dataPDF = await StepAfterGenerateCertificate({
                            docSelected: docSelected,
                            sesID: sesID!,
                          });
                          if (dataPDF) {
                            dispatch(setSourcePDF(dataPDF));
                            navigate.navigate(
                              Constant_Navigator.PAGE_SIGN_DOCUSIGN,
                            );
                          }
                        }
                      }
                    } catch (e) {
                      console.log(e);
                    }
                  }
                }
              }
            }
          } catch (e) {
            console.log(e);
          }
        }
        dispatch(
          setForScenarioProcess({
            ...ForScenarioProcess,
            documents: [docSelected],
          }),
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getDetailDocOfSession = async () => {
    const data = await documentsApi.getDocumentSessions(
      ForSign.IdSession! + '/documents',
    );
    dispatch(setDocInSession(data));
  };

  return (
    <Box safeArea w={'100%'} h={'100%'} bg={'white'}>
      <HeaderCustom
        iconLeft={
          <Pressable
            onPress={() => {
              navigate.navigate(Constant_Navigator.PAGE_PREVIEW_PDF_DOCUSIGN);
            }}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              size={20}
              color={COLOR.ButtonColor.searchButton}
            />
          </Pressable>
        }
        title={
          <Text color={'black'} fontWeight={'bold'} fontSize={'md'}>
            Add Document
          </Text>
        }
        iconRight={
          <HStack justifyContent={'center'} alignItems={'center'} space={2}>
            <Pressable
              onPress={() => {
                navigate.navigate(Constant_Navigator.PAGE_START_DOCUSIGN);
                dispatch(logout());
              }}
            >
              <FontAwesomeIcon
                icon={faHomeUser}
                size={20}
                color={COLOR.ButtonColor.searchButton}
              />
            </Pressable>

            <Box>
              <DropMenu
                ListData={
                  <>
                    <Menu.Item
                      onPress={async () => {
                        await AddDocToScenario('gen');
                      }}
                    >
                      Generate
                    </Menu.Item>

                    <Menu.Item
                      onPress={async () => {
                        await AddDocToScenario('server');
                      }}
                    >
                      Server
                    </Menu.Item>
                  </>
                }
              />
            </Box>

            {/*<Pressable onPress={AddDocToScenario}>*/}
            {/*  <Text {...COLOR.Text.gotIt} fontWeight={'semibold'}>*/}
            {/*    Next*/}
            {/*  </Text>*/}
            {/*</Pressable>*/}
          </HStack>
        }
      />
      <Box
        h={'90%'}
        w={'100%'}
        bg={'gray.100'}
        display={'flex'}
        justifyContent={'flex-start'}
        alignItems={'center'}
      >
        <ScrollView w={'100%'}>
          <HStack>
            <MyRadioButton
              data={DataDoc}
              radioContainerProps={{flexDir: 'column'}}
              onChange={setDocSelected}
              renderItem={i => {
                return (
                  <Pressable w={'100%'}>
                    <Center>
                      <CardDocument
                        fileName={i.text}
                        title={''}
                        url={i.value}
                      />
                    </Center>
                  </Pressable>
                );
              }}
            />
          </HStack>
        </ScrollView>

        <Button
          w={'95%'}
          mt={5}
          bg={'white'}
          borderColor={'gray.500'}
          borderWidth={1}
          rounded={'sm'}
          onPress={() => {
            addMoreFile.onOpen();
          }}
        >
          <HStack alignItems={'center'} space={2}>
            <FontAwesomeIcon icon={faFileImport} size={16} color={'black'} />
            <Text {...COLOR.Text.textRedirect} color={'black'}>
              Add another document
            </Text>
          </HStack>
        </Button>
      </Box>
      {/*  ======== choose file*/}
      <MyActionSheet
        prop={{bg: 'white'}}
        hActionSheet={200}
        isOpen={addMoreFile.isOpen}
        onClose={addMoreFile.onClose}
        IconList={
          <>
            <VStack space={5} alignItems={'center'}>
              <FontAwesomeIcon
                icon={faImage}
                size={46}
                color={COLOR.Text.textInActionSheet.color}
              />
              <Text {...COLOR.Text.textInActionSheet}>Photos</Text>
            </VStack>
            <FilePicker
              onFileChange={(pickerResult, _, base64) => {
                setAddFileType(pickerResult.type);
                dispatch(
                  setFileNamePicker(pickerResult.fileCopyUri.split('/')[9]),
                );
                pickerResult && addMoreFile.onClose();
                pickerResult && addMoreFileReady.onOpen();
                dispatch(setFileBase64(base64));
                dispatch(setFileType(pickerResult.type));
                FileBase64 !== '' && addMoreFile.onClose();
              }}
              showPreview={false}
              buttonStyle={{
                m: '0',
                p: '0',
                backgroundColor: 'white',
                text: (
                  <VStack space={5} alignItems={'center'}>
                    <FontAwesomeIcon
                      icon={faFileLines}
                      size={46}
                      color={COLOR.Text.textInActionSheet.color}
                    />
                    <Text {...COLOR.Text.textInActionSheet}> Files</Text>
                  </VStack>
                ),
              }}
            />
            <VStack space={5} alignItems={'center'}>
              <AddIcon
                size={'5xl'}
                color={COLOR.Text.textInActionSheet.color}
              />
              <Text {...COLOR.Text.textInActionSheet}>More</Text>
            </VStack>
          </>
        }
        PressActionIcon={
          <Pressable
            onPress={() => {
              setRotate(!rotate);
              addMoreFile.onClose();
              addMoreFile.isOpen && dispatch(setBlurScreen(false));
              !addMoreFile.isOpen && dispatch(setBlurScreen(true));
            }}
          >
            {/*<AnimateButton rotate={rotate} changeBy={addMoreFile} />*/}
          </Pressable>
        }
        FilePickerT={<></>}
      />
      {/*  upload */}
      <MyActionSheet
        prop={{bg: 'white'}}
        mtActionSheetContain={10}
        hActionSheet={200}
        TitleAndIcon={<></>}
        IconList={
          <>
            <Pressable
              onPress={() => {
                setRotate(!rotate);
                addMoreFile.isOpen && dispatch(setBlurScreen(false));
                !addMoreFile.isOpen && dispatch(setBlurScreen(true));
                addMoreFile.onClose();
                addMoreFileReady.onClose();
              }}
            >
              <VStack space={2} alignItems={'center'}>
                <FontAwesomeIcon
                  icon={faFilePdf}
                  size={46}
                  color={COLOR.Text.textInActionSheet.color}
                />
                <Text {...COLOR.Text.textInActionSheet}>Preview</Text>
              </VStack>
            </Pressable>

            <VStack space={5} alignItems={'center'}>
              <Pressable onPress={uploadFile}>
                <VStack alignItems={'center'} space={2}>
                  <FontAwesomeIcon
                    icon={faCloudUpload}
                    size={46}
                    color={COLOR.Text.textInActionSheet.color}
                  />
                  <Text {...COLOR.Text.textInActionSheet}>Upload file</Text>
                </VStack>
              </Pressable>
            </VStack>
          </>
        }
        isOpen={addMoreFileReady.isOpen}
        onClose={addMoreFileReady.onClose}
        PressActionIcon={<></>}
      />
    </Box>
  );
}

export default PageAddPdfDocusign;
