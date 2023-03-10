import React, {useState} from 'react';
import {Layout} from '@components/layout';
import {HStack, IconButton, InfoIcon, View, VStack} from 'native-base';
import {useNavigation} from '@src/navigation';
import {Pagination} from '@components/commons/pagination';
import {API_URL} from '@src/config/env';
import {MyText} from '@components/commons/my_text';
import {Localization} from '@src/i18n/languages';
import {DetailForDownloadFile, DocumentService} from '@src/services/document';
import {DocumentSession} from '@src/services/documents';
import {useTranslation} from 'react-i18next';
import {Dialog, useDialog} from '@components/commons/dailog';
import {LoadingButton} from '@components/commons/loading_btn';
import {Loading} from '@components/commons/loading';
import {ViewPdf} from '@components/templates/pdf';
import {DownloadService} from '@src/services/download';

export const AllDocuments = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const dialog = useDialog();
  const [isLoadingDialog, setIsLoadingDialog] = useState(false);
  const [errorDetailDownload, setErrorDetailDownload] =
    useState<string | undefined | null>();
  const [fileBase64, setFileBase64] = useState<string | undefined | null>();

  const header = {
    certignahash: 'ySsPUR23',
    certignarole: 2,
    certignauser: 'pps#test',
  };

  const downloadApi = new DownloadService(API_URL ?? '', header);
  const documentApi = new DocumentService(API_URL ?? '', header);
  return (
    <Layout navigation={navigation}>
      <View height={'100%'} width={'100%'} backgroundColor={'black'}>
        <Pagination
          isScroll={true}
          baseUrl={API_URL ?? 'http://10.2.50.26:8080'}
          prefixUrl="/api/v1/session/documents"
          queryString={{pageSize: 6, expirationstatus: 'all'}}
          render={(item: DocumentSession) => (
            <HStack
              key={item?.id}
              space={2}
              p={2}
              m={2}
              backgroundColor={'gray.700'}
              borderRadius={10}
            >
              <View>
                <MyText type={'white'}>{t(Localization('fileName'))}</MyText>
                <MyText type={'white'}>{t(Localization('title'))}</MyText>
                <MyText type={'white'}>{t(Localization('url'))}</MyText>
              </View>
              <View>
                <MyText type={'white'}>
                  {' : '} {item?.fileName}
                </MyText>
                <MyText type={'white'}>
                  {' : '} {item?.title}
                </MyText>
                <MyText type={'white'}>
                  {' : '} {item?.url}
                </MyText>
              </View>
              <View display={'flex'} flex={1} justifyContent={'center'}>
                <IconButton
                  onPress={async () => {
                    setErrorDetailDownload(undefined);
                    dialog.onOpen();
                    setIsLoadingDialog(true);
                    console.log(item.url);
                    const data =
                      await documentApi.getGenuineDocumentByUrl<DetailForDownloadFile>(
                        `${item.url}/current`,
                      );

                    if (!data) {
                      setErrorDetailDownload(
                        t(Localization('errorGettingContentFile')),
                      );
                    } else {
                      try {
                        const file =
                          await downloadApi.getContentDocumentSession(data.url);
                        setFileBase64(file);
                        console.log(file);
                      } catch (e) {
                        console.log(e);
                      }
                    }
                    setIsLoadingDialog(false);
                  }}
                  icon={<InfoIcon />}
                />
              </View>
            </HStack>
          )}
          header={{
            DefaultLanguage: 'fr',
            Accept: 'application/json',
            Certignarole: 1,
          }}
          position="bottom"
        />
      </View>
      <Dialog
        size="full"
        headerBackgroundColor={'gray.800'}
        bodyBackgroundColor={'gray.800'}
        footerBackgroundColor={'gray.800'}
        header={
          <MyText fontSize="lg" type="white">
            {t(Localization('fileViewer'))}
          </MyText>
        }
        buttons={
          <View>
            <LoadingButton text={'Close'} onPress={dialog.onClose} />
          </View>
        }
        isOpen={dialog.isOpen}
        onClose={dialog.onClose}
        body={
          errorDetailDownload ? (
            <MyText type={'danger'}>{errorDetailDownload}</MyText>
          ) : isLoadingDialog ? (
            <View height={'100%'}>
              <Loading />
            </View>
          ) : (
            <VStack
              height={'80'}
              width={'100%'}
              space={3}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <View height={'100%'} width={'100%'}>
                <ViewPdf
                  uri={`data:application/pdf;base64,${fileBase64}`}
                  height={'100%'}
                />
              </View>
            </VStack>
          )
        }
      />
    </Layout>
  );
};
