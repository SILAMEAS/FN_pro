import React from 'react';
import {
  Box,
  Button,
  Center,
  Heading,
  Spinner,
  Text,
  useToast,
} from 'native-base';


import {Generate_certificate} from '@screens/Interface/Test_backend_API_NG/service/certificate';
import {
  setData_certificate,
  setData_signature,
} from '@src/redux/counter/CounterSlice';
import {sign_with_server} from '@screens/Interface/Test_backend_API_NG/service/signature';
import {useSlide} from '@screens/Interface/Test_backend_API_NG/Page/Newer/components/cheaNit_picker_file/slide';
import {Constant_Navigator} from '@src/navigation/Constant_Navigator';
import { useAppDispatch, useAppSelector } from "@src/redux/config/hooks";

function PageCGU() {
  const {next} = useSlide();
  const {Data_cgu, ForSign} = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [spinner, setSpinner] = React.useState(false);
  console.log('000');
  console.log(Data_cgu);
  return (
    <Box
      w={['100%', '50%']}
      h={['100%', `${Constant_Navigator.HeightScreenWeb}`]}
    >
      <Center h={'100%'} w={'100%'}>
        <Heading color={'yellow.600'} textAlign={'center'} pb={10}>
          CGU information
        </Heading>
        <Box
          borderColor={'yellow.600'}
          borderWidth={2}
          py={5}
          px={10}
          rounded={'lg'}
          w={'90%'}
        >
          <Text color={'yellow.600'} fontWeight={'bold'} fontSize={'md'}>
            * Authority
          </Text>
          <Text
            ml={'1/3'}
            color={'yellow.600'}
            fontWeight={'bold'}
            fontSize={'md'}
            borderBottomWidth={1}
            borderColor={'yellow.600'}
            pb={2}
            my={5}
          >
            {Data_cgu.authority}
          </Text>
          <Text color={'yellow.600'} fontWeight={'bold'} fontSize={'md'}>
            * Url download
          </Text>
          <Text
            ml={'1/3'}
            color={'yellow.600'}
            fontWeight={'bold'}
            fontSize={'md'}
            borderBottomWidth={1}
            borderColor={'yellow.600'}
            pb={2}
            my={5}
          >
            {Data_cgu['download-url']}
          </Text>
          <Text color={'yellow.600'} fontWeight={'bold'} fontSize={'md'}>
            * Token
          </Text>
          <Text
            ml={'1/3'}
            color={'yellow.600'}
            fontWeight={'bold'}
            fontSize={'md'}
            borderBottomWidth={1}
            borderColor={'yellow.600'}
            pb={2}
            my={5}
          >
            {Data_cgu?.token?.slice(0, 3)} {'...............................'}
          </Text>
          <Text color={'yellow.600'} fontWeight={'bold'} fontSize={'md'}>
            Version {Data_cgu.version}
          </Text>
        </Box>
        <Button
          bg={'black'}
          mt={10}
          borderColor={'yellow.600'}
          borderWidth={2}
          onPress={async () => {
            toast.show({
              title: 'Certificate generating ...',
              bg: 'blue.700',
            });

            setSpinner(true);
            const data = await Generate_certificate(
              Data_cgu.actor.split('/')[4],
              Data_cgu,
            );
            dispatch(setData_certificate(data));
            if (data) {
              console.log('------------');
              console.log(data);
              setSpinner(false);
              next();
            }
          }}
        >
          <Text color={'yellow.600'} fontWeight={'bold'} fontSize={'md'}>
            Generate Certificate
          </Text>
        </Button>

        <Button
          bg={'black'}
          mt={10}
          borderColor={'yellow.600'}
          borderWidth={2}
          onPress={async () => {
            setSpinner(true);
            const {Actor, Document} = ForSign;
            const mode = 'server';
            const data = await sign_with_server({Actor, Document, mode});
            dispatch(setData_signature(data));

            if (data.actor !== '') {
              setSpinner(false);
            }
            next();
            next();
          }}
        >
          <Text color={'yellow.600'} fontWeight={'bold'} fontSize={'md'}>
            Sign document with server
          </Text>
        </Button>
        {spinner && (
          <Spinner
            accessibilityLabel="Loading posts"
            color={'yellow.600'}
            mt={2}
          />
        )}
      </Center>
    </Box>
  );
}

export default PageCGU;
