import {
  Box,
  Center,
  HStack,
  Pressable,
  Stagger,
  Text,
  useDisclose,
  useToast,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCloudUpload,
  faFileLines,
  faFilePdf,
  faPencilSquare,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import {COLOR} from '@screens/Interface/Docusign/color/Color';
import {
  setBlurScreen,
  setDocInSession,
  setFileBase64,
  setFileNamePicker,
  setFileType,
  setForSign,
  setIsMultipleSign,
} from '@src/redux/counter/CounterSlice';
import {FilePicker} from '@components/commons/file_picker';
import MyActionSheet from '@screens/Interface/Docusign/components/MyActionSheet';
import MyButtonInActionSheet from '@screens/Interface/Docusign/components/MybuttonInActionSheet';
import AnimateButton from '@screens/Interface/Docusign/components/AnimateBotton';
import {Constant_Navigator} from '@src/navigation/Constant_Navigator';
import {useNavigation} from '@src/navigation';
import {useAppDispatch, useAppSelector} from '@src/redux/config/hooks';
import {decode} from '@utils/base64_arraybuffer';
import {
  actorsApi,
  documentsApi,
  sessionsApi,
  TypeActor,
  TypeCreateDoc,
  TypeUpload,
  uploadApi,
} from '@screens/Interface/Docusign/page/Type';
import {SessionResponse} from '@src/services/session';
import {Loading} from '@components/commons/loading';
import {MyToast} from '@screens/Interface/Test_backend_API_NG/Page/Newer/components/cheaNit_picker_file/my_toast';

const MyStagger = () => {
  //state
  const navigate = useNavigation();
  const [rotate, setRotate] = useState(false);
  const staggerA = useDisclose();
  const actionSheet = useDisclose();
  const actionSheetUploadReady = useDisclose();
  const dispatch = useAppDispatch();
  const [IsPdf, setIsPdf] = useState('');
  const [checkLoad, setCheckLoad] = useState(false);
  // Redux
  const {FileBase64, FileNamePicker, IsMultipleSign} = useAppSelector(
    state => state.counter,
  );
  const toast = useToast();
  const uploadFile = async () => {
    staggerA.onClose();
    actionSheet.onClose();
    actionSheetUploadReady.onClose();
    staggerA.isOpen && dispatch(setBlurScreen(false));
    !staggerA.isOpen && dispatch(setBlurScreen(true));
    try {
      const upload = await uploadApi.upload<TypeUpload>(decode(FileBase64), {
        'Content-Type': IsPdf,
        Accept: 'application/json',
      });
      upload &&
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
      setCheckLoad(true);
      if (upload) {
        setCheckLoad(false);
        const session = await sessionsApi.createSession<SessionResponse>({
          ttl: 300,
          'user-data': {},
        });

        if (session) {
          const actor = await actorsApi.createActor<TypeActor>(
            {
              name: 'actora',
              type: 0,
              roles: ['approval', 'sign'],
              'adm-id': 'dolore fugiat exercitation sed',
              'first-name': 'test',
              country: 'FR',
              login: 'sunt id consequat',
              email: 'LwsyPS70m10aPpK@qnWdwQpJegBROOpjqauSYiaxLhRB.daa',
              mobile: 'enim occaecat et aliqua',
              'manifest-data': {},
              'user-data': {},
            },
            undefined,
            session.url + '/actors',
          );
          try {
            const createDoc = await documentsApi.createDocument<TypeCreateDoc>(
              session.url + '/documents',
              {
                'file-name': FileNamePicker,
                title: 'consequat officia irure laboris',
                abstract: 'in et ex',
                'manifest-data': {},
                'user-data': {},
                upload: upload.url,
              },
            );
            dispatch(
              setForSign({
                IdSession: session?.url,
                Actor: actor?.url,
                Document: createDoc?.url,
                Certificate: '',
              }),
            );
            const docInSession = await documentsApi.getDocumentSessions(
              session?.url! + '/documents',
            );
            dispatch(setDocInSession(docInSession));
            IsMultipleSign
              ? navigate.navigate(Constant_Navigator.PAGE_RECIPIENT_DOCUSIGN)
              : navigate.navigate(Constant_Navigator.PAGE_ADD_PDF_DOCUSIGN);
          } catch (e) {
            console.log(e);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Center>
      <Box alignItems="center" minH="110">
        {/*Action Upload*/}
        <MyActionSheet
          isOpen={actionSheet.isOpen}
          onClose={actionSheet.onClose}
          PressActionIcon={
            <Pressable
              onPress={() => {
                setRotate(!rotate);
                staggerA.onClose();
                actionSheet.onClose();
                staggerA.isOpen && dispatch(setBlurScreen(false));
                !staggerA.isOpen && dispatch(setBlurScreen(true));
              }}
            >
              <AnimateButton rotate={rotate} changeBy={actionSheet} />
            </Pressable>
          }
          FilePickerT={
            <FilePicker
              onFileChange={(pickerResult, _, base64) => {
                actionSheet.onClose();
                console.log('Base 64 ===================');
                console.log(pickerResult);
                setIsPdf(pickerResult.type);
                dispatch(
                  setFileNamePicker(pickerResult.fileCopyUri.split('/')[9]),
                );
                pickerResult && actionSheetUploadReady.onOpen();
                dispatch(setFileBase64(base64));
                dispatch(setFileType(pickerResult.type));
              }}
              showPreview={false}
              buttonStyle={{
                m: '0',
                p: '0',
                backgroundColor: 'blue.700',
                text: (
                  <VStack space={5} alignItems={'center'}>
                    <FontAwesomeIcon
                      icon={faFileLines}
                      size={46}
                      color={'white'}
                    />
                    <Text>Files</Text>
                  </VStack>
                ),
              }}
            />
          }
        />
        {/*Action Preview*/}
        {checkLoad && (
          <Loading
            containerStyle={{
              position: 'absolute',
              top: '-120%',
              left: '40%',
              zIndex: 10,
            }}
            spinnerStyle={{size: 'lg'}}
          />
        )}
        <MyActionSheet
          mtActionSheetContain={10}
          hActionSheet={200}
          TitleAndIcon={<></>}
          IconList={
            <>
              <Pressable
                onPress={() => {
                  navigate.navigate(
                    Constant_Navigator.PAGE_PREVIEW_PDF_DOCUSIGN,
                  );
                  setRotate(!rotate);
                  staggerA.onClose();
                  actionSheet.onClose();
                  actionSheetUploadReady.onClose();
                  staggerA.isOpen && dispatch(setBlurScreen(false));
                  !staggerA.isOpen && dispatch(setBlurScreen(true));
                }}
              >
                <VStack space={5} alignItems={'center'}>
                  <FontAwesomeIcon icon={faFilePdf} size={46} color={'white'} />
                  <Text>Preview</Text>
                </VStack>
              </Pressable>

              <VStack space={5} alignItems={'center'}>
                <Pressable onPress={uploadFile}>
                  <VStack alignItems={'center'}>
                    <FontAwesomeIcon
                      icon={faCloudUpload}
                      size={46}
                      color={'white'}
                    />
                    <Text>Upload file</Text>
                  </VStack>
                </Pressable>
              </VStack>
            </>
          }
          isOpen={actionSheetUploadReady.isOpen}
          onClose={actionSheetUploadReady.onClose}
          PressActionIcon={<></>}
        />
        <Stagger
          visible={staggerA.isOpen}
          initial={{
            opacity: 0,
            scale: 0,
            translateY: 34,
          }}
          animate={{
            translateY: 0,
            scale: 1,
            opacity: 1,
            transition: {
              type: 'spring',
              mass: 0.8,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}
          exit={{
            translateY: 34,
            scale: 0.5,
            opacity: 0,
            transition: {
              duration: 100,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}
        >
          <MyButtonInActionSheet
            event={() => {
              actionSheet.onOpen();
              dispatch(setIsMultipleSign(true));
            }}
            Title={<Text {...COLOR.Text.textRedirect}>Request Signatures</Text>}
            Icon={
              <FontAwesomeIcon icon={faUserGroup} color={'gray'} size={24} />
            }
          />
          <MyButtonInActionSheet
            event={() => {
              actionSheet.onOpen();
              dispatch(setIsMultipleSign(false));
            }}
            Title={<Text {...COLOR.Text.textRedirect}>Sign Document</Text>}
            Icon={
              <FontAwesomeIcon icon={faPencilSquare} color={'gray'} size={24} />
            }
          />
        </Stagger>
      </Box>
      <HStack alignItems="center">
        <MyButtonInActionSheet
          porp={{borderRadius: 'full', size: 'lg', bg: 'white', p: 0}}
          event={() => {
            setRotate(!rotate);
            staggerA.onToggle();
            staggerA.isOpen && dispatch(setBlurScreen(false));
            !staggerA.isOpen && dispatch(setBlurScreen(true));
          }}
          Title={<></>}
          Icon={<AnimateButton rotate={rotate} changeBy={actionSheet} />}
        />
      </HStack>
    </Center>
  );
};

export default MyStagger;
