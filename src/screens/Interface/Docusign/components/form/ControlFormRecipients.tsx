import React from 'react';
import {Step} from '@src/redux/counter/Type/Type';
import {Box, Button, ScrollView} from 'native-base';
import {InputStep} from '@screens/Interface/Docusign/components/form/index';
import {
  PropertyInForm,
  TypeOfPropertyInForm,
  ValueOfPropertyInForm,
} from '@screens/Interface/Docusign/page/recipient/TypeOfPropertyInForm';

import {useAppDispatch, useAppSelector} from '@src/redux/config/hooks';
import {setForScenarioProcess} from '@src/redux/counter/CounterSlice';
// import {SigningProcess} from '@utils/classes/interfaces/APIInterface';
interface Type {
  Process: string;
  Cardinality: string;
  Signature: string;
}
export const ControlFormRecipients = ({Data}: any) => {
  const [data, setData] = React.useState<Type>({
    Process: '',
    Cardinality: '',
    Signature: '',
  });
  const {ForScenarioProcess} = useAppSelector(state => state.counter);
  console.log('*************************************');
  console.log(data);
  console.log('*************************************');
  const dispatch = useAppDispatch();
  console.log('____________________________________');
  console.log(ForScenarioProcess.steps);
  console.log('____________________________________');
  console.log('____________________________kkk');
  console.log(ValueOfPropertyInForm.processV);
  const [dataA, setDataA] = React.useState<Type[]>([]);
  console.log('data');
  console.log(dataA);
  return (
    <>
      <ScrollView>
        {Data.steps.map((item: Step) => {
          return Object.keys(item).map((property, index) => {
            // const checkProperty = item[property];
            return (
              <Box key={index}>
                {property !== 'steps' && (
                  <Box key={index}>
                    <InputStep
                      DataSelect={
                        property === PropertyInForm.processP
                          ? TypeOfPropertyInForm.processT
                          : property === PropertyInForm.signatureTypeP
                          ? TypeOfPropertyInForm.signatureTypeT
                          : property === PropertyInForm.cardinalityP
                          ? TypeOfPropertyInForm.cardinalityT
                          : []
                      }
                      placeholder={
                        property === PropertyInForm.processP
                          ? ForScenarioProcess.steps[0].process.toString()
                          : property === PropertyInForm.cardinalityP
                          ? ForScenarioProcess.steps[0].cardinality.toString()
                          : property === PropertyInForm.signatureTypeP
                          ? ForScenarioProcess.steps[0].signatureType!.toString()
                          : 'Unknow'
                      }
                      label={property}
                      onValueChange={e => {
                        property === PropertyInForm.processP
                          ? setData(prevState => {
                              return {...prevState, Process: e};
                            })
                          : property === PropertyInForm.signatureTypeP
                          ? setData(prevState => {
                              return {...prevState, Signature: e};
                            })
                          : property === PropertyInForm.cardinalityP
                          ? setData(prevState => {
                              return {...prevState, Cardinality: e};
                            })
                          : [];
                      }}
                    />
                  </Box>
                )}
              </Box>
            );
          });
        })}
      </ScrollView>
      <Button
        mt={5}
        bg={'blue.800'}
        onPress={() => {
          setDataA((prevState: any) => {
            return [...prevState, data];
          });
          dispatch(
            setForScenarioProcess({
              ...ForScenarioProcess,
              steps: dataA as any,
            }),
          );
        }}
      >
        Add Role
      </Button>
    </>
  );
};
