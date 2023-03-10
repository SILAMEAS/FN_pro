import React from 'react';
import {
  Box,
  Center,
  ChevronRightIcon,
  Divider,
  HStack,
  Text,
  VStack,
} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {COLOR} from '@screens/Interface/Docusign/color/Color';
import {
  type,
  typeRecipienst,
} from '@screens/Interface/Docusign/components/listMenu/Type';

export function ListMenu({
  icon = <FontAwesomeIcon icon={faUserPlus} color={'gray'} size={24} />,
  title = <Text {...COLOR.Text.textRedirect}>Create/Edit your profile</Text>,
  iconRight = <ChevronRightIcon />,
  prop,
}: type) {
  return (
    <>
      <Center
        justifyContent={'space-between'}
        alignItems={'center'}
        display={'flex'}
        flexDir={'row'}
        py={3}
        px={2}
        {...prop}
      >
        <HStack space={5} alignItems={'center'}>
          {icon}
          {title}
        </HStack>
        {iconRight}
      </Center>

      <Divider />
    </>
  );
}
export function ListMenuInStagger({
  icon = <FontAwesomeIcon icon={faUserPlus} color={'gray'} size={24} />,
  title = <Text {...COLOR.Text.textRedirect}>Sign Document</Text>,
}: type) {
  return (
    <>
      <HStack justifyContent={'space-between'} alignItems={'center'} space={3}>
        {icon}
        {title}
      </HStack>
    </>
  );
}
export function ListMenuRecipients({
  des,
  subDes = 'active scenario',
  propDes,
  propSubDes,
  borderB = false,
}: typeRecipienst) {
  return (
    <>
      <VStack space={2}>
        <Box bg={'white'}>
          <VStack>
            {typeof des === 'object' ? (
              des
            ) : typeof des === 'string' ? (
              <Text color={'gray.900'} fontWeight={'semibold'} {...propDes}>
                {des}
              </Text>
            ) : (
              <></>
            )}
            {typeof subDes === 'object' ? (
              subDes
            ) : (
              <Text fontSize={'sm'} {...propSubDes}>
                {subDes}
              </Text>
            )}

            {borderB && <Divider mt={2} />}
          </VStack>
        </Box>
      </VStack>
    </>
  );
}
