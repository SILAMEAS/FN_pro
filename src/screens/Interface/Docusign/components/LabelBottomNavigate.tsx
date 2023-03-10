import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faInbox} from '@fortawesome/free-solid-svg-icons';
import {Text, VStack} from 'native-base';

function LabelBottomNavigate({options, route, isFocused}: any) {
  const label =
    options.tabBarLabel !== undefined ? (
      options.tabBarLabel
    ) : options.title !== undefined ? (
      options.title
    ) : route.name === 'Inbox' ? (
      <VStack alignItems={'center'}>
        <FontAwesomeIcon
          icon={faInbox}
          size={24}
          color={isFocused ? '#1D5AA3' : '#40413F'}
        />
        <Text color={isFocused ? '#1D5AA3' : '#40413F'}>Inbox</Text>
      </VStack>
    ) : route.name === 'Home' ? (
      <VStack alignItems={'center'}>
        <FontAwesomeIcon
          icon={faHome}
          size={24}
          color={isFocused ? '#1D5AA3' : '#40413F'}
        />
        <Text color={isFocused ? '#1D5AA3' : '#40413F'}>Home</Text>
      </VStack>
    ) : (
      <></>
    );

  return <>{label}</>;
}

export default LabelBottomNavigate;
