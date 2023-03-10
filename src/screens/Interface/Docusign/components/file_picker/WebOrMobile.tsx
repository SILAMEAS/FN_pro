import {Constant_Navigator} from '@src/navigation/Constant_Navigator';
import {Button, View} from 'native-base';
import React, {useState} from 'react';

import {Platform} from 'react-native';
import {FilePickerWeb} from '@screens/Interface/Docusign/components/file_picker/FilePickerWeb';
import {FilePickerMobile} from '@screens/Interface/Docusign/components/file_picker/FilePickerMobile';

interface type {
  navigation?: any;
  goto?: string;
}
const WebOrMobile = ({navigation, goto = Constant_Navigator.API_NG}: type) => {
  const [arrayBuffer, setArrayBuffer] = useState<ArrayBuffer | undefined>();
  const onFileChange = (_: any, arrayBuffer: ArrayBuffer | undefined) => {
    setArrayBuffer(arrayBuffer);
  };
  const uploadFile = async (buffer: ArrayBuffer) => {
    const res = await fetch(
      Constant_Navigator.host_API_NG_ONE + '/api/v1/uploads',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/pdf',
          certignarole: '2',
          certignahash: 'ySsPUR23',
          certignauser: 'pps#test',
          Accept: 'application/json',
          DefaultLanguage: 'fr',
        },
        body: buffer,
      },
    );
    const data = await res.json();
    console.log('data send ---------------------------');
    console.log(data);
  };
  return (
    <>
      <View h={'94%'} w={'100%'}>
        {Platform.OS === 'web' ? (
          <FilePickerWeb onFileChange={onFileChange} />
        ) : (
          <FilePickerMobile onFileChange={onFileChange} />
        )}
        <Button
          onPress={() => {
            arrayBuffer && uploadFile(arrayBuffer);
            navigation.navigate(goto);
          }}
          bg={'blue.800'}
        >
          Submit777
        </Button>
      </View>
    </>
  );
};

export default WebOrMobile;
