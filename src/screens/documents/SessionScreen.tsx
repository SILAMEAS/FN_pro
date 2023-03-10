import {MyText} from '@src/components/commons/my_text';
import {Pagination} from '@src/components/commons/pagination';
import {Layout} from '@src/components/layout';
import {API_URL} from '@src/config/env';
import {getDeadLineTimer, useTimer} from '@src/hooks';
import {NavigatorRoute, useNavigation} from '@src/navigation';
import {ArrowForwardIcon, DeleteIcon, HStack, View, VStack} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import dayjs from 'dayjs';
import {SessionStatus} from '@src/utils/commons/mappingObject';
import {MyIconButton} from '@src/components/commons/my_icon_button';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import {Dialog, useDialog} from '@components/commons/dailog';
import {LoadingButton} from '@components/commons/loading_btn';
import {Localization} from '@src/i18n/languages';
import {useTranslation} from 'react-i18next';
import {SessionService} from '@src/services/session';
import {MyInputField} from '@components/commons/my_input_field';
import {$ok} from '@src/utils/commons';
import {BackGroundColor} from '@screens/documents/index';

export interface Session {
  id: number;
  createdAt: Date;
  expiresAt: Date;
  publicId: number;
  status: keyof typeof SessionStatus;
  ttl: number;
  updatedAt: Date;
  url: string;
}

export const SessionScreen = () => {
  const navigation = useNavigation();
  const [reFetch, setReFetch] = useState(false);
  return (
    <Layout navigation={navigation}>
      <View height={'100%'} width={'100%'} backgroundColor={'black'}>
        <Pagination
          refetch={reFetch}
          isScroll={true}
          baseUrl={API_URL ?? 'http://10.2.50.26:8080'}
          prefixUrl="/api/v1/sessions"
          queryString={{pageSize: 6, expirationstatus: 'all'}}
          render={(item: Session) => (
            <Body item={item} navigation={navigation} setReFetch={setReFetch} />
          )}
          header={{
            DefaultLanguage: 'fr',
            Accept: 'application/json',
            Certignarole: 1,
          }}
          position="bottom"
        />
      </View>
    </Layout>
  );
};

const Body = ({
  item,
  navigation,
  setReFetch,
}: {
  item: Session;
  navigation: StackNavigationProp<ParamListBase, string>;
  setReFetch: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const header = {
    certignahash: 'ySsPUR23',
    certignarole: 2,
    certignauser: 'pps#test',
  };

  const sessionApi = new SessionService(API_URL ?? '', header);
  const [timer, setTimer] = useState('00:00:00');
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const {isTimeOut, clearTimer, total} = useTimer(setTimer, intervalRef);
  const {t} = useTranslation();
  const dialog = useDialog();
  const [reasonCloseSession, setReasonCloseSession] =
    useState<string | null | undefined>();
  const [errorReasonInput, setErrorReasonInput] =
    useState<string | null | undefined>();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const status = item.status.toString();
  const backgroundBaseOnStatus = (
    // eslint-disable-next-line no-shadow
    status: keyof typeof SessionStatus,
  ): BackGroundColor => {
    switch (status) {
      case '1':
        return undefined;
      case '2':
        return undefined;
      case '3':
        return undefined;
      case '4':
        return 'primary.700';
      case '10':
        return 'info.500';
      case '20':
        return 'red.800';
      case '21':
        return 'red.800';
      default:
        return undefined;
    }
  };

  const background = backgroundBaseOnStatus(
    status as keyof typeof SessionStatus,
  );
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const expiredAt = dayjs(item.expiresAt);
    const secDiff = Math.ceil(expiredAt.diff(dayjs()) / 1000);
    const endTime = getDeadLineTimer({seconds: secDiff});
    clearTimer(endTime, timer);
  }, []);

  return (
    <HStack
      width={'100%'}
      background={'gray.800'}
      p={3}
      my={2}
      borderRadius={10}
      backgroundColor={
        background
          ? background
          : total <= 0 || isTimeOut
          ? 'yellow.600'
          : undefined
      }
    >
      <HStack width={'75%'} space={2}>
        <View>
          <MyText type="white">{`${t(Localization('url'))} :`}</MyText>
          <MyText type="white">{`${t(Localization('expireIn'))} :`}</MyText>
          <MyText type="white">{`${t(Localization('status'))} :`}</MyText>
        </View>
        <View>
          <MyText type="white">{item.url}</MyText>
          <MyText type="white">{timer}</MyText>
          <MyText type="white">{`${SessionStatus[item.status]}`}</MyText>
        </View>
      </HStack>
      <HStack width={'22%'} justifyContent={'flex-end'} p={3} space={2}>
        {status !== '20' && (
          <MyIconButton
            colorScheme="danger"
            size="md"
            icon={<DeleteIcon color={'white'} />}
            onPress={dialog.onOpen}
          />
        )}
        <MyIconButton
          colorScheme="dark"
          size="md"
          icon={<ArrowForwardIcon />}
          onPress={() => {
            navigation.navigate(NavigatorRoute.SESSION.MAIN, {
              screen: NavigatorRoute.SESSION.DOCUMENT_IN_PROGRESS_SCREEN,
              initial: false,
              params: {id: item.id},
            });
          }}
        />
      </HStack>

      <Dialog
        size={'lg'}
        headerBackgroundColor={'gray.700'}
        bodyBackgroundColor={'gray.700'}
        footerBackgroundColor={'gray.700'}
        buttons={
          <HStack space={3}>
            <LoadingButton
              width={'40%'}
              isLoading={deleteLoading}
              type={'danger'}
              text={t(Localization('yes')) ?? ''}
              onPress={async () => {
                if (!$ok(reasonCloseSession)) {
                  setErrorReasonInput(t(Localization('reasonCannotBeEmpty')));
                  return;
                }
                setDeleteLoading(true);
                await sessionApi.closeSession<{status: number}>(
                  `${item.url}/close`,
                  {
                    'manifest-data': {},
                    force: true,
                    reason: reasonCloseSession!,
                  },
                );
                setDeleteLoading(false);
                setReFetch(prev => !prev);
                dialog.onClose();
              }}
            />
            <LoadingButton
              width={'40%'}
              type={'warning'}
              text={t(Localization('no')) ?? ''}
              onPress={dialog.onClose}
            />
          </HStack>
        }
        header={
          <MyText type={'white'}>{t(Localization('deleteSession'))}</MyText>
        }
        body={
          <VStack height={'100%'} space={2}>
            <View height={'70%'}>
              <MyText type={'white'} fontWeight={'bold'}>{`${t(
                Localization('Reason'),
              )}`}</MyText>
              <MyInputField
                backgroundColor={'gray.300'}
                color={'gray.700'}
                height={'80%'}
                borderWidth={0}
                value={reasonCloseSession ?? ''}
                placeholder={t(Localization('reason')) ?? ''}
                onChangeText={text => {
                  setReasonCloseSession(text);
                  if (text) {
                    setErrorReasonInput(undefined);
                  } else {
                    setErrorReasonInput(t(Localization('reasonCannotBeEmpty')));
                  }
                }}
              />
            </View>
            <MyText type={'danger'} fontSize={'xs'}>
              {errorReasonInput}
            </MyText>
          </VStack>
        }
        isOpen={dialog.isOpen}
        onClose={dialog.onClose}
      />
    </HStack>
  );
};
