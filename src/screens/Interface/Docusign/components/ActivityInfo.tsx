import React, {ReactNode} from 'react';
import {Box, HStack, IBoxProps, Text, VStack, WarningIcon} from 'native-base';
import {COLOR} from '@screens/Interface/Docusign/color/Color';
interface type {
  icon?: ReactNode;
  title?: ReactNode;
  meaning?: ReactNode;
  footer?: ReactNode;
  spacing_y?: number;
  spaceIconTitle?: number;
  prop?: IBoxProps;
}
function ActivityInfo({
  icon = <WarningIcon size={'lg'} color={'blue.600'} />,
  title = (
    <Text {...COLOR.Text.titleActivityInfo_Info}>
      Complete with DocuSign: pfd1.pdf
    </Text>
  ),
  meaning = (
    <>
      <Text color={'gray.500'} fontWeight={'semibold'}>
        Form: meas sila
      </Text>
      <Text color={'gray.500'} fontWeight={'semibold'}>
        Needs to sign
      </Text>
    </>
  ),
  footer = (
    <Text color={'gray.500'} alignSelf={'flex-end'} fontWeight={'semibold'}>
      Yesterday
    </Text>
  ),
  spacing_y = 2,
  spaceIconTitle = 0,
  prop,
}: type) {
  return (
    <Box py={1} {...prop}>
      <HStack alignItems={'flex-start'} justifyContent={'space-between'}>
        {/*<WarningIcon size={'lg'} color={'blue.600'} />*/}
        {icon}

        <VStack space={spacing_y} ml={spaceIconTitle} w={'70%'}>
          {title}
          {meaning}
        </VStack>

        {footer}
      </HStack>
    </Box>
  );
}

export default ActivityInfo;
