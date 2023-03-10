import WebOrMobiles from '@components/cheaNit_picker_file/WebOrMobiles';
import {Constant_Navigator} from '@src/navigation/Constant_Navigator';

import React from 'react';

const PageUpload = ({navigation}: any) => {
  return (
    <WebOrMobiles
      navigation={navigation}
      goto={Constant_Navigator.NewP_Session}
    />
  );
};

export default PageUpload;
