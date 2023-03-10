import React from 'react';
import {Box, HStack, Text, VStack} from 'native-base';
import {faDeleteLeft, faFilePdf} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {COLOR} from '@screens/Interface/Docusign/color/Color';
interface Type {
  fileName: string;
  title: string;
  url: string;
}
function CardDocument({fileName, title = 'unknown', url = 'unknown'}: Type) {
  return (
    <Box
      bg={'white'}
      w={'100%'}
      mt={2}
      p={2}
      borderColor={'gray.200'}
      borderWidth={1}
      rounded={'sm'}
    >
      <HStack alignItems={'center'}>
        <HStack space={5} alignItems={'center'}>
          <FontAwesomeIcon icon={faFilePdf} size={32} color={'#B40404'} />
          <VStack w={'60%'}>
            <Text
              numberOfLines={1}
              {...COLOR.Text.textRedirect}
              color={'gray.700'}
              fontWeight={'bold'}
            >
              {fileName}
            </Text>
            <Text
              {...COLOR.Text.textRedirect}
              color={'gray.500'}
              fontSize={'sm'}
            >
              {title}
            </Text>

            <HStack>
              <Text color={'blue.100'}>
                url {'<' + url.split('/').slice(4).join('/') + '>'}
              </Text>
            </HStack>
          </VStack>
        </HStack>
        <FontAwesomeIcon icon={faDeleteLeft} size={26} color={'#DE0001'} />
      </HStack>
    </Box>
  );
}

export default CardDocument;
