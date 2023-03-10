import {IViewProps} from 'native-base/lib/typescript/components/basic/View/types';
import {IInputProps} from 'native-base/lib/typescript/components/primitives/Input/types';
// import {ColorType} from 'native-base/lib/typescript/components/types';

export interface MyInputFieldProps extends IInputProps {
  _webContainer?: Partial<IViewProps> | undefined;
  // containerBorderColor?: ColorType;
  // containerWidth?: number | string;
}
