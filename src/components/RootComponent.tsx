import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {DrawerNavigator, RootNavigator} from './../navigation/RootNavigator';
import {linking} from '@src/navigation/linkConfigure';
import {Constant_Navigator} from '@src/navigation/Constant_Navigator';
export default function Root() {
  // check it UI test api or UI docusign

  return (
    <NavigationContainer linking={linking as any}>
      {Constant_Navigator.IsDRAWER ? <DrawerNavigator /> : <RootNavigator />}
    </NavigationContainer>
  );
}
