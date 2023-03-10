import {Heading, HStack, Spinner} from 'native-base';
import React from 'react';
interface type {
  title: string;
}

const Loading = ({title}: type) => {
  console.log('el');
  return (
    <HStack space={2} justifyContent="center">
      <Spinner accessibilityLabel="Loading posts" />
      <Heading color="primary.500" fontSize="md">
        {title}
      </Heading>
    </HStack>
  );
};

export default Loading;
