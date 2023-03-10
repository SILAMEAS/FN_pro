import React from 'react';
import {
  Box,
  HStack,
  IconButton,
  Pressable,
  StatusBar,
  Text,
  useBreakpointValue,
} from 'native-base';
import {faUser, faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {style} from '@styles/style';
import {LanguagePicker} from './langauge_picker';
import {NavigatorRoute} from '@src/navigation';
import {useTranslation} from 'react-i18next';
import {Localization} from '@src/i18n/languages';
import {Constant_Navigator} from '@src/navigation/Constant_Navigator';

export function Header({navigation}: any) {
  const {t} = useTranslation();
  const isNavItem = useBreakpointValue({
    base: false,
    sm: false,
    md: true,
    lg: true,
  });
  return (
    <>
      <StatusBar backgroundColor="#191970" barStyle="light-content" />
      <Box safeAreaTop bg="violet.600" />
      <HStack
        style={[
          style.appBar,
          {
            backgroundColor: Constant_Navigator.DOCUSIGN ? 'white' : '#3700B3',
          },
        ]}
        justifyContent="space-between"
      >
        {Constant_Navigator.DOCUSIGN && !isNavItem ? (
          <IconButton
            onPress={() => {
              navigation.openDrawer();
            }}
            icon={
              <FontAwesomeIcon
                icon={faBars}
                color={Constant_Navigator.DOCUSIGN ? 'black' : 'white'}
              />
            }
            name="menu"
          />
        ) : (
          <></>
        )}
        <HStack alignItems="center">
          {!Constant_Navigator.DOCUSIGN && !isNavItem ? (
            <IconButton
              onPress={() => {
                navigation.openDrawer();
              }}
              icon={
                <FontAwesomeIcon
                  icon={faBars}
                  color={Constant_Navigator.DOCUSIGN ? 'black' : 'white'}
                />
              }
              name="menu"
            />
          ) : (
            <></>
          )}
          <Pressable
            onPress={() => {
              navigation.navigate(NavigatorRoute.HOME);
            }}
          >
            <Text
              color={Constant_Navigator.DOCUSIGN ? 'black' : 'white'}
              fontSize="20"
              fontWeight={Constant_Navigator.DOCUSIGN ? 'semibold' : 'bold'}
            >
              {Constant_Navigator.DOCUSIGN
                ? t(Localization('docusign'))
                : t(Localization('home'))}
            </Text>
          </Pressable>
        </HStack>
        <HStack space={2}>
          {isNavItem ? (
            <>
              <Pressable
                onPress={() => {
                  navigation.navigate(NavigatorRoute.PAGINATION_SCREEN);
                }}
              >
                <Text bold={true} paddingTop={2}>
                  {t(Localization('paginationScreen'))}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate(NavigatorRoute.DIALOG_SCREEN);
                }}
              >
                <Text bold={true} paddingTop={2}>
                  {t(Localization('dialogScreen'))}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  navigation.navigate(NavigatorRoute.SLIDE_SCREEN);
                }}
              >
                <Text bold={true} paddingTop={2}>
                  {t(Localization('slideScreen'))}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate(NavigatorRoute.TEST_COMPONENT);
                }}
              >
                <Text bold={true} paddingTop={2}>
                  {t(Localization('testComponents'))}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate(NavigatorRoute.SAMPLE_UI.MAIN);
                }}
              >
                <Text bold={true} paddingTop={2}>
                  {t(Localization('sampleUILandingScreen'))}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate(NavigatorRoute.TEST_API);
                }}
              >
                <Text bold={true} paddingTop={2}>
                  {t(Localization('testAPIServerRequestScreen'))}
                </Text>
              </Pressable>
            </>
          ) : (
            <></>
          )}
          <IconButton
            onPress={() => {
              navigation.navigate(NavigatorRoute.LOGIN);
            }}
            icon={
              <FontAwesomeIcon
                icon={faUser}
                color={Constant_Navigator.DOCUSIGN ? 'black' : 'white'}
              />
            }
            name="menu"
          />
          {Constant_Navigator.DOCUSIGN ? <></> : <LanguagePicker />}
        </HStack>
      </HStack>
    </>
  );
}
