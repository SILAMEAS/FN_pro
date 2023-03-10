import React, {useState} from 'react';
import {Box, Button, HStack, Pressable, Text, VStack} from 'native-base';
import InputStep from '@screens/Interface/Docusign/components/form/InputStep';
import {
  PropertyInForm,
  TypeOfPropertyInForm,
} from '@screens/Interface/Docusign/page/recipient/TypeOfPropertyInForm';
import {useAppDispatch, useAppSelector} from '@src/redux/config/hooks';
import {setForScenarioProcess} from '@src/redux/counter/CounterSlice';
import {COLOR} from '@screens/Interface/Docusign/color/Color';
import {ListMenuRecipients} from '@screens/Interface/Docusign/components/listMenu';
import InputCustomize from '@screens/Interface/Docusign/components/input/InputCustomize';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faContactBook} from '@fortawesome/free-solid-svg-icons';
import {actorsApi, TypeActor} from '@screens/Interface/Docusign/page/Type';
import {Loading, useLoading} from '@components/commons/loading';
interface Type {
  process: string;
  cardinality: string;
  signatureType: string;
  steps: string[];
}
// interface TypeFormStep {
//   name: string;
//   setName: React.Dispatch<React.SetStateAction<string>>;
//   email: string;
//   setEmail: React.Dispatch<React.SetStateAction<string>>;
//   urlActor: string;
// }
function FormStep() {
  const [name, setName] = useState('Hello');
  const [email, setEmail] = useState('Hello@gmail.com');
  const {ForScenarioProcess, ForSign} = useAppSelector(state => state.counter);
  const dispatch = useAppDispatch();
  const loading = useLoading();
  const actor_create = async () => {
    await actorsApi.createActor<TypeActor>(
      {
        name: name,
        type: 0,
        roles: ['approval', 'sign'],
        'adm-id': 'dolore fugiat exercitation sed',
        'first-name': 'test',
        country: 'FR',
        login: email,
        email: 'LwsyPS70m10aPpK@qnWdwQpJegBROOpjqauSYiaxLhRB.daa',
        mobile: 'enim occaecat et aliqua',
        'manifest-data': {},
        'user-data': {},
      },
      undefined,
      ForSign.IdSession + '/actors',
    );
  };

  const [data, setData] = React.useState<Type>({
    process: '',
    cardinality: '',
    signatureType: '',
    steps: [ForSign.Actor!],
  });
  console.log(ForSign.Actor);
  console.log(data);

  const AssignToMe = () => {
    setName('UK');
    setEmail('Email');
  };
  React.useMemo(async () => {
    await actor_create();
    loading.setLoading(true);
  }, []);

  return (
    <Box>
      {loading.isLoading && <Loading spinnerStyle={{color: '', size: 'lg'}} />}
      <InputStep
        DataSelect={TypeOfPropertyInForm.processT}
        label={PropertyInForm.processP}
        placeholder={data.process}
        onValueChange={e => {
          setData(prevState => {
            return {...prevState, process: e};
          });
        }}
      />
      <InputStep
        DataSelect={TypeOfPropertyInForm.signatureTypeT}
        label={PropertyInForm.signatureTypeP}
        placeholder={data.signatureType}
        onValueChange={e => {
          setData(prevState => {
            return {...prevState, signatureType: e};
          });
        }}
      />
      <InputStep
        DataSelect={TypeOfPropertyInForm.cardinalityT}
        label={PropertyInForm.cardinalityP}
        placeholder={data.cardinality}
        onValueChange={e => {
          setData(prevState => {
            return {...prevState, cardinality: e};
          });
        }}
      />
      <VStack bg={'white'}>
        <HStack
          w={'100%'}
          py={2}
          px={4}
          justifyContent={'space-between'}
          bg={COLOR.BackGroundDocuSign}
        >
          <Text color={'black'} fontWeight={'semibold'}>
            Recipient
          </Text>
          <Pressable onPress={AssignToMe}>
            <Text {...COLOR.Text.gotIt} fontSize={'xs'}>
              Assign to me
            </Text>
          </Pressable>
        </HStack>

        <VStack bg={'white'}>
          <ListMenuRecipients
            borderB={true}
            subDes={
              <HStack
                w={'100%'}
                justifyContent={'space-between'}
                alignItems={'center'}
                px={4}
              >
                <InputCustomize
                  value={name}
                  setValue={setName}
                  placeholder={{text: "Recipient's first name"}}
                  iconRight={
                    <FontAwesomeIcon
                      icon={faContactBook}
                      size={14}
                      color={COLOR.ButtonColor.searchButton}
                    />
                  }
                />
              </HStack>
            }
          />
          <Box px={4}>
            <InputCustomize
              value={email}
              setValue={setEmail}
              placeholder={{text: "Recipient's login"}}
            />
          </Box>
        </VStack>
      </VStack>
      <Button
        bg={'blue.700'}
        fontWeight={'bold'}
        onPress={() => {
          loading.setLoading(true);
          if (
            data.cardinality !== '' &&
            data.process !== '' &&
            data.signatureType !== ''
          ) {
            dispatch(
              setForScenarioProcess({
                ...ForScenarioProcess,
                steps: [...ForScenarioProcess.steps, data] as any,
              }),
            );
            loading.setLoading(false);
          } else {
            alert('Please Select all field');
          }
        }}
      >
        <Text>Add Role {ForScenarioProcess.steps.length - 1}</Text>
      </Button>
    </Box>
  );
}

export default FormStep;
