import {Box, Center, CheckIcon, HStack, Slide, Text} from 'native-base';
import React, {ReactNode} from 'react';

type Props = {
  isOpen: boolean;
  text: string;
  bg?: string;
  ColorText?: string;
  icon?: ReactNode;
};

const Notification = ({
  isOpen,
  text,
  bg = 'emerald.100',
  icon,
  ColorText = 'white',
}: Props) => {
  return (
    <Slide in={isOpen} placement="top">
      <Box
        w="100%"
        position="absolute"
        p="8"
        borderRadius="xs"
        bg={bg}
        alignItems="center"
        justifyContent="center"
        _dark={{
          bg: 'emerald.200',
        }}
        safeArea
      >
        <HStack
          space={2}
          borderWidth={1}
          borderColor={'yellow.600'}
          p={2}
          rounded={'lg'}
        >
          <Center>
            <HStack space={2} alignItems={'center'}>
              {icon ? (
                icon
              ) : (
                <CheckIcon
                  size="4"
                  color={ColorText}
                  mt="1"
                  _dark={{
                    color: 'emerald.700',
                  }}
                />
              )}

              <Text
                color={ColorText}
                mt={0}
                textAlign="center"
                _dark={{
                  color: 'emerald.700',
                }}
                fontWeight="medium"
              >
                {text}
              </Text>
            </HStack>
          </Center>
        </HStack>
      </Box>
    </Slide>
  );
};

export default Notification;
