// import {ViewPdf} from '@src/components/templates/pdf';
// import {$ok} from '@src/utils/commons';
import {Box, Button, HStack, Image, Text, View} from 'native-base';
import React, {useState} from 'react';
import {Platform} from 'react-native';
import {FilePickerMobileProps} from '.';
import {decode} from '@src/utils/base64_arraybuffer';
import View_PDF from '@src/screens/Pdf/View_PDF';

export const FilePickerMobile = ({onFileChange}: FilePickerMobileProps) => {
  if (Platform.OS === 'web') {
    return <></>;
  }
  const RNFetchBlob = require('react-native-blob-util').default;
  const DocumentPicker = require('react-native-document-picker');
  // const {t} = useTranslation();

  const [strBase64, setStrBase64] = useState<string | undefined>();
  const [typeFile, setTypeFile] = useState('');
  const chooseFile = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: [DocumentPicker.types.allFiles],
      });
      const path = await normalizePath(pickerResult.fileCopyUri ?? '');
      const result = await RNFetchBlob.fs.readFile(path, 'base64');
      const arrayBuffer = decode(result);
      setStrBase64(result);
      setTypeFile(pickerResult.type ?? '');
      onFileChange && onFileChange!(pickerResult, arrayBuffer, result);
    } catch (e) {
      handleError(e);
    }
  };

  const normalizePath = async (path: string) => {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      const filePrefix = 'file://';
      if (path.startsWith(filePrefix)) {
        path = path.substring(filePrefix.length);
        try {
          path = decodeURI(path);
        } catch (error) {}
      }
    }
    return path;
  };

  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (DocumentPicker.isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  return (
    <View
      display={'flex'}
      flexDir={'column'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={['100%', '100vh']}
      height={'100%'}
      bg={'black'}
    >
      {strBase64 ? (
        typeFile.startsWith('image') ? (
          <Image
            width={'80%'}
            height={'85%'}
            borderRadius={10}
            source={{
              uri: `data:${typeFile};base64,${strBase64}`,
            }}
            alt="Hello"
          />
        ) : (
          <View width={'90%'} height={'85%'}>
            <View_PDF data={`data:${typeFile};base64,${strBase64}`} />
          </View>
        )
      ) : (
        <Image
          borderRadius={10}
          mt={20}
          width={'80%'}
          height={'45%'}
          source={require('@src/assets/images/empty_doc_no.jpg')}
          alt="Hello"
        />
      )}
      <Box height={4} />
      <HStack space={10}>
        <Button
          lineHeight={8}
          fontSize={'sm'}
          p={2}
          height={9}
          onPress={chooseFile}
          isLoading={false}
          w={'40%'}
          bg={'black'}
          borderWidth={1}
          borderColor={'yellow.600'}
        >
          <Text color={'yellow.600'}>Upload file</Text>
        </Button>
      </HStack>
      <Box height={4} />
    </View>
  );
};
