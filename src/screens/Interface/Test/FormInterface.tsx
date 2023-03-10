import {
  VStack,
  Input,
  Button,
  FormControl,
  Text,
  KeyboardAvoidingView,
} from 'native-base';
import React from 'react';
import {useForm, Controller} from 'react-hook-form';

function FormInterface({navigation}: any) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const onSubmit = (data: any) => {
    console.log('submiting with ', data);
    if (data) {
      navigation.navigate('View_CRUD');
    }
  };

  return (
    <KeyboardAvoidingView>
      <VStack width="80%" space={4} mx="auto">
        <Text
          color={'black'}
          fontSize={'9xl'}
          onPress={() => {
            navigation.navigate('View_CRUD');
          }}
        >
          Login Form
        </Text>
        <FormControl isRequired isInvalid={'firstName' in errors}>
          <FormControl.Label>First Name</FormControl.Label>
          <Controller
            control={control}
            render={c => (
              <Input
                onBlur={c.field.onBlur}
                bg={'black'}
                placeholder="John"
                onChangeText={val => {
                  c.field.onChange(val);
                  console.log(errors);
                }}
                value={c.field.value}
                {...{
                  _focus: {
                    bg: 'amber.500',
                  },
                }}
              />
            )}
            name="firstName"
            rules={{
              required: 'Name is required',
            }}
            defaultValue=""
          />
          <FormControl.ErrorMessage>
            {errors.firstName?.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={'email' in errors}>
          <FormControl.Label>Email</FormControl.Label>
          <Controller
            control={control}
            render={c => (
              <Input
                onBlur={c.field.onBlur}
                bg={'black'}
                placeholder="xxxx@gmail.com"
                onChangeText={val => {
                  c.field.onChange(val);
                }}
                value={c.field.value}
                {...{
                  _focus: {
                    bg: 'amber.500',
                  },
                  _web: {
                    _focus: {
                      bg: 'red.400',
                    },
                  },
                }}
              />
            )}
            name="email"
            rules={{
              validate: {
                required: value1 => {
                  let re = /\S+@\S+\.\S+/;
                  let regex =
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
                  if (regex.test(value1) || re.test(value1)) {
                  } else {
                    return 'Invalid email';
                  }
                },
              },

              required: 'Email required',
              // pattern: {
              //   value:
              //     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              //   message: 'Email is invalid',
              // },
            }}
            defaultValue=""
          />
          <FormControl.ErrorMessage>
            {errors.email?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <Button onPress={handleSubmit(onSubmit)} colorScheme="pink">
          Submit
        </Button>
      </VStack>
    </KeyboardAvoidingView>
  );
}
export default FormInterface;
