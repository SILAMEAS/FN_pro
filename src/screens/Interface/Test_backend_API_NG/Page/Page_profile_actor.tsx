import {useRoute} from '@react-navigation/native';
import {setDoc_Approve} from '@src/redux/counter/CounterSlice';

import {
  Box,
  Button,
  Center,
  ChevronLeftIcon,
  HamburgerIcon,
  HStack,
  Image,
  Input,
  Pressable,
  SearchIcon,
  Text,
  VStack,
} from 'native-base';
import React from 'react';

import {Constant_Navigator} from '../../../../navigation/Constant_Navigator';
import {ApproveDoc} from '../service/document/index';
import { useAppDispatch, useAppSelector } from "@src/redux/config/hooks";

const Api_ng_profile_actor = ({navigation}: any) => {
  const [Width_Height, setWH] = React.useState(120);
  const [checkWH, setcheckWH] = React.useState(false);
  // redux
  const dispatch = useAppDispatch();
  const openIMG = () => {
    setcheckWH(!checkWH);
    checkWH === true ? setWH(450) : setWH(120);
  };
  const {
    params: {actorUrl, pdfUrl, sessionUrl, otp},
  }: any = useRoute();
  const {DATAofActor} = useAppSelector((state) => state.counter);

  const clearDATAofActor = () => {
    navigation.navigate(Constant_Navigator.API_NG);
  };

  React.useEffect(() => {}, [DATAofActor]);
  const getDatail_approve_doc = async () => {
    const data = await ApproveDoc(sessionUrl, actorUrl, pdfUrl, otp);
    dispatch(setDoc_Approve(data));
    navigation.navigate(Constant_Navigator.PageApproveDoc, {
      sessionUrl: sessionUrl,
    });
  };

  return (
    <Box h={'100%'} w={'100%'} safeArea>
      <Box h={'20'} bg={'blue.600'}>
        <Box>
          <VStack justifyContent={'space-between'} h={'100%'}>
            <HStack
              justifyContent={'space-around'}
              alignItems={'center'}
              px={4}
              space={8}
              pb={2}
            >
              <Text onPress={clearDATAofActor}>
                <ChevronLeftIcon color={'white'} />
              </Text>

              <Input
                w={'90%'}
                h={'10'}
                rounded={'lg'}
                bg={'black:alpha.30'}
                placeholder={DATAofActor.name}
                borderWidth={0}
                placeholderTextColor={'white'}
                color={'red.700'}
                InputLeftElement={<SearchIcon color={'white'} ml={'40%'} />}
              />
              <HamburgerIcon color={'white'} />
            </HStack>
            <Box alignItems={'center'}>
              <Image
                key={'sds'}
                w={'100%'}
                h={280}
                resizeMode="cover"
                source={{
                  uri: 'https://i.pinimg.com/originals/5b/90/8b/5b908b65019a328b9c310c1243b52408.png',
                }}
                alt={'Alternate Text '}
              />
              <Box position={'relative'} w={'100%'} top={'-15%'}>
                <VStack w={'100%'}>
                  <Pressable onPress={openIMG}>
                    <Image
                      alignSelf={'center'}
                      key={'sdsss'}
                      w={Width_Height}
                      h={Width_Height}
                      resizeMode="cover"
                      borderWidth={1}
                      borderColor={'white'}
                      source={{
                        uri: 'https://i.pinimg.com/originals/5b/90/8b/5b908b65019a328b9c310c1243b52408.png',
                      }}
                      alt={'Alternate Text '}
                    />
                  </Pressable>
                  <Text color={'black'} fontSize={26} textAlign={'center'}>
                    Id :{DATAofActor.aid}
                  </Text>
                </VStack>
                <HStack justifyContent={'space-around'} mt={5} />
                <Center bg={'blue.600'} py={5} px={3}>
                  <Text color={'white'}>
                    Email :{DATAofActor.email?.slice(0, 10)}
                  </Text>
                  <Text color={'white'}>
                    Name : {DATAofActor['first-name']} {DATAofActor.name}
                  </Text>

                  <Text color={'white'}>
                    DATE : {DATAofActor.date?.slice(0, 10)}
                  </Text>
                  <Text color={'white'}>User_Role :{DATAofActor.roles}</Text>
                  <Text color={'white'}>Country : {DATAofActor.country}</Text>
                  <Button onPress={getDatail_approve_doc}>Approve Doc</Button>
                </Center>
              </Box>
            </Box>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default Api_ng_profile_actor;
