import {Constant_Navigator} from '@src/navigation/Constant_Navigator';
import {Box, Button, Heading, HStack, ScrollView, Text} from 'native-base';
import React, {useState} from 'react';
import CardT from '../../../components/card/CardT';
import {
  addSession,
  deleteSession,
  get_session,
} from '../../../service/sessions';
import { useAppSelector } from "@src/redux/config/hooks";



const PageSession = ({navigation}: any) => {
  const [Data, setData] = useState([]);
  const {ForSign} = useAppSelector((state) => state.counter);

  console.log('9900');
  console.log(ForSign);
  const get = async () => {
    setData(await get_session());
  };
  const add = async () => {
    const data = await addSession();
    data && get();
  };

  const deletes = async (g: any) => {
    const data = await deleteSession(g);
    if (data) {
      get();
    }
  };

  React.useEffect(() => {
    get();
  }, []);

  return (
    <Box bg={'black'} h={'100%'}>
      <Heading color={'yellow.600'} textAlign={'center'} py={4}>
        Session
      </Heading>
      <ScrollView h={['100%', '100%', '100%']}>
        <HStack
          h={'100%'}
          flexWrap={'wrap'}
          justifyContent={'center'}
          w={'100%'}
          alignItems={'center'}
          space={1}
        >
          {Data?.map((i: any) => {
            return (
              <CardT
                name={i}
                time={100}
                key={i}
                deletes={() => deletes(i)}
                navigation={navigation}
                goto={Constant_Navigator.NewP_PageDetail}
              />
            );
          })}
        </HStack>
      </ScrollView>
      <HStack justifyContent={'center'} w={'100%'} space={10} py={3}>
        <Button
          bg={'black'}
          borderWidth={1}
          borderColor={'yellow.600'}
          onPress={() => {
            navigation.navigate(Constant_Navigator.NewP_Session);
            add();
          }}
        >
          <Text color={'yellow.600'} fontWeight={'bold'} fontSize={'md'}>
            Create Session
          </Text>
        </Button>
        <Button
          bg={'black'}
          borderWidth={1}
          borderColor={'yellow.600'}
          onPress={() => {
            navigation.navigate(Constant_Navigator.NewP_Upload);
          }}
        >
          <Text color={'yellow.600'} fontWeight={'bold'} fontSize={'md'}>
            Upload File
          </Text>
        </Button>
      </HStack>
    </Box>
  );
};

export default PageSession;
