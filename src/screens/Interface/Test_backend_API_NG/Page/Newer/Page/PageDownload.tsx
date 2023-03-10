import React, {useState} from 'react';
import {Box, Button, Center, Heading, Text, VStack} from 'native-base';


import {
  Download_pdf,
  Download_pdf_manifest,
} from '@screens/Interface/Test_backend_API_NG/service/document/download/before_close_session';
import {setSourcePDF} from '@src/redux/counter/CounterSlice';
import {useSlide} from '@screens/Interface/Test_backend_API_NG/Page/Newer/components/cheaNit_picker_file/slide';
import {Loading} from '@screens/Interface/Test_backend_API_NG/Page/Newer/components/cheaNit_picker_file/loading';
import {Constant_Navigator} from '@src/navigation/Constant_Navigator';
import { useAppDispatch, useAppSelector } from "@src/redux/config/hooks";

function PageDownload() {
  const {next} = useSlide();
  const {ForSign} = useAppSelector((state) => state.counter);

  const [Loading_, setLoading_] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <Box
      opacity={Loading_ ? 0.5 : 1}
      h={['100%', `${Constant_Navigator.HeightScreenWeb}`]}
      w={['100%', '50%']}
    >
      <Heading color={'yellow.600'} textAlign={'center'}>
        Page Download
      </Heading>
      <Center h={['80%', '80vh']}>
        <Box
          borderColor={'yellow.600'}
          borderWidth={2}
          mt={5}
          p={10}
          rounded={'lg'}
          w={['100%', '50%']}
          h={['60%', '30vh']}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <VStack space={5}>
            <Button
              bg={'black'}
              borderWidth={1}
              px={10}
              borderColor={'yellow.600'}
              onPress={async () => {
                const data = await Download_pdf(ForSign);
                setLoading_(true);
                if (data) {
                  dispatch(setSourcePDF(data));
                  next();
                  setLoading_(false);
                }
              }}
            >
              <Text color={'yellow.600'}> Download document</Text>
            </Button>

            <Button
              bg={'black'}
              borderWidth={1}
              borderColor={'yellow.600'}
              onPress={async () => {
                setLoading_(true);
                const data = await Download_pdf_manifest(ForSign);
                if (data) {
                  dispatch(setSourcePDF(data));
                  next();
                  setLoading_(false);
                }
              }}
            >
              <Text color={'yellow.600'}> Download manifest</Text>
            </Button>
          </VStack>
        </Box>
      </Center>
      {Loading_ && (
        <Loading
          heading={{right: true, text: 'Downloading'}}
          containerStyle={{
            space: 1,
            position: 'absolute',
            left: ['32%', '45%'],
            top: '85%',
          }}
        />
      )}
    </Box>
  );
}

export default PageDownload;
