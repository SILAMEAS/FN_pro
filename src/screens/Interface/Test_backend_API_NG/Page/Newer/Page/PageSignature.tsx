import React from 'react';

import {Box, Center, Heading, Text} from 'native-base';

import TextLabel from '@screens/Interface/Test_backend_API_NG/Page/Newer/components/textLabel/TextLabel';
import {Constant_Navigator} from '@src/navigation/Constant_Navigator';
import { useAppSelector } from "@src/redux/config/hooks";

function PageSignature() {
  const {Data_signature} = useAppSelector((state) => state.counter);
  console.log('168');
  console.log(Data_signature);
  const Optional=" ... "
  return (
    <Box w={'100%'} h={['100%', `${Constant_Navigator.HeightScreenWeb}`]}>
      <Center>
        <Heading
          color={'yellow.600'}
          fontWeight={'bold'}
          fontSize={'xl'}
          py={5}
        >
          Signature Information
        </Heading>
        <Box
          borderWidth={2}
          borderColor={'yellow.600'}
          rounded={'lg'}
          p={10}
          w={['100%', '50%']}
        >
          <Text color={'yellow.600'} fontWeight={'bold'} fontSize={'md'}>
            *** Detail signature
          </Text>
          <Box ml={10} mt={5}>
            <TextLabel l={'Actor'} v={Data_signature?.signatures?.length ? Data_signature.signatures[0].actor:Optional} />
            <TextLabel l={'Tag'} v={  Data_signature?.signatures?.length? Data_signature?.signatures[0].tag:Optional} />
            <TextLabel
              l={'Document'}

              v={Data_signature?.signatures?.length ? Data_signature.signatures[0].document:Optional}
            />
            <TextLabel l={'ID'} v={Data_signature?.signatures?.length? Data_signature.signatures[0].signatureId:Optional} />
            <TextLabel l={'ThreadId'} v={Data_signature?.threadId ?? Optional} />
            <Text
              color={'yellow.600'}
              fontWeight={'bold'}
              textAlign={'center'}
              mt={5}
            >
              {'<< '}
              Press next to continues step
              {' >>'}
            </Text>
          </Box>
        </Box>
      </Center>
    </Box>
  );
}
export default PageSignature;
