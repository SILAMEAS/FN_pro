import {Button, Spinner, View} from 'native-base';
import React from 'react';
import {ColorValue} from 'react-native';
import {LoadingButtonProps, spinnerIconColorMap} from '.';

// import {style} from '@styles/style';

export const LoadingButton = ({
  text,
  isLoading = false,
  type = 'primary',
  spinnerSize = 'sm',
  variant,
  ...props
}: LoadingButtonProps) => {
  const color =
    variant === 'ghost' ||
    variant === 'link' ||
    variant === 'subtle' ||
    variant === 'unstyled'
      ? spinnerIconColorMap.dark
      : spinnerIconColorMap[type];
  console.log('1111');
  console.log(text);
  return (
    <Button
      {...props}
      // style={style.button}
      variant={variant}
      colorScheme={type}
      isDisabled={isLoading}
    >
      {isLoading ? (
        <View
          width={'100%'}
          display={'flex'}
          flexDir="row"
          justifyContent={'space-evenly'}
          alignItems="center"
        >
          {/*<MyText*/}
          {/*  _web={{*/}
          {/*    marginRight: '3',*/}
          {/*  }}*/}
          {/*  color={color}*/}
          {/*  fontSize={fontSize}*/}
          {/*  textAlign="center"*/}
          {/*>*/}
          {/*  {text}*/}
          {/*</MyText>*/}
          <>{text}</>
          <Spinner color={color as ColorValue} size={spinnerSize} />
        </View>
      ) : (
        <>{text}</>
      )}
    </Button>
  );
};
