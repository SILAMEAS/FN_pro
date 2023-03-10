import React from 'react';
import {
  // ArrowDownIcon,
  Box,
  ChevronLeftIcon,
  HStack,
  Image,
  Menu,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import {COLOR} from '@screens/Interface/Docusign/color/Color';
import HeaderCustom from '@screens/Interface/Docusign/components/HeaderCustom';
import Footer from '@screens/Interface/Docusign/components/Footer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCalendar,
  faClose,
  // faCloudDownload,
  faDownload,
  faEnvelopeOpenText,
  faHands,
  faHomeLg,
  faPenNib,
  faUserTag,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@src/navigation';
import {Constant_Navigator} from '@src/navigation/Constant_Navigator';
import {useAppDispatch, useAppSelector} from '@src/redux/config/hooks';
import {ViewPdf} from '@components/templates/pdf';
import {Base64FileHeaderMapper} from '@screens/Interface/Docusign/utils/FileType';
import {logout, setDocTye, setSourcePDF} from '@src/redux/counter/CounterSlice';
import SignOption from '@screens/Interface/Docusign/utils/SignOption';
import {DropMenu} from '@screens/Interface/Docusign/components/DropMenu';
import {
  documentApi,
  downloadApi,
  sessionApi,
  TypeCreateDoc,
  TypeGenuine,
} from '@screens/Interface/Docusign/page/Type';

function PageSignDocusign() {
  const navigate = useNavigation();
  const {SourcePDF} = useAppSelector(state => state.counter);
  const checkFileType = Base64FileHeaderMapper(SourcePDF);
  const {ForSign, DocTye} = useAppSelector(state => state.counter);
  const dispatch = useAppDispatch();

  const sign = async () => {
    try {
      if (ForSign.Certificate) {
        await SignOption({option: 'generate', ForSign});
      } else {
        await SignOption({option: 'server', ForSign});
      }
    } catch (e) {
      console.log(e);
    }
  };
  const downloadManifest = async () => {
    const closeSession = await sessionApi.closeSession(
      ForSign.IdSession! + '/close',
      {
        force: true,
        reason: 'culpa eu pariatur et',
        'manifest-data': {},
      },
    );
    if (closeSession) {
      try {
        const getManifest = await sessionApi.getManifest<TypeCreateDoc>(
          ForSign.IdSession + '/manifest',
        );
        if (getManifest) {
          try {
            const downloadManifest =
              await downloadApi.getContentDocumentSession(
                '/api/v1/download/' + getManifest.url.split('/')[4],
              );
            if (downloadManifest) {
              dispatch(setSourcePDF(downloadManifest));
              dispatch(
                setDocTye({
                  IsSimple: false,
                  IsOnTheFly: false,
                  IsManifest: true,
                }),
              );
              navigate.navigate(Constant_Navigator.PAGE_SIGN_DOCUSIGN);
            }
          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  const downloadDocument = async () => {
    const N_sesID = parseInt(ForSign.IdSession!.split('/')[4]);
    const N_DocSelected = parseInt(ForSign.Document!.split('/')[6]);
    console.log(N_sesID + '--' + N_DocSelected);
    try {
      const current = await documentApi.getCurrentDocumentById<TypeGenuine>(
        N_sesID,
        N_DocSelected,
      );
      if (current) {
        try {
          const download = await downloadApi.getContentDocumentSession(
            current.url,
          );
          if (download) {
            dispatch(setSourcePDF(download));
            dispatch(
              setDocTye({IsSimple: false, IsOnTheFly: true, IsManifest: false}),
            );
            navigate.navigate(Constant_Navigator.PAGE_SIGN_DOCUSIGN);
          }
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box safeArea w={'100%'} h={'100%'} bg={COLOR.BackGroundDocuSign}>
      <HeaderCustom
        prop={{bg: 'white'}}
        title={
          <Text {...COLOR.Text.textRedirect} color={'color'}>
            {DocTye.IsSimple ? (
              'Sign'
            ) : DocTye.IsManifest ? (
              'Preview'
            ) : (
              <Pressable
                onPress={() => {
                  dispatch(
                    setDocTye({
                      IsSimple: true,
                      IsOnTheFly: false,
                      IsManifest: false,
                    }),
                  );
                }}
              >
                <ChevronLeftIcon size={'lg'} />
              </Pressable>
            )}
          </Text>
        }
        iconLeft={
          DocTye.IsSimple && (
            <Pressable
              onPress={() => {
                navigate.navigate(Constant_Navigator.PAGE_START_DOCUSIGN);
                dispatch(logout());
              }}
            >
              <FontAwesomeIcon icon={faClose} color={'black'} size={24} />
            </Pressable>
          )
        }
        iconRight={
          DocTye.IsSimple ? (
            <Box>
              <DropMenu
                ListData={
                  <>
                    <Menu.Item onPress={downloadManifest}>
                      Download manifest
                    </Menu.Item>
                    <Menu.Item onPress={downloadDocument}>
                      Download Document
                    </Menu.Item>
                  </>
                }
                icon={
                  <>
                    {/*<ArrowDownIcon size={'lg'} />*/}
                    <FontAwesomeIcon
                      icon={faDownload}
                      color={'black'}
                      size={24}
                    />
                  </>
                }
              />
            </Box>
          ) : DocTye.IsManifest ? (
            <Pressable
              onPress={() => {
                navigate.navigate(Constant_Navigator.PAGE_START_DOCUSIGN);
                dispatch(logout());
              }}
            >
              <FontAwesomeIcon icon={faHomeLg} color={'black'} size={24} />
            </Pressable>
          ) : (
            <Text {...COLOR.Text.textRedirect}>Preview document</Text>
          )
        }
      />

      {checkFileType.startsWith('image') ? (
        <Image
          source={{
            uri: `data:${checkFileType};base64,${SourcePDF}`,
          }}
          alt={'olo'}
          w={'100%'}
          h={'90%'}
        />
      ) : (
        <ViewPdf
          uri={`data:${checkFileType};base64,${SourcePDF}`}
          height={'100%'}
        />
      )}

      {DocTye.IsSimple && (
        <Footer
          prop={{h: '12%'}}
          TextIn={
            <HStack px={5} w={'100%'} justifyContent={'space-between'}>
              <Pressable onPress={sign}>
                <VStack alignItems={'center'} space={2}>
                  <Box bg={'yellow.400'} p={2} rounded={'full'}>
                    <FontAwesomeIcon
                      icon={faPenNib}
                      color={'black'}
                      size={24}
                    />
                  </Box>
                  <Text color={'black'}>Signature</Text>
                </VStack>
              </Pressable>
              <VStack alignItems={'center'} space={2}>
                <Box bg={'yellow.400'} p={2} rounded={'full'}>
                  <FontAwesomeIcon icon={faHands} color={'black'} size={24} />
                </Box>
                <Text color={'black'}>Initials</Text>
              </VStack>
              <VStack alignItems={'center'} space={2}>
                <Box bg={'yellow.400'} p={2} rounded={'full'}>
                  <FontAwesomeIcon
                    icon={faCalendar}
                    color={'black'}
                    size={24}
                  />
                </Box>
                <Text color={'black'}>Date</Text>
              </VStack>
              <VStack alignItems={'center'} space={2}>
                <Box bg={'yellow.400'} p={2} rounded={'full'}>
                  <FontAwesomeIcon
                    icon={faEnvelopeOpenText}
                    color={'black'}
                    size={24}
                  />
                </Box>
                <Text color={'black'}>TextBox</Text>
              </VStack>
              <VStack alignItems={'center'} space={2}>
                <Box bg={'yellow.400'} p={2} rounded={'full'}>
                  <FontAwesomeIcon icon={faUserTag} color={'black'} size={24} />
                </Box>
                <Text color={'black'}>Name</Text>
              </VStack>
            </HStack>
          }
        />
      )}
    </Box>
  );
}

export default PageSignDocusign;
