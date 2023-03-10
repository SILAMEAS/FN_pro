import {MyText} from '@src/components/commons/my_text';
import {Pagination} from '@src/components/commons/pagination';
import {Layout} from '@src/components/layout';
import {API_URL} from '@src/config/env';
import {useNavigation} from '@src/navigation';

import {View} from 'native-base';
import React from 'react';

export const UploadToBeSignedScreen = () => {
  const navigation = useNavigation();
  return (
    <Layout navigation={navigation}>
      <View height={'100%'} width={'100%'} backgroundColor={'black'}>
        <View height={'100%'} width={'100%'}>
          {/* <MyText>UploadToBeSignedScreen</MyText> */}
          <Pagination
            baseUrl={API_URL ?? 'http://10.2.50.26:8080'}
            prefixUrl="/api/v1/uploads"
            queryString={{pageSize: 10}}
            render={(item: string) => (
              <View background={'gray.800'} p={3} my={2} borderRadius={10}>
                <MyText type="white">{item}</MyText>
              </View>
            )}
            header={{DefaultLanguage: 'fr', Accept: 'application/json'}}
            position="bottom"
          />
        </View>
      </View>
    </Layout>
  );
};
