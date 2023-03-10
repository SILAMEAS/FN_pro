import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TableTitle,
} from '@components/commons/table';
import React, {useState} from 'react';
import {Layout} from '@components/layout';
import {useNavigation} from '@src/navigation';
import {
  AddIcon,
  DeleteIcon,
  HStack,
  IconButton,
  ScrollView,
  View,
  VStack,
} from 'native-base';
import {Pagination} from '@components/commons/pagination';
import {API_URL} from '@src/config/env';
import {Session} from '@screens/documents/SessionScreen';
import {SessionStatus} from '@src/utils/commons/mappingObject';
import {Localization} from '@src/i18n/languages';
import {useTranslation} from 'react-i18next';
import {Dimensions} from 'react-native';
// @ts-ignore
import {SortType} from '@src/utils/commons/type';
// @ts-ignore
import {$ok, sort} from '@src/utils/commons';
import {LoadingButton} from '@components/commons/loading_btn';
import {MyText} from '@components/commons/my_text';
import {MyInputField} from '@components/commons/my_input_field';
import {Dialog, useDialog} from '@components/commons/dailog';
import {SessionService} from '@src/services/session';
import {MySelect} from '@components/commons/my_select';
import {isAxiosError} from 'axios';

export const TableScreen = () => {
  const navigation = useNavigation();

  const [data, setData] = useState<Session[] | undefined>();
  const [reFetch, setReFetch] = useState(false);
  return (
    <Layout navigation={navigation}>
      <Pagination
        refetch={reFetch}
        isScroll={true}
        baseUrl={API_URL ?? 'http://10.2.50.26:8080'}
        prefixUrl="/api/v1/sessions"
        queryString={{pageSize: 15, expirationstatus: 'all'}}
        // @ts-ignore
        setData={setData}
        renderTable={() => {
          return (
            <BodyPagination
              setData={setData}
              data={data}
              setReFetch={setReFetch}
            />
          );
        }}
        header={{
          DefaultLanguage: 'fr',
          Accept: 'application/json',
          Certignarole: 1,
        }}
        position="bottom"
      />
    </Layout>
  );
};

