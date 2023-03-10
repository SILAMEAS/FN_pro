import React, {ReactNode} from 'react';
import {
  Box,
  HStack,
  IBoxProps,
  Icon,
  Menu,
  Pressable,
  Text,
  VStack,
  WarningIcon,
} from 'native-base';
import {COLOR} from '@screens/Interface/Docusign/color/Color';
import HeaderCustom from '@screens/Interface/Docusign/components/HeaderCustom';
import SwiperList from '@screens/Interface/Docusign/components/SwiperList';
import {sessionsApi} from '@screens/Interface/Docusign/page/Type';
import {SessionsResponse} from '@src/services/sessions';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faFilter,
  faSearch,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import {Loading, useLoading} from '@components/commons/loading';
import InputCustomize from '@screens/Interface/Docusign/components/input/InputCustomize';
import {DropMenu} from '@screens/Interface/Docusign/components/DropMenu';
interface type {
  title: ReactNode;

  icon: ReactNode;
  footer: ReactNode;
  subTitle: ReactNode;
  prop?: IBoxProps;
}

function PageInboxDocusign() {
  const [filter, setFilter] =
    React.useState<'all' | 'expired' | 'valid' | undefined>('all');
  const [dataSession, setDataSession] =
    React.useState<SessionsResponse | undefined>();
  const loading = useLoading(true);
  const [search, setSearch] = React.useState('');
  const showSession = async () => {
    try {
      const data = await sessionsApi.getSessions<SessionsResponse | undefined>({
        expirationstatus: filter,
      });
      setDataSession(data);
    } catch (e) {
      console.log(e);
    }
  };
  React.useMemo(() => showSession(), [filter]);
  const Data: type[] | undefined = dataSession?.sessions
    ?.filter(i => i.includes(search))
    .map((i, index) => {
      return {
        icon: <WarningIcon size={'lg'} color={'blue.600'} />,
        title: (
          <Text {...COLOR.Text.titleActivityInfo_Info}>
            {i}
            {filter === 'valid'
              ? '(Complete)'
              : filter === 'expired'
              ? '(Expired)'
              : '(Unknown)'}
          </Text>
        ),
        subTitle: (
          <>
            <Text color={'gray.500'} fontWeight={'semibold'}>
              Form: meas sila
            </Text>
            <Text color={'gray.500'} fontWeight={'semibold'}>
              Needs to sign
            </Text>
          </>
        ),
        footer: (
          <Text
            px={4}
            borderRadius={'xs'}
            color={'white'}
            alignSelf={'flex-end'}
            fontWeight={'semibold'}
            bg={'red.800'}
          >
            Item {index + 1}
          </Text>
        ),
      };
    });
  const [IsSearch, setIsSearch] = React.useState(true);
  console.log(search);
  return (
    <Box safeArea w={'100%'} h={'90%'} bg={'white'}>
      <HeaderCustom
        iconLeft={
          IsSearch ? (
            <Pressable
              onPress={() => {
                setIsSearch(false);
              }}
            >
              <FontAwesomeIcon
                icon={faSearch}
                size={20}
                color={COLOR.ButtonColor.searchButton}
              />
            </Pressable>
          ) : (
            <></>
          )
        }
        iconRight={
          <>
            {IsSearch ? (
              <HStack space={2} alignItems={'center'}>
                <Text
                  {...COLOR.Text.textRedirect}
                  textAlign={'center'}
                  borderBottomWidth={1}
                  borderBottomColor={'gray.200'}
                >
                  {dataSession?.sessions.length}
                </Text>
                <Box>
                  <DropMenu
                    ListData={
                      <>
                        <Menu.Item
                          onPress={() => {
                            loading.setLoading(true);
                            setFilter('valid');
                          }}
                        >
                          Valid
                        </Menu.Item>
                        <Menu.Item
                          onPress={() => {
                            loading.setLoading(true);
                            setFilter('all');
                          }}
                        >
                          All
                        </Menu.Item>
                        <Menu.Item
                          onPress={() => {
                            loading.setLoading(true);
                            setFilter('expired');
                          }}
                        >
                          Expired
                        </Menu.Item>
                      </>
                    }
                    icon={
                      <>
                        <FontAwesomeIcon
                          icon={faFilter}
                          size={20}
                          color={'black'}
                        />
                      </>
                    }
                  />
                </Box>
              </HStack>
            ) : (
              <></>
            )}
          </>
        }
        title={
          IsSearch ? (
            <Text color={'black'} fontWeight={'bold'} fontSize={'md'}>
              All Documents
            </Text>
          ) : (
            <InputCustomize
              value={search}
              placeholder={{color: 'gray.400', text: 'Search session ID'}}
              setValue={e => setSearch(e)}
              iconLeft={
                <Icon
                  m="2"
                  ml="3"
                  size="6"
                  color="gray.400"
                  as={
                    <Pressable
                      onPress={() => {
                        setIsSearch(true);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faWindowClose}
                        size={20}
                        color={'black'}
                      />
                    </Pressable>
                  }
                />
              }
              iconRight={
                <Icon
                  m="2"
                  mr="3"
                  size="6"
                  color="gray.400"
                  as={
                    <Pressable>
                      <FontAwesomeIcon
                        icon={faSearch}
                        size={20}
                        color={'black'}
                      />
                    </Pressable>
                  }
                />
              }
            />
          )
        }
      />
      <Box
        justifyContent={'center'}
        alignItems={'center'}
        h={'100%'}
        w={'100%'}
      >
        {Data?.length !== 0 ? (
          <SwiperList data={Data} />
        ) : (
          <VStack space={5}>
            <Text {...COLOR.Text.textRedirect}>NO DATA</Text>
            {loading.isLoading && (
              <Loading spinnerStyle={{color: 'cyan.400', size: 'lg'}} />
            )}
          </VStack>
        )}
      </Box>
    </Box>
  );
}

export default PageInboxDocusign;
