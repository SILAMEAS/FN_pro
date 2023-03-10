import {IButtonProps} from 'native-base';
import {ColorValue} from 'react-native';
import {FontSize, Type, TypeMap} from '../my_text/type';
import {ReactNode} from 'react';

export interface LoadingButtonProps extends IButtonProps {
  type?: Type;
  spinnerIconColor?: ColorValue;
  text?: string | ReactNode;
  isLoading?: boolean;
  fontSize?: FontSize;
  spinnerSize?: 'sm' | 'lg';
}
export declare type Variant =
  | 'link'
  | 'subtle'
  | 'solid'
  | 'ghost'
  | 'outline'
  | 'unstyled';
export const spinnerIconColorMap: TypeMap = {
  primary: '#ecfeff',
  secondary: '#ecfeff',
  danger: '#ecfeff',
  success: '#ecfeff',
  warning: '#ecfeff',
  info: '#ecfeff',
  dark: 'black',
  white: 'black',
};
