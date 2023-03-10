import React, {ReactNode, useEffect, useState} from 'react';
import {
  Box,
  Center,
  HStack,
  IBoxProps,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
  WarningIcon,
} from 'native-base';

import {COLOR} from '@src/screens/Interface/Docusign/color/Color';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUnlockKeyhole} from '@fortawesome/free-solid-svg-icons';
import {Layout} from '@components/layout';
import ActivityInfo from '@screens/Interface/Docusign/components/ActivityInfo';
import {ListMenu} from '@screens/Interface/Docusign/components/listMenu/ListMenu';
import SwiperList from '@screens/Interface/Docusign/components/SwiperList';
import {LogBox} from 'react-native';
import {sessionsApi} from '@screens/Interface/Docusign/page/Type';
import {SessionsResponse} from '@src/services/sessions';
interface type {
  title: ReactNode;

  icon: ReactNode;
  footer: ReactNode;
  subTitle: ReactNode;
  prop?: IBoxProps;
}
function PageHomeDocusign({navigation}: any) {
  const [New, setNew] = useState(false);
  const [dataSession, setDataSession] =
    React.useState<SessionsResponse | undefined>();
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  const showSession = async () => {
    try {
      const data = await sessionsApi.getSessions<SessionsResponse | undefined>({
        expirationstatus: 'valid',
      });
      setDataSession(data);
    } catch (e) {
      console.log(e);
    }
  };
  React.useMemo(() => showSession(), []);
  const DATA: type[] | undefined = dataSession?.sessions?.map((i, index) => {
    const data = i.split('/').slice(3).join();
    return {
      icon: <WarningIcon size={'lg'} color={'blue.600'} />,
      title: (
        <Text {...COLOR.Text.titleActivityInfo_Info}>{data + 'valid'}</Text>
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

  return (
    <Layout navigation={navigation}>
      <ScrollView>
        <Box safeArea w={'100%'} h={'90%'} bg={COLOR.BackGroundDocuSign}>
          <Image
            source={require('@src/assets/images/picDocuSign.png')}
            alt="Hello"
          />
          <Box w={'100%'} mt={3}>
            <Center h={'20%'}>
              <HStack justifyContent={'center'} space={2} w={'100%'}>
                <Box
                  px={8}
                  borderWidth={2}
                  borderColor={'white'}
                  bg={'white'}
                  rounded={'md'}
                >
                  <VStack>
                    <Center>
                      <Text {...COLOR.Text.inBoxAction_waiting}>1</Text>
                      <Text
                        color={COLOR.Text.inBoxAction_waiting.color}
                        fontSize={'md'}
                      >
                        Action Required
                      </Text>
                    </Center>
                  </VStack>
                </Box>
                <Box
                  px={8}
                  borderWidth={2}
                  borderColor={'white'}
                  bg={'white'}
                  rounded={'md'}
                >
                  <VStack>
                    <Center>
                      <Text {...COLOR.Text.inBoxAction_waiting}>0</Text>
                      <Text
                        color={COLOR.Text.inBoxAction_waiting.color}
                        fontSize={'md'}
                      >
                        Waiting for Others
                      </Text>
                    </Center>
                  </VStack>
                </Box>
              </HStack>
            </Center>
            <VStack space={2} px={2} mt={5}>
              {/*<Text {...COLOR.Text.Recent}>Recent Activity</Text>*/}
              <Box bg={'white'} p={1}>
                <ActivityInfo
                  prop={{
                    display: New ? 'none' : 'flex',
                    borderBottomColor: 'gray.300',
                    borderBottomWidth: 1,
                    py: 2,
                  }}
                  icon={<Text {...COLOR.ButtonColor.buttonNew}>New</Text>}
                  title={
                    <Text {...COLOR.Text.titleActivityInfo_New}>
                      Swipe left to take actions on your envelopes.
                    </Text>
                  }
                  meaning={
                    <>
                      <Text />
                    </>
                  }
                  footer={
                    <Pressable
                      onPress={() => {
                        setNew(true);
                      }}
                      alignSelf={'flex-end'}
                    >
                      <Text {...COLOR.Text.gotIt} fontWeight={'semibold'}>
                        Got it
                      </Text>
                    </Pressable>
                  }
                />
                <SwiperList data={DATA} />
              </Box>
              <Box bg={'gray.50'}>
                <VStack>
                  <ListMenu />

                  <ListMenu
                    icon={
                      <FontAwesomeIcon
                        icon={faUnlockKeyhole}
                        color={'gray'}
                        size={24}
                      />
                    }
                    title={
                      <Text {...COLOR.Text.textRedirect}>Enable Face ID</Text>
                    }
                  />
                </VStack>
              </Box>
            </VStack>
          </Box>
        </Box>
      </ScrollView>
    </Layout>
  );
}
export default PageHomeDocusign;
