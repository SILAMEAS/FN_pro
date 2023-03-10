import React from 'react';
import {Box, HStack, Image, Pressable, Text, View} from 'native-base';
import HeaderCustom from '@screens/Interface/Docusign/components/HeaderCustom';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft, faFileUpload} from '@fortawesome/free-solid-svg-icons';
import {COLOR} from '@screens/Interface/Docusign/color/Color';
import {useNavigation} from '@src/navigation';
import {Constant_Navigator} from '@src/navigation/Constant_Navigator';
import {useAppDispatch, useAppSelector} from '@src/redux/config/hooks';
import {ViewPdf} from '@components/templates/pdf';
import {UploadsService} from '@src/services/uploads';
import {API_URL} from '@src/config/env';
import {decode} from '@utils/base64_arraybuffer';
import {SessionsService} from '@src/services/sessions';
import {setDocInSession, setForSign} from '@src/redux/counter/CounterSlice';
import {
  actorsApi,
  documentsApi,
  TypeActor,
  TypeCreateDoc,
  TypeUpload,
} from '@screens/Interface/Docusign/page/Type';
import {SessionResponse} from '@src/services/session';
const header = {
  certignahash: 'ySsPUR23',
  certignarole: 2,
  certignauser: 'pps#test',
};
const uploadApi = new UploadsService(
  API_URL ?? 'http://10.2.50.23:8080',
  header,
);
const sessionApi = new SessionsService(
  API_URL ?? 'http://10.2.50.23:8080',
  header,
);
function PagePreviewPdfDocusign() {
  const navigate = useNavigation();
  const {FileType, FileBase64, FileNamePicker} = useAppSelector(
    state => state.counter,
  );
  const dispatch = useAppDispatch();
  const uploadFile = async () => {
    try {
      const upload = await uploadApi.upload<TypeUpload>(decode(FileBase64), {
        'Content-Type': FileType,
        Accept: 'application/json',
      });
      if (upload) {
        const session = await sessionApi.createSession<SessionResponse>({
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
            navigate.navigate(Constant_Navigator.PAGE_ADD_PDF_DOCUSIGN);
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
    <Box safeArea w={'100%'} h={'100%'} bg={'white'}>
      <HeaderCustom
        iconLeft={
          <Pressable
            onPress={() => {
              navigate.navigate(Constant_Navigator.PAGE_START_DOCUSIGN);
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
            <Pressable onPress={uploadFile}>
              <FontAwesomeIcon
                icon={faFileUpload}
                size={20}
                color={COLOR.ButtonColor.searchButton}
              />
            </Pressable>
          </HStack>
        }
      />
      <Box h={'90%'} w={'100%'} bg={'red.600'}>
        {FileType.startsWith('image') ? (
          <Image
            width={'90%'}
            height={'100%'}
            borderRadius={10}
            source={{
              uri: `data:${FileType};base64,${FileBase64}`,
            }}
            alt="Hello"
          />
        ) : (
          <View width={'100%'} height={'100%'}>
            <ViewPdf uri={`data:${FileType};base64,${FileBase64}`} />
          </View>
        )}
      </Box>
    </Box>
  );
}

export default PagePreviewPdfDocusign;
