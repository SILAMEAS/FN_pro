import React, {useState} from 'react';
import {
  Box,
  Text,
  Center,
  Heading,
  Button,
  useToast,
  Spinner,
} from 'native-base';

import {sign_with_certificate} from '@screens/Interface/Test_backend_API_NG/service/signature';
import {setData_signature} from '@src/redux/counter/CounterSlice';
import {Constant_Navigator} from '@src/navigation/Constant_Navigator';
import {useAppDispatch, useAppSelector} from '@src/redux/config/hooks';
import {useSlide} from '@screens/Interface/Test_backend_API_NG/Page/Newer/components/cheaNit_picker_file/slide';

function PageGenerateCertificate() {
  const {Data_certificate, ForSign} = useAppSelector(state => state.counter);
  const {next} = useSlide();
  const {Actor, Document} = ForSign;
  const Url = Data_certificate.url;
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [spinner, setSpinner] = useState(false);
  return (
    <Box w={'100%'} h={['100%', `${Constant_Navigator.HeightScreenWeb}`]}>
      <Center>
        <Heading
          color={'yellow.600'}
          fontWeight={'bold'}
          fontSize={'xl'}
          py={5}
        >
          Certificate Info
        </Heading>

        <Box
          borderWidth={2}
          borderColor={'yellow.600'}
          rounded={'lg'}
          p={10}
          w={['100%', '50%']}
        >
          <Text color={'yellow.600'} fontWeight={'bold'} fontSize={'md'}>
            * Date
          </Text>
          <Text
            color={'yellow.600'}
            fontWeight={'bold'}
            fontSize={'md'}
            ml={10}
            mb={5}
          >
            {Data_certificate.date}
          </Text>
          <Text color={'yellow.600'} fontWeight={'bold'} fontSize={'md'}>
            * URl
          </Text>
          <Text
            color={'yellow.600'}
            fontWeight={'bold'}
            fontSize={'md'}
            ml={10}
            mb={5}
          >
            {Data_certificate.url}
          </Text>
          <Text color={'yellow.600'} fontWeight={'bold'} fontSize={'md'}>
            * Expires
          </Text>
          <Text
            color={'yellow.600'}
            fontWeight={'bold'}
            fontSize={'md'}
            ml={10}
            mb={5}
          >
            {Data_certificate.expires}
          </Text>
        </Box>
        <Button
          bg={'black'}
          borderWidth={2}
          borderColor={'yellow.600'}
          mt={10}
          onPress={async () => {
            toast.show({
              title: 'Sign Document processing',
            });
            const data = await sign_with_certificate({Actor, Document, Url});
            dispatch(setData_signature(data));
            setSpinner(true);
            if (data) {
              next();
              setSpinner(false);
            }
          }}
        >
          <Text color={'yellow.600'} fontWeight={'bold'} fontSize={'md'}>
            Sign Document with generate certificate
          </Text>
        </Button>
        {spinner && (
          <Spinner
            position={'absolute'}
            top={50}
            left={35}
            accessibilityLabel="Loading posts"
            color={'yellow.600'}
            mt={2}
          />
        )}
      </Center>
    </Box>
  );
}

export default PageGenerateCertificate;
