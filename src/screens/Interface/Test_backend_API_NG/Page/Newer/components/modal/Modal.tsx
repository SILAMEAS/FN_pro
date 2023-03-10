import React, {useState} from 'react';
import {Button, Modal, ScrollView, Text} from 'native-base';
import Loading from '../loading/Loading';
// import SelectT from '@src/screens/Interface/Test_backend_API_NG/components/select/Select';
import {MySelect} from '../cheaNit_picker_file/select';
import {ConvertArrayToObject} from '../../utils/session/convert_A_O/Convert';
import {MyForm} from '../cheaNit_picker_file/my_form';
interface type {
  modalVisible: boolean;
  setModalVisible: any;
  title?: string;
  body?: any;
  save?: string;
  cancel?: string;
  Func?: any;
  isForm?: boolean;
}
const ModalA = ({
  Func,
  modalVisible,
  setModalVisible,
  title = 'Header',
  body,
  save = 'save',
  cancel = 'cancel',
  isForm = false,
}: type) => {
  const [selectValue, setSelectValue] = useState('');

  console.log(body);
  const data = ConvertArrayToObject(body);
  console.log('--------------DATA');
  console.log(data);

  // console.log(data);
  return (
    <>
      <Modal isOpen={modalVisible} size={'xl'}>
        <Modal.Content maxH="80%" maxW="90%" w={['100%', '30%']}>
          <Modal.Header bg={'black'}>
            <Text bg={'black'} color={'yellow.500'} fontWeight={'bold'}>
              {title}
            </Text>
          </Modal.Header>

          <Modal.Body bg={'black'}>
            {isForm === true ? (
              <MyForm
                form={{width: '100%', height: '100%', space: 7}}
                input={[
                  {
                    isRequired: true,

                    label: 'Create Login Input',
                    name: 'firstname',
                    color: 'white',
                    variant: 'outline',
                    placeholder: 'Your first name here...',
                    rules: {
                      required: 'Field is required',
                      validate: (value: string) => {
                        return value.length < 3
                          ? 'firstname must have more than 3 characters'
                          : undefined;
                      },
                    },
                  },
                ]}
                button={{
                  container: {},
                  buttons: [
                    {
                      colorScheme: 'danger',
                      text: 'Cancel',
                      type: 'button',
                      onPress: () => {
                        setModalVisible(false);
                      },
                    },
                    {
                      colorScheme: 'darkBlue',
                      text: 'Save',
                      type: 'submit',
                      onPress: dataObj => {
                        Func(dataObj.firstname);
                        setModalVisible(false);
                      },
                    },
                  ],
                }}
              />
            ) : (
              <ScrollView>
                {body.lenght !== 0 ? (
                  <>
                    <MySelect
                      labelProp="text"
                      data={data}
                      selectedValue={data[0]?.value}
                      onValueChange={v => {
                        setSelectValue(v);
                      }}
                    />
                  </>
                ) : (
                  <Loading title="Loading Data" />
                )}
              </ScrollView>
            )}
          </Modal.Body>
          <Modal.Footer bg={'black'}>
            {!isForm && (
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  borderColor={'yellow.600'}
                  borderWidth={2}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  <Text> {cancel}</Text>
                </Button>
                <Button
                  borderColor={'yellow.600'}
                  borderWidth={2}
                  bg={'black'}
                  onPress={() => {
                    setModalVisible(false);
                    Func(selectValue);
                  }}
                >
                  {save}
                </Button>
              </Button.Group>
            )}
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
export default ModalA;
