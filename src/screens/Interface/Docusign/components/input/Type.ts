import React from 'react';
import {IInputProps} from 'native-base/lib/typescript/components/primitives/Input/types';
import {ColorType} from 'native-base/lib/typescript/components/types';

export interface TypeInput {
  value: undefined | string | number;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  prop?: IInputProps;
  propFocus?: IInputProps;
  placeholder: {text: string; color?: ColorType};
  iconRight?: JSX.Element | JSX.Element[] | undefined;
  iconLeft?: JSX.Element | JSX.Element[] | undefined;
}
