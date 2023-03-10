import React from 'react';
import {Button} from 'native-base';

type Props = {
  click: (string: string) => void;
};

export const TestButton = ({click}: Props) => {
  return (
    <Button
      onPress={() => {
        click('hello');
      }}
    >
      submit
    </Button>
  );
};
