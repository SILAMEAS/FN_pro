import {Constant_Navigator} from '@src/navigation/Constant_Navigator';
import {Box, Button, Center, Text, useToast, View} from 'native-base';
import React, {useState} from 'react';

import {Platform} from 'react-native';
import {FilePickerMobile, FilePickerWeb} from './file_picker';
import {ProgressBar} from '@screens/Interface/Test_backend_API_NG/Page/Newer/components/cheaNit_picker_file/progress_bar';
import axios from 'axios';
import {MyToast} from '@screens/Interface/Test_backend_API_NG/Page/Newer/components/cheaNit_picker_file/my_toast';
interface type {
  navigation?: any;
  goto?: string;
}
const WebOrMobiles = ({navigation, goto = Constant_Navigator.API_NG}: type) => {
  const toast = useToast();
  const [arrayBuffer, setArrayBuffer] = useState<ArrayBuffer | undefined>();
  const onFileChange = (_: any, arrayBuffer: ArrayBuffer | undefined) => {
    setArrayBuffer(arrayBuffer);
  };
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);
  const uploadFile = async (buffer: ArrayBuffer) => {
    alert('xxx');
    const url = Constant_Navigator.host_API_NG_ONE + '/api/v1/uploads';
    const data = await axios.post(url, buffer, {
      headers: {
        'content-type': 'application/pdf',
        certignarole: '2',
        certignahash: 'ySsPUR23',
        certignauser: 'pps#test',
        Accept: 'application/json',
        DefaultLanguage: 'fr',
      },
      onUploadProgress: progressEvent => {
        let {loaded, total} = progressEvent;
        let percent = Math.floor((loaded * 100) / (total ?? 0));
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        setUploadPercentage(percent);
      },
    });
    data &&
      toast.show({
        bg: 'blue.700',
        render: ({id}: {id: number}) => {
          return (
            <MyToast
              id={id}
              variant={'solid'}
              status={'primary'}
              title="success to upload file"
              isClosable
            />
          );
        },
      });
    setTimeout(() => {
      toast.closeAll();
    }, 700);
    navigation.navigate(goto);
  };

  return (
    <>
      <View
        h={['100%', '100vh']}
        w={'100%'}
        bg={'black'}
        py={10}
        _web={{pb: '90'}}
      >
        {Platform.OS === 'web' ? (
          <FilePickerWeb onFileChange={onFileChange} />
        ) : (
          <FilePickerMobile onFileChange={onFileChange} />
        )}
        <Box position={'absolute'} w={'100%'} top={'100%'} ml={'5%'}>
          {uploadPercentage > 0 && (
            <ProgressBar
              height={10}
              step={uploadPercentage as any}
              color={'yellow'}
              width={'90%'}
              steps={100}
              duration={12}
            />
          )}
        </Box>
        <Center bg={'black'}>
          <Button
            textAlign={'center'}
            onPress={() => {
              arrayBuffer && uploadFile(arrayBuffer);
            }}
            bg={'black'}
            w={['100%', '10%']}
            borderWidth={1}
            borderColor={'yellow.600'}
          >
            <Text
              color={'yellow.600'}
              fontWeight={'bold'}
              fontSize={'xl'}
              w={'100%'}
            >
              Submit
            </Text>
          </Button>
        </Center>
      </View>
    </>
  );
};

export default WebOrMobiles;
