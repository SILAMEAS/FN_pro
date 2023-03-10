import {setAllFileUpload, setOne} from '@src/redux/counter/CounterSlice';

import {Box, Button, Center, CloseIcon, Pressable, Text} from 'native-base';
import React from 'react';
import {useDispatch} from 'react-redux';
import {get_detail_session} from '../../service/sessions';
import {SKELETON} from '../skelaton/Skeleton';
import {getfile as getFile} from '@screens/Interface/Test_backend_API_NG/service/document';

interface Type {
  name: string;
  time?: number;
  navigation: any;
  goto: string;
  deletes: (g: string) => void | Promise<void> | undefined;
}

const CardT = ({name, deletes, navigation, goto}: Type) => {
  const getFileUpload = async () => {
    const data = await getFile();
    dispatch(setAllFileUpload(data));
  };
  //======================================================
  const dispatch = useDispatch();
  return (
    <Box
      w={['90%', '80%', '20%']}
      bg={'black'}
      borderWidth={1}
      borderColor={'yellow.600'}
      rounded={10}
      mb={3}
      h={['20', '150']}
      px={4}
    >
      <Button
        bg={'black'}
        position={'absolute'}
        p={2}
        h={'100%'}
        py={8}
        rounded={'full'}
        right={0}
        onPress={() => {
          deletes(name);
        }}
      >
        <CloseIcon color={'yellow.600'} size={'lg'} />
      </Button>
      {name ? (
        <Pressable
          w={'80%'}
          h={'100%'}
          onPress={async () => {
            const data = await get_detail_session(name);
            navigation.navigate(goto);
            dispatch(setOne(data));
            getFileUpload();
          }}
        >
          <Center py={2} h={'100%'} w={'90%'}>
            <Text fontWeight={'extrabold'} color={'yellow.600'}>
              Session : {name.split('/')[4]}
            </Text>
            {/* <Text fontWeight={'extrabold'}>{cd} seconds</Text> */}
          </Center>
        </Pressable>
      ) : (
        <SKELETON />
      )}
    </Box>
  );
};

export default CardT;
