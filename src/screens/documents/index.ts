import {DocumentInProgressScreen} from './DocumentInProgressScreen';
import {SessionScreen} from './SessionScreen';
import {UploadToBeSignedScreen} from './UploadToBeSignedScreen';

import {ILinearGradientProps} from 'native-base/lib/typescript/components/primitives/Box/types';
import {
  ResponsiveValue,
  ColorType,
} from 'native-base/lib/typescript/components/types';
import {AllDocuments} from './AllDocuments';

type BackGroundColor = ResponsiveValue<
  ColorType | string | ILinearGradientProps
>;
export {
  DocumentInProgressScreen,
  SessionScreen,
  UploadToBeSignedScreen,
  // eslint-disable-next-line no-undef
  BackGroundColor,
  AllDocuments,
};
