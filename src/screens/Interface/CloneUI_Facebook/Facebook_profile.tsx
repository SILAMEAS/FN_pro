import Statusbar from '@src/components/compoents(ms)/statusbar/Statusbar';
import {setOne} from '@src/redux/counter/CounterSlice';

import {
  AddIcon,
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
import {useAppDispatch, useAppSelector} from '@src/redux/config/hooks';

const Facebook_profile = ({navigation}: any) => {
  const [Width_Height, setWH] = React.useState(120);
  const [checkWH, setcheckWH] = React.useState(false);
  const openIMG = () => {
    setcheckWH(!checkWH);
    checkWH === true ? setWH(450) : setWH(120);
  };
  const {GetOne} = useAppSelector(state => state.counter);
  console.log('222222222222222222222222222222222222222222');
  console.log(GetOne);
  console.log('222222222222222222222222222222222222222222');
  const dispatch = useAppDispatch();
  const clearGetOne = () => {
    navigation.navigate('Interface_facebook');
    dispatch(setOne({}));
  };
  React.useEffect(() => {}, [GetOne]);
  // const color = 'white';
  const HandleEdit = () => {
    alert('edite');
  };
  return (
    <Box h={'100%'} w={'100%'} safeArea>
      <Box h={'20'} bg={'blue.600'}>
        <Box>
          <VStack justifyContent={'space-between'} h={'100%'}>
            <Statusbar />
            <HStack
              justifyContent={'space-around'}
              alignItems={'center'}
              px={4}
              space={8}
              pb={2}
            >
              <Text onPress={clearGetOne}>
                <ChevronLeftIcon color={'white'} />
              </Text>

              <Input
                w={'90%'}
                h={'10'}
                rounded={'lg'}
                bg={'black:alpha.30'}
                borderWidth={0}
                placeholder={`${GetOne.name}`}
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
                    {GetOne.name}
                  </Text>
                </VStack>
                <HStack justifyContent={'space-around'} mt={5}>
                  <Button onPress={HandleEdit}>
                    <AddIcon color={'gray.700'} />
                    edit
                  </Button>
                </HStack>
                <Center bg={'blue.600'} py={5} px={3}>
                  <Text color={'white'}>Email : {GetOne.email}</Text>
                  <Text color={'white'}>Tel : {GetOne.phone}</Text>
                  <Text color={'white'}>Age : {GetOne.age}</Text>
                  <Text color={'white'}>User_Role : {GetOne.userRole}</Text>
                  <Text color={'white'}>Address :{GetOne.address}</Text>
                </Center>
              </Box>
            </Box>
          </VStack>
        </Box>
      </Box>
    </Box>
    // <Container w={'100%'} bg={'black'}>
    //   <Box bg={'red.300'} w={'100%'} h={'100%'}>
    //     <Stack h={'100%'} w={'100%'}>
    //       <HStack bg={'blue.800.alpha..60'} h={'100%'}>
    //         <Text color={color}>sdf</Text>
    //         <Text color={color}>sdf</Text>
    //         <Text color={color}>sdf</Text>
    //       </HStack>
    //     </Stack>
    //   </Box>
    // </Container>
  );
};

export default Facebook_profile;
