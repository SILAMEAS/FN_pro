import {TypeInput} from '@screens/Interface/Docusign/components/input/Type';
import {Input} from 'native-base';
import React from 'react';
import {COLOR} from '@screens/Interface/Docusign/color/Color';
import {ColorValue} from 'react-native';
function InputCustomize({
  value,
  setValue,
  prop = {
    px: '10',
    bg: 'white',
    ...COLOR.Text.gotIt,
    fontSize: 'xs',
  },
  propFocus = {bg: 'white', color: 'black', borderColor: 'white'},
  placeholder,
  iconRight,
  iconLeft,
}: TypeInput) {
  return (
    <Input
      value={value?.toString()}
      placeholderTextColor={placeholder.color as ColorValue}
      onChangeText={setValue}
      placeholder={placeholder.text}
      InputLeftElement={iconLeft}
      InputRightElement={iconRight}
      w="100%"
      _light={{
        ...prop,
        _focus: {
          ...propFocus,
        },
      }}
    />
  );
}

export default InputCustomize;
