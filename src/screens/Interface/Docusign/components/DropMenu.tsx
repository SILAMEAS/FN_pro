import React, {ReactNode} from 'react';
import {Menu, HamburgerIcon, Box, Pressable, Center} from 'native-base';
interface Type {
  ListData?: ReactNode;
  icon?: ReactNode;
}
export const DropMenu = ({
  ListData = (
    <>
      <Menu.Item>Generate</Menu.Item>
      <Menu.Item>Server</Menu.Item>
    </>
  ),
  icon = <HamburgerIcon size={'lg'} />,
}: Type) => {
  return (
    <Center px="3" h={'100%'}>
      <Box h="70%" w="90%" alignItems="center">
        <Menu
          shadow={2}
          w="120"
          trigger={triggerProps => {
            return (
              <Pressable
                accessibilityLabel="More options menu"
                {...triggerProps}
              >
                {icon}
              </Pressable>
            );
          }}
        >
          {ListData}
        </Menu>
      </Box>
    </Center>
  );
};
