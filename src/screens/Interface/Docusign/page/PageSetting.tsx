import * as React from 'react';
import {Text} from 'react-native';

import {Layout} from '@components/layout';
import {COLOR} from '@src/screens/Interface/Docusign/color/Color';

import {Box} from 'native-base';

const PageSetting = ({navigation}: any) => {
  return (
    <Layout navigation={navigation}>
      <Box safeArea w={'100%'} h={'90%'} bg={COLOR.BackGroundDocuSign}>
        <Text>hello setting</Text>
      </Box>
    </Layout>
  );
};

export default PageSetting;
