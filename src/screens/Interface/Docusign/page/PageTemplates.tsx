import React from 'react';
import {Box, Text} from 'native-base';
import {Layout} from '@components/layout';
import {COLOR} from '@src/screens/Interface/Docusign/color/Color';

function PageTemplates({navigation}: any) {
  return (
    <Layout navigation={navigation}>
      <Box safeArea w={'100%'} h={'100%'} bg={COLOR.BackGroundDocuSign}>
        <Box>
          <Text>Hello Templates</Text>
        </Box>
      </Box>
    </Layout>
  );
}

export default PageTemplates;
