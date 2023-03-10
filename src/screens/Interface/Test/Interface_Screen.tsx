import {Center, Text} from 'native-base';
import React from 'react';
import {Constant_Navigator} from '../../../navigation/Constant_Navigator';

interface props {
  navigation: any;
}
const Interface_Screen = ({navigation}: props) => {
  return (
    <Center>
      <Text
        color={'cyan.300'}
        rounded="lg"
        padding={3}
        bg="blue.600"
        underline
        fontSize={'lg'}
        mt="3"
        fontWeight="extrabold"
        onPress={() => {
          navigation.navigate('Interface_cal');
        }}
      >
        Calcutor
      </Text>
      <Text
        color={'cyan.300'}
        rounded="lg"
        padding={3}
        bg="blue.600"
        underline
        fontSize={'lg'}
        mt="3"
        fontWeight="extrabold"
        onPress={() => {
          navigation.navigate('Interface_form');
        }}
      >
        Form
      </Text>
      <Text
        color={'cyan.300'}
        rounded="lg"
        padding={3}
        bg="blue.600"
        underline
        fontSize={'lg'}
        mt="3"
        fontWeight="extrabold"
        onPress={() => {
          navigation.navigate(Constant_Navigator.API_NG);
        }}
      >
        Hehe
      </Text>
    </Center>
  );
};

export default Interface_Screen;
