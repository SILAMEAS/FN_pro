import {IButtonProps, IRadioValue} from 'native-base';
import {
  ColorType,
  SpaceType,
} from 'native-base/lib/typescript/components/types';
import {RegisterOptions, SubmitHandler, FieldValues} from 'react-hook-form';
import {KeyboardTypeOptions, ColorValue} from 'react-native';
import {IRadioData} from '../my_radio_button';

export interface MyFormProps {
  form: MyFormFromProps;
  input: MyFormInputProps[];
  button: MyFormButtonProps;
}

interface MyFormInputProps {
  isRequired?: boolean;
  label?: string;
  name: string;
  color?: ColorType | undefined;
  type?: 'text' | 'password' | 'file' | 'select' | 'radio' | undefined;
  selectData?: any[]; //this is for type 'select'
  radioData?: IRadioData[]; //this is for type 'radio'
  onSelectChange?: ((itemValue: string) => void) | undefined; //this is for type 'select'
  onFileChange?:
    | ((
        pickerResult: any,
        arrayBuffer: ArrayBuffer | undefined,
        result: string | undefined,
      ) => void)
    | null
    | undefined; //this is for type 'file'
  onRadioChange?:
    | ((itemValue: IRadioValue, data: IRadioData[]) => void)
    | null
    | undefined; //IRadioGroupOnChangeHandler | undefined; //this is for type 'radio'
  keyboardType?: KeyboardTypeOptions | undefined;
  placeholderTextColor?: ColorValue | undefined;
  defaultValue?: string | undefined;
  placeholder?: string | undefined;
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  variant?: 'outline' | 'rounded' | 'underlined' | undefined;
  leftElement?: JSX.Element | undefined;
  rightElement?: JSX.Element | undefined;
  secureTextEntry?: boolean | undefined;
}

interface MyFormFromProps {
  width?: number | string;
  height?: number | string;
  space?:
    | 'gutter'
    | '2xs'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | SpaceType;
}
interface MyFormButtonProps {
  container?: MyFormButtonContainerProps;
  buttons: MyFormButtonButtonsProps[];
}
interface MyFormButtonContainerProps {}
interface MyFormButtonButtonsProps extends IButtonProps {
  text: string;
  type: 'submit' | 'button';

  space?: number | undefined;
  onPress?: (data: SubmitHandler<FieldValues> | any) => void;
}
