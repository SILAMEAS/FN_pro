import React from 'react';
import {View, Text} from 'native-base';

import {style} from '@styles/style';

import {ViewPdf} from '@src/components/templates/pdf';
import {Pressable} from 'react-native';
import {Layout} from '@src/components/layout';
import {NavigatorRoute, useNavigation} from '@src/navigation';

export function HomeScreen() {
  const navigation = useNavigation();
  return (
    <Layout navigation={navigation}>
      <View style={style.container}>
        <ViewPdf />
        <Pressable
          onPress={() => navigation.navigate(NavigatorRoute.SAMPLE_UI.LANDING)}
        >
          <Text>Go to Sample UI</Text>
        </Pressable>
      </View>
    </Layout>
  );
}