interface BodyPaginationProps {
  data: Session[] | undefined;
  setData: React.Dispatch<React.SetStateAction<Session[] | undefined>>;
  setReFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const BodyPagination = ({data, setData, setReFetch}: BodyPaginationProps) => {
  const width = Dimensions.get('screen').width;
  const {t} = useTranslation();
  const [sortType, setSortType] = useState<SortType>();

  const changeSortType = (type: SortType): SortType => {
    return type === 'ascending' ? 'descending' : 'ascending';
  };

  return (
    <ScrollView
      horizontal={true}
      _web={{
        width: '96vw',
      }}
    >
      <Table width={width}>
        <TableHeader
          backgroundColor={'gray.700'}
          width={'1000px'}
          _web={{
            width: width * 0.5,
          }}
        >
          <TableTitle textStyle={{color: 'gray.200'}}>
            {t(Localization('url'))}
          </TableTitle>
          <TableTitle textStyle={{color: 'gray.200'}}>
            {t(Localization('status'))}
          </TableTitle>
          <TableTitle iconColor={'#e4e4e7'} textStyle={{color: 'gray.200'}}>
            TTL
          </TableTitle>
          <TableTitle
            // sortDirection={sortType}
            // onPress={() => {
            //   setSortType(changeSortType);
            //   sort(data, 'publicId', sortType, () => setData);
            // }}
            textStyle={{color: 'gray.200'}}
            iconColor={'#e4e4e7'}
          >
            Public ID
          </TableTitle>
          <TableTitle textStyle={{color: 'gray.200'}}>Created At</TableTitle>
          <TableTitle
            textStyle={{color: 'gray.200'}}
            sortDirection={sortType}
            onPress={() => {
              setSortType(changeSortType);
              sort(
                data,
                {isDate: true, propSort: 'updatedAt', ordering: sortType},
                () => setData,
              );
            }}
          >
            Updated At
          </TableTitle>
          <TableTitle textStyle={{color: 'gray.200'}}>Actions</TableTitle>
        </TableHeader>
        <ScrollView height={'90%'} nestedScrollEnabled={true}>
          {data?.map((item, idx) => {
            return <Row item={item} key={idx} setReFetch={setReFetch} />;
          })}
        </ScrollView>
      </Table>
    </ScrollView>
  );
};

const Row = ({
  item,
  setReFetch,
}: {
  item: Session;
  setReFetch: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const createdAt = new Date(item.createdAt).toDateString();
  const updatedAt = new Date(item.updatedAt).toDateString();

  const {t} = useTranslation();

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [extentPeriodLoading, setExtentPeriod] = useState(false);

  const status = item.status.toString();
  const dialog = useDialog();
  const dialogExtends = useDialog();
  const [reasonCloseSession, setReasonCloseSession] =
    useState<string | null | undefined>();
  const [ttlMessage, setTtlMessage] = useState<string | null | undefined>();
  const [errorReasonInput, setErrorReasonInput] =
    useState<string | null | undefined>();
  const [ttl, setTtl] = useState(0);

  const dataSelect = [
    {value: '6000', label: '10 mins'},
    {value: '1200', label: '20 mins'},
    {value: '1800', label: '30 mins'},
    {value: '2400', label: '40 mins'},
    {value: '3000', label: '50 mins'},
    {value: '3600', label: '1 hour'},
    {value: '5400', label: '1.5 hour'},
    {value: '7200', label: '2 hours'},
    {value: '10800', label: '3 hours'},
    {value: '14400', label: '4 hours'},
    {value: '18000', label: '5 hours'},
    {value: '21600', label: '6 hours'},
    {value: '36000', label: '10 hours'},
    {value: '43200', label: '12 hours'},
    {value: '57600', label: '16 hours'},
    {value: '86400', label: 'A day'},
    {value: '172800', label: '2 days'},
    {value: '259200', label: '3 days'},
    {value: '345600', label: '4 days'},
    {value: '604800', label: 'A week'},
    {value: '1209600', label: '2 weeks'},
  ];

  const header = {
    certignahash: 'ySsPUR23',
    certignarole: 2,
    certignauser: 'pps#test',
  };
  const sessionApi = new SessionService(API_URL ?? '', header);

  return (
    <>
      <TableRow backgroundColor={'gray.800'}>
        <TableCell width={'50px'} textStyle={{color: 'gray.200'}}>
          {item.url}
        </TableCell>
        <TableCell width={'50px'} textStyle={{color: 'gray.200'}}>
          {SessionStatus[item.status]}
        </TableCell>
        <TableCell width={'50px'} textStyle={{color: 'gray.200'}}>
          {item.ttl}
        </TableCell>
        <TableCell width={'50px'} textStyle={{color: 'gray.200'}}>
          {item.publicId}
        </TableCell>
        <TableCell width={'50px'} textStyle={{color: 'gray.200'}}>
          {createdAt}
        </TableCell>
        <TableCell width={'50px'} textStyle={{color: 'gray.200'}}>
          {updatedAt}
        </TableCell>
        <TableCell width={'50px'} textStyle={{color: 'gray.200'}}>
          <HStack justifyContent={'flex-end'} width={'55%'} space={0} p={0}>
            {status !== '20' ? (
              status !== '10' && (
                <>
                  <IconButton
                    icon={<DeleteIcon color={'#e11d48'} size={'lg'} />}
                    onPress={dialog.onOpen}
                  />
                  <IconButton
                    icon={<AddIcon color={'success.500'} size={'lg'} />}
                    onPress={dialogExtends.onOpen}
                  />
                </>
              )
            ) : (
              <></>
            )}
          </HStack>
        </TableCell>
      </TableRow>
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
                  text
                    ? setErrorReasonInput(undefined)
                    : setErrorReasonInput(
                        t(Localization('reasonCannotBeEmpty')),
                      );
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

      <Dialog
        size={'md'}
        headerBackgroundColor={'gray.700'}
        bodyBackgroundColor={'gray.700'}
        footerBackgroundColor={'gray.700'}
        buttons={
          <HStack space={3}>
            <LoadingButton
              width={'40%'}
              isLoading={extentPeriodLoading}
              type={'danger'}
              text={t(Localization('yes')) ?? ''}
              onPress={async () => {
                if (ttl <= 0) {
                  setTtlMessage(t(Localization('pleaseChooseAnExtendPeriod')));
                  return;
                }
                setDeleteLoading(true);
                try {
                  const data = await sessionApi.extendSession(
                    `${item.url}/extendSession`,
                    {
                      ttl,
                    },
                    {
                      CertignaUser: 'pps#test',
                      CertignaHash: 'ySsPUR23',
                    },
                  );
                  console.log(data);
                  setReFetch(prev => !prev);
                  dialogExtends.onClose();
                } catch (e: any) {
                  if (isAxiosError(e)) {
                    console.log(e, typeof e.code);
                    switch (e.response?.status) {
                      case 409:
                        setTtlMessage(
                          'New extent period must be greater than the old time period',
                        );
                        break;
                      case 403:
                        setTtlMessage('Session already closed!');
                        break;
                      default:
                        break;
                    }
                    console.log(e.message);
                  }
                  console.log(e.message);
                } finally {
                  setExtentPeriod(false);
                }
              }}
            />
            <LoadingButton
              width={'40%'}
              type={'warning'}
              text={t(Localization('no')) ?? ''}
              onPress={dialogExtends.onClose}
            />
          </HStack>
        }
        header={
          <MyText type={'white'}>{t(Localization('extendSession'))}</MyText>
        }
        body={
          <VStack height={'100%'} space={2}>
            <View height={'70%'}>
              <MyText type={'white'} fontWeight={'bold'}>{`${t(
                Localization('selectPeriod'),
              )}`}</MyText>
              <MySelect
                select={{placeholder: 'Choose an extent period.'}}
                data={dataSelect}
                defaultSelect={ttl.toString()}
                onValueChange={value => {
                  setTtl(Number(value));
                  Number(value) <= 0
                    ? setTtlMessage(
                        t(Localization('pleaseChooseAnExtendPeriod')),
                      )
                    : setTtlMessage(undefined);
                }}
              />
            </View>
            <MyText type={'danger'} fontSize={'xs'}>
              {ttlMessage}
            </MyText>
          </VStack>
        }
        isOpen={dialogExtends.isOpen}
        onClose={dialogExtends.onClose}
      />
    </>
  );
};
