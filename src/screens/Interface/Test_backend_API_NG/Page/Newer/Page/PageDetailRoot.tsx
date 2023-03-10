import {Constant_Navigator} from '@src/navigation/Constant_Navigator';
import {Box, ChevronLeftIcon, ChevronRightIcon, Text} from 'native-base';
import React from 'react';

import {Slide, SlideProvider} from '../components/cheaNit_picker_file/slide';
import PageApproveDoc from './PageApproveDoc';
import PageScenario from './PageScenario';
import PageSessionDetail from './PageSessioniInfo';
import PageCGU from '@screens/Interface/Test_backend_API_NG/Page/Newer/Page/PageCGU';
import PageGenerateCertificate from '@screens/Interface/Test_backend_API_NG/Page/Newer/Page/PageGenerateCertificate';
import PageSignature from '@screens/Interface/Test_backend_API_NG/Page/Newer/Page/PageSignature';
import PageDownload from '@screens/Interface/Test_backend_API_NG/Page/Newer/Page/PageDownload';
import PageViewPdf from '@screens/Interface/Test_backend_API_NG/Page/Newer/Page/PageViewPDF';
import {setForSign} from '@src/redux/counter/CounterSlice';
import {useAppDispatch, useAppSelector} from '@src/redux/config/hooks';

const PageDetail = ({navigation}: any) => {
  const {ForSign} = useAppSelector(state => state.counter);
  console.log(
    '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
  );
  console.log(ForSign);
  const dispatch = useAppDispatch();
  return (
    <Box
      h={'100%'}
      w={'100%'}
      bg={'black'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <SlideProvider
        initialSlide={{index: 0, isFirst: false, isLast: false, totalSteps: 8}}
      >
        <Slide
          width={'100%'}
          slideContent={[
            {
              stepName: '',
              child: <PageSessionDetail />,
            },
            {
              stepName: '',
              child: <PageScenario />,
            },
            {
              stepName: '',
              child: <PageApproveDoc />,
            },
            {
              stepName: '',
              child: <PageCGU />,
            },
            {
              stepName: '',
              child: <PageGenerateCertificate />,
            },
            {
              stepName: '',
              child: <PageSignature />,
            },
            {
              stepName: '',
              child: <PageDownload />,
            },
            {
              stepName: '',
              child: <PageViewPdf />,
            },
          ]}
          button={{
            rightButton: {
              width: '20%',
              text: (
                <Text color={'yellow.600'} fontWeight={'bold'} fontSize={'xl'}>
                  Next
                </Text>
              ),
              bg: 'black',

              rightIcon: <ChevronRightIcon color={'yellow.600'} />,
            },
            leftButton: {
              width: '20%',
              text: (
                <Text color={'yellow.600'} fontWeight={'bold'} fontSize={'xl'}>
                  Back
                </Text>
              ),
              bg: 'black',

              leftIcon: (
                <ChevronLeftIcon color={'yellow.600'} fontSize={'lg'} />
              ),
            },
            lastStepButton: {
              width: '20%',
              text: (
                <Text color={'yellow.600'} fontWeight={'bold'} fontSize={'xl'}>
                  Done
                </Text>
              ),

              bg: 'black',
            },
          }}
          onNext={a => {
            if (a?.index === 4) {
              console.log('on Next 04', a);
            }
          }}
          onBack={a => {
            if (a?.index === 0) {
              navigation.navigate(Constant_Navigator.NewP_Session);
            }
          }}
          onDone={() => {
            navigation.navigate(Constant_Navigator.NewP_Session);
            dispatch(
              setForSign({
                IdSession: '',
                Document: '',
                Actor: '',
                Certificate: '',
              }),
            );
          }}
        />
      </SlideProvider>
    </Box>
  );
};

export default PageDetail;
