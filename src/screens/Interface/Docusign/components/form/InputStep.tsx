import React from 'react';
import {MySelect} from '@components/commons/my_select';
import {CheckIcon, VStack} from 'native-base';
import {Type} from '@screens/Interface/Docusign/components/form/Type';
import {ListMenuRecipients} from '@screens/Interface/Docusign/components/listMenu';

function InputStep({
  placeholder = 'Process',
  label = 'Need to sign',
  DataSelect,
  onValueChange,
}: Type) {
  return (
    <>
      <VStack
        bg={'white'}
        mt={2}
        px={5}
        py={3}
        justifyContent={'space-between'}
      >
        <ListMenuRecipients borderB={true} des={label} subDes={<></>} />
        <MySelect
          data={DataSelect}
          select={{
            dropdownIcon: <CheckIcon size="5" />,
            placeholder: placeholder,
          }}
          defaultSelect={placeholder}
          onValueChange={onValueChange}
        />
      </VStack>
    </>
  );
}

export default InputStep;
