import {CheckIcon, Select, VStack} from 'native-base';
import React from 'react';
interface type {
  data?: any;
}
const SelectT = ({data}: type) => {
  let [service, setService] = React.useState('');

  return (
    <VStack alignItems="center" space={4}>
      <Select
        shadow={2}
        selectedValue={service}
        minWidth="200"
        color={'blue.900'}
        accessibilityLabel="Choose Service"
        placeholder="Choose Service"
        _selectedItem={{
          bg: 'teal.600',
          endIcon: <CheckIcon size="5" />,
        }}
        _light={{
          bg: 'coolGray.100',
        }}
        _dark={{
          bg: 'coolGray.800',
        }}
        onValueChange={itemValue => setService(itemValue)}
      >
        {data?.map((i: any) => {
          return <Select.Item shadow={2} label={i} value={i} key={i} />;
        })}
      </Select>
    </VStack>
  );
};

export default SelectT;
