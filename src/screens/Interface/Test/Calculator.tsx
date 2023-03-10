import {
  faBatteryHalf,
  faSignal,
  faWifiStrong,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Set_Num_cal} from '@src/redux/counter/CounterSlice';
import {
  Button,
  Center,
  HStack,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from 'native-base';
import React from 'react';
// import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const Calculator = ({navigation}: any) => {
  const [num, setNum] = React.useState('');

  const {Num_cal} = useSelector((state: any) => state.counter);
  // const [Total, setTotal] = React.useState(0);
  const dispatch = useDispatch();
  // alert(Num_cal);

  // const [Opt, SetOpt] = React.useState('');
  const {toggleColorMode} = useColorMode();
  const backgroundColor = useColorModeValue('warmGray.50', 'coolGray.800');
  // const colorMode = useColorModeValue('Light', 'Dark');
  const he = [
    'AC',
    '+_',
    '%',
    '/',
    7,
    8,
    9,
    '*',
    4,
    5,
    6,
    '-',
    1,
    2,
    3,
    '+',
    0,
    '.',
    '=',
  ];
  const Press = (i: any) => {
    if (i >= 0 && i < 10) setNum(num + i);

    if (i === '+') {
      dispatch(Set_Num_cal(Num_cal + Number(num)));
      setNum('');
    }
    if (i === '*') {
      if (Num_cal === 0) {
        dispatch(Set_Num_cal(Number(num)));
        setNum('');
      } else {
        dispatch(Set_Num_cal(Num_cal * Number(num)));
        setNum('');
      }
    }
    if (i === '/') {
      if (Num_cal === 0) {
        dispatch(Set_Num_cal(Number(num)));
        setNum('');
      } else {
        const divid = Num_cal / Number(num);
        dispatch(Set_Num_cal(parseFloat(divid.toFixed(2))));

        setNum('');
      }
    }
    if (i === '-') {
      num > Num_cal &&
        dispatch(Set_Num_cal(-Math.abs(Number(num) - Math.abs(Num_cal))));
      dispatch(Set_Num_cal(Math.abs(Number(num) - Math.abs(Num_cal))));
      setNum('');
    }

    if (i == 'AC') {
      setNum('');
      dispatch(Set_Num_cal(0));
    }
  };

  // const [pdfType, setPdfType] = React.useState<boolean>(false);
  return (
    <>
      <Stack bg={backgroundColor}>
        <HStack
          justifyContent={'space-between'}
          h="5%"
          px={5}
          bg={backgroundColor}
        >
          <VStack>
            <Text
              _dark={{
                color: 'white',
              }}
              _light={{
                color: 'black',
              }}
            >
              11:24am
            </Text>
          </VStack>
          <HStack space={2}>
            <Text
              onPress={toggleColorMode}
              _dark={{
                color: 'white',
              }}
              _light={{
                color: 'black',
              }}
            >
              mode
            </Text>
            <Text
              _dark={{
                color: 'white',
              }}
              _light={{
                color: 'black',
              }}
            >
              <FontAwesomeIcon icon={faWifiStrong} color="gray" />{' '}
            </Text>

            <FontAwesomeIcon icon={faSignal} color="gray" />
            <Text>
              <FontAwesomeIcon icon={faBatteryHalf} color="gray" />
            </Text>
          </HStack>
        </HStack>
        <Stack
          h="25%"
          width={'100%'}
          justifyContent="center"
          alignItems={'flex-end'}
        >
          <HStack
            justifyContent="space-between"
            w="95%"
            mb={1}
            mx="auto"
            h="100%"
          >
            <Text
              onPress={() => {
                navigation.navigate('View_CRUD');
              }}
              underline
              fontSize={'3xl'}
              fontWeight="bold"
              color={'white'}
              alignSelf="flex-end"
              _dark={{
                color: 'white',
              }}
              _light={{
                color: 'black',
              }}
            >
              = {Num_cal}
            </Text>
            <Text
              fontSize={'3xl'}
              fontWeight="bold"
              color="white"
              _dark={{
                color: 'white',
              }}
              _light={{
                color: 'black',
              }}
            >
              {num.length === 0 ? 0 : num}
            </Text>
          </HStack>
        </Stack>
        <Stack
          h={'70%'}
          bg={backgroundColor}
          direction={['row', 'row']}
          w="100%"
          flexWrap={'wrap'}
        >
          {he.map((i: any) =>
            i == 0 ? (
              <Button
                p={2}
                bg={backgroundColor}
                borderWidth={1}
                h="1/5"
                w="1/2"
                justifyContent={'center'}
                alignContent="center"
                flexWrap={'wrap'}
                key={i}
                onPress={() => {
                  Press(i);
                }}
              >
                <Center w="100%">
                  <Text
                    fontWeight={'bold'}
                    fontSize="2xl"
                    textAlign={'center'}
                    _dark={{
                      color: 'white',
                    }}
                    _light={{
                      color: 'black',
                    }}
                  >
                    {i}
                  </Text>
                </Center>
              </Button>
            ) : i === 'AC' ? (
              <Button
                alignContent={'center'}
                p={2}
                borderColor="#0005"
                borderWidth={1}
                bg="red.700"
                h="1/5"
                w="1/4"
                justifyContent={'center'}
                alignItems="center"
                flexWrap={'wrap'}
                key={i}
                onPress={() => {
                  Press(i);
                }}
              >
                <Center width={'100%'}>
                  <Text
                    fontWeight={'bold'}
                    fontSize="2xl"
                    onPress={() => {
                      Press(i);
                    }}
                    _dark={{
                      color: 'white',
                    }}
                    _light={{
                      color: 'black',
                    }}
                  >
                    {i}
                  </Text>
                </Center>
              </Button>
            ) : isNaN(i) ? (
              <Button
                alignContent={'center'}
                p={2}
                borderColor="#0005"
                borderWidth={1}
                bg={backgroundColor}
                h="1/5"
                w="1/4"
                justifyContent={'center'}
                alignItems="center"
                flexWrap={'wrap'}
                key={i}
                onPress={() => {
                  Press(i);
                }}
              >
                <Center width={'100%'}>
                  <Text
                    fontWeight={'bold'}
                    fontSize="2xl"
                    onPress={() => {
                      Press(i);
                    }}
                    _dark={{
                      color: 'white',
                    }}
                    _light={{
                      color: 'black',
                    }}
                  >
                    {i}
                  </Text>
                </Center>
              </Button>
            ) : (
              <Button
                alignContent={'center'}
                p={2}
                borderColor="#0005"
                borderWidth={1}
                bg={backgroundColor}
                h="1/5"
                w="1/4"
                justifyContent={'center'}
                alignItems="center"
                flexWrap={'wrap'}
                key={i}
                onPress={() => {
                  Press(i);
                }}
              >
                <Center width={'100%'}>
                  <Text
                    _dark={{
                      color: 'white',
                    }}
                    _light={{
                      color: 'black',
                    }}
                    fontWeight={'bold'}
                    fontSize="2xl"
                    onPress={() => {
                      Press(i);
                    }}
                  >
                    {i}
                  </Text>
                </Center>
              </Button>
            ),
          )}
        </Stack>
      </Stack>
    </>
  );
};

// const sytle = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingVertical: 12,

//     height: '100%',
//     backgroundColor: '#996600',
//     width: '100%',
//   },
// });

export default Calculator;
