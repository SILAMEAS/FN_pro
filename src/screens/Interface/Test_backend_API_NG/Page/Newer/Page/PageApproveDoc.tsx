
import {Box, Center, Heading, Pressable, Text} from 'native-base';
import React from 'react';

import {get_detail_actor} from '@screens/Interface/Test_backend_API_NG/service/actors';
import {get_detail_file} from '@screens/Interface/Test_backend_API_NG/service/document';

import {get_cgu} from '@screens/Interface/Test_backend_API_NG/service/cgu';
import {setData_cgu} from '@src/redux/counter/CounterSlice';
import {useSlide} from '@screens/Interface/Test_backend_API_NG/Page/Newer/components/cheaNit_picker_file/slide';
import {Constant_Navigator} from '@src/navigation/Constant_Navigator';
import { useAppDispatch, useAppSelector } from "@src/redux/config/hooks";
interface Type {
  detail_actor: DetailActor;
  detail_doc: DetailDoc;
}
interface DetailActor {
  aid: number;
  country: string;
  date: Date;
  email: string;
  'first-name': string;
  id: number;
  'manifest-data': Data;
  name: string;
  roles: string[];
  type: number;
  'user-data': Data;
}
interface Data {}
interface DetailDoc {
  abstract: string;
  date: Date;
  did: number;
  'file-name': string;
  id: number;
  'manifest-data': Data;
  status: number;
  title: string;
  'user-data': Data;
}
const PageApproveDoc = () => {
  const {next} = useSlide();
  const dispatch = useAppDispatch();
  const {Doc_Approve} = useAppSelector((state) => state.counter);
  const [Detail, setDetail] = React.useState<Type>();
  const all_detail = async () => {
    const detail_actor = await get_detail_actor(
      Doc_Approve.signatures[0].actor,
    );
    const detail_doc = await get_detail_file(
      Doc_Approve.signatures[0].document,
    );
    setDetail({detail_actor, detail_doc});
  };

  React.useEffect(() => {
    all_detail();
  }, []);

  return (
    <Box
      bg={'black'}
      h={['100%', `${Constant_Navigator.HeightScreenWeb}`]}
      w={'100%'}
    >
      <Center w={'100%'}>
        <Heading color={'yellow.600'} mt={5}>
          Page Approve Doc
        </Heading>
        <Box
          borderWidth={2}
          borderColor={'yellow.600'}
          px={10}
          mt={10}
          py={5}
          rounded={'md'}
          w={['100%', '50%']}
        >
          {/*=================Actor=============*/}
          <Text color={'yellow.600'} fontWeight={'bold'} fontSize={'md'}>
            Process type: {Doc_Approve?.signatures[0]?.tag} {'<<'}
            {'>>'}
          </Text>

          <Text color={'yellow.600'} fontWeight={'bold'} fontSize={'md'}>
            Actor [
          </Text>
          <Text
            color={'yellow.600'}
            fontWeight={'bold'}
            fontSize={'md'}
            ml={'1/3'}
          >
            ID :{Detail?.detail_actor.id} ({Detail?.detail_actor?.aid})
          </Text>
          <Text
            color={'yellow.600'}
            fontWeight={'bold'}
            fontSize={'md'}
            ml={'1/3'}
          >
            Name : {Detail?.detail_actor['first-name']} _{' '}
            {Detail?.detail_actor?.name}
          </Text>
          <Text
            color={'yellow.600'}
            fontWeight={'bold'}
            fontSize={'md'}
            ml={'1/3'}
          >
            Country : {Detail?.detail_actor?.country}
          </Text>
          <Text
            color={'yellow.600'}
            fontWeight={'bold'}
            fontSize={'md'}
            ml={'1/3'}
          >
            {/*Role : {'<'} {Detail?.detail_actor?.roles[0]} {'> '}*/}
            {/*{'<'} {Detail?.detail_actor?.roles[1]} {'>'}*/}
          </Text>
          <Text
            color={'yellow.600'}
            fontWeight={'bold'}
            fontSize={'md'}
            ml={'1/3'}
          >
            Date Create : {Detail?.detail_actor?.date?.toString().split('T')[0]}
          </Text>
          <Text
            color={'yellow.600'}
            fontWeight={'bold'}
            fontSize={'md'}
            ml={'1/3'}
          >
            Email : {Detail?.detail_actor?.email?.slice(0, 3)} ...{' '}
            {Detail?.detail_actor?.email?.split('.')[1]}
          </Text>
          {/*=================Document=============*/}
          <Text
            color={'yellow.600'}
            fontWeight={'bold'}
            fontSize={'md'}
            ml={10}
          >
            ]
          </Text>
          <Text color={'yellow.600'} fontWeight={'bold'} fontSize={'md'}>
            Document : {'['}
          </Text>
          <Text
            ml={'1/3'}
            color={'yellow.600'}
            fontWeight={'bold'}
            fontSize={'md'}
          >
            ID : {Detail?.detail_doc?.id} ({Detail?.detail_doc?.did})
          </Text>
          <Text
            ml={'1/3'}
            color={'yellow.600'}
            fontWeight={'bold'}
            fontSize={'md'}
          >
            Title : {Detail?.detail_doc['file-name']}
          </Text>
          <Text
            ml={'1/3'}
            color={'yellow.600'}
            fontWeight={'bold'}
            fontSize={'md'}
          >
            Created : {Detail?.detail_doc.date?.toString().split('T')[0]}
          </Text>
          <Text
            ml={10}
            color={'yellow.600'}
            fontWeight={'bold'}
            fontSize={'md'}
          >
            {']'}
          </Text>

          <Pressable
            onPress={async () => {
              next();
              console.log('hello');
              const data = Detail?.detail_actor?.id?.toString();
              const DATA = await get_cgu(data);
              dispatch(setData_cgu(DATA));
            }}
          >
            <Text
              color={'yellow.600'}
              fontWeight={'bold'}
              textAlign={'center'}
              fontSize={'sm'}
              mt={5}
              py={2}
              borderWidth={1}
              borderColor={'yellow.600'}
            >
              {'<< '} Press here to get GCU{' >>'}
            </Text>
          </Pressable>
        </Box>
      </Center>
    </Box>
  );
};

export default PageApproveDoc;
