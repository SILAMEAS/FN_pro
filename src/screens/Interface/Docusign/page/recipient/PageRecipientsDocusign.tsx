import React from 'react';
import {Box, Pressable, Text, VStack} from 'native-base';
import {COLOR} from '@screens/Interface/Docusign/color/Color';
import HeaderCustom from '@screens/Interface/Docusign/components/HeaderCustom';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@src/navigation';
import {Constant_Navigator} from '@src/navigation/Constant_Navigator';

import {useAppSelector} from '@src/redux/config/hooks';

import FormStep from '@screens/Interface/Docusign/components/form/FormStep';

function PageRecipientsDocusign() {
  const navigate = useNavigation();

  const {ForScenarioProcess} = useAppSelector(state => state.counter);

  // const url = ForSign.IdSession + '/actor/' + ForSign.Actor!.split('/')[6];
  console.log('#########################');
  console.log(ForScenarioProcess);
  console.log('#########################');
  return (
    <Box safeArea w={'100%'} h={'100%'} bg={COLOR.BackGroundDocuSign}>
      <Box h={'100%'}>
        <HeaderCustom
          iconLeft={
            <Pressable
              onPress={() => {
                navigate.navigate(Constant_Navigator.PAGE_START_DOCUSIGN);
              }}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                size={20}
                color={COLOR.ButtonColor.searchButton}
              />
            </Pressable>
          }
          iconRight={
            <Text
              color={COLOR.Text.gotIt.color}
              onPress={() => {
                navigate.navigate(Constant_Navigator.PAGE_ADD_PDF_DOCUSIGN);
              }}
            >
              Save
            </Text>
          }
          prop={{bg: 'white'}}
          title={<Text {...COLOR.Text.textRedirect}>Recipients</Text>}
        />

        <VStack mt={2} py={2} space={2}>
          <VStack>
            <Text {...COLOR.Text.textRedirect} color={'black'} pl={2}>
              Role
            </Text>
            {/*<ControlFormRecipients Data={ForScenarioProcess} />*/}
            <FormStep />
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
}

export default PageRecipientsDocusign;
