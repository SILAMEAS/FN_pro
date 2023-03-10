import React from 'react';
import {Box, Center, Heading} from 'native-base';
import Mobile_pdf from '@components/compoents(ms)/moblie_componens/Moblie_pdf';

import {Loading} from '@screens/Interface/Test_backend_API_NG/Page/Newer/components/cheaNit_picker_file/loading';
import {Constant_Navigator} from '@src/navigation/Constant_Navigator';
import { useAppSelector } from "@src/redux/config/hooks";

function PageViewPdf() {
  const {SourcePDF} = useAppSelector((state) => state.counter);
  return (
    <Box
      h={['100%', `${Constant_Navigator.HeightScreenWeb}`]}
      w={'100%'}
      bg={'black'}
      mb={20}
    >
      <Center h={'90%'}>
        <Heading
          color={'yellow.600'}
          textAlign={'center'}
          fontSize={'lg'}
          fontWeight={'bold'}
        >
          Document{' '}
        </Heading>
        <Box
          borderColor={'yellow.600'}
          borderLeftWidth={2}
          borderRightWidth={3}
          rounded={'lg'}
          mt={3}
          w={'95%'}
          h={'90%'}
        >
          {SourcePDF ? (
            <Mobile_pdf data={SourcePDF} />
          ) : (
            <Loading
              heading={{right: true, text: 'Loading Data'}}
              containerStyle={{
                space: 1,
                position: 'absolute',
                left: ['32%', '40%'],
                top: '50%',
              }}
            />
          )}
        </Box>
      </Center>
    </Box>
  );
}

export default PageViewPdf;
