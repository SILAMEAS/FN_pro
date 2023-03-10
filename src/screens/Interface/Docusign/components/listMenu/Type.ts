import {ReactNode} from 'react';
import {ICenterProps, ITextProps} from 'native-base';

export interface type {
  icon?: ReactNode;
  title?: ReactNode;
  iconRight?: ReactNode;
  prop?: ICenterProps;
}
export interface typeRecipienst {
  title?: string | ReactNode;
  des?: string | ReactNode;
  subDes?: string | ReactNode;
  borderB?: boolean;
  propDes?: ITextProps;
  propSubDes?: ITextProps;
}
