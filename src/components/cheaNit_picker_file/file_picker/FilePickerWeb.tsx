// import {ViewPdf} from '@src/components/templates/pdf';
// import {Localization} from '@src/i18n/languages';
import View_PDF from '@src/screens/Pdf/View_PDF';
import {encode} from '@src/utils/base64_arraybuffer';
// import {$ok} from '@src/utils/commons';
import {Box, Button, Image, Text, View} from 'native-base';
import React, {ChangeEvent, useRef, useState} from 'react';
// import {useTranslation} from 'react-i18next';
import {FilePickerWebProps} from '.';
// import {LoadingButton} from '../loading_btn';
// import {base64} from 'rfc4648';

export const FilePickerWeb = ({onFileChange}: FilePickerWebProps) => {
  // const {t} = useTranslation();

  const fileRef = useRef<HTMLInputElement>(null);
  const [strBase64, setStrBase64] = useState<string | undefined>();
  const [typeFile, setTypeFile] = useState('');
  const chooseFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file =
        e.target.files && (e.target.files?.length ?? 0) > 0
          ? e.target.files![0]
          : null;
      let buffer = await file?.arrayBuffer();

      buffer = buffer ? new Uint8Array(buffer!) : undefined;

      const strBase64 = buffer ? encode(buffer!) : undefined;
      // console.log('----------buffer---------------');
      // console.log(buffer);
      // console.log('---------------------------------');
      setStrBase64(strBase64);

      setTypeFile(file?.type ?? '');
      onFileChange!(file, buffer, strBase64);
    } catch (err) {
      console.log(err);
      // handleError(e);
    }
  };

  return (
    <View
      display={'flex'}
      flexDir={'column'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={'100%'}
      height={'100%'}
      mx={'auto'}
      bg={'black'}
    >
      {strBase64 ? (
        typeFile.startsWith('image') ? (
          <Image
            width={['90%', '50%']}
            height={'100%'}
            borderRadius={10}
            source={{
              uri: `data:${typeFile};base64,${strBase64}`,
            }}
            alt="Hello"
          />
        ) : (
          <View width={'100%'} height={'90%'} overflowY={'scroll'}>
            <View_PDF data={`data:${typeFile};base64,${strBase64}`} />
          </View>
        )
      ) : (
        <Image
          borderRadius={10}
          width={['90%', '50%']}
          height={'85%'}
          source={require('@src/assets/images/empty_doc_no.jpg')}
          alt="Hello"
        />
      )}
      <Box height={4} />
      <input
        ref={fileRef}
        type="file"
        hidden
        accept="*"
        onChange={e => {
          const length = e.target.files?.length ?? 0;
          if (length <= 0) {
            return;
          }
          chooseFile(e);
        }}
      />
      <Button
        onPress={() => {
          fileRef.current?.click();
        }}
        bgColor={'black'}
        borderColor={'yellow.600'}
        borderWidth={2}
        isLoading={false}
        px={5}
      >
        <Text color={'yellow.600'}> Upload file</Text>
      </Button>
      <Box height={2} />
      {/* <MyText>{JSON.stringify(buffer, undefined, 2)}</MyText> */}
    </View>
  );
};
