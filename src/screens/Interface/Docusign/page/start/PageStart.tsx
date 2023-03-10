import * as React from 'react';
import {View, TouchableOpacity} from 'react-native';

import {COLOR} from '@src/screens/Interface/Docusign/color/Color';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Box, Center} from 'native-base';
import PageHomeDocusign from '@screens/Interface/Docusign/page/Home/PageHomeDocusign';
import PageInboxDocusign from '@screens/Interface/Docusign/page/Home/PageInboxDocusign';

import LabelBottomNavigate from '@screens/Interface/Docusign/components/LabelBottomNavigate';

import MyStagger from '@screens/Interface/Docusign/components/MyStagger';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/redux/store';
import {Loading} from '@components/commons/loading';
import {useAppSelector} from '@src/redux/config/hooks';
import {setBlurScreen} from '@src/redux/counter/CounterSlice';

function MyTabBar({state, descriptors, navigation}: any) {
  const {LoadingState} = useAppSelector(state => state.counter);
  const dispatch = useDispatch();
  if (LoadingState) {
    dispatch(setBlurScreen(true));
  }
  return (
    <>
      {LoadingState && (
        <Loading
          containerStyle={{
            position: 'absolute',
            top: '50%',
            left: '45%',
            zIndex: 10,
          }}
          spinnerStyle={{size: 'lg'}}
        />
      )}
      <View style={{flexDirection: 'row'}}>
        <Box
          position={'absolute'}
          top={'-200%'}
          left={['25%', '45%']}
          zIndex={100}
        >
          <MyStagger />
        </Box>

        {state.routes.map((route: any, index: any) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1}}
            >
              <Center pt={5}>
                <LabelBottomNavigate
                  isFocused={isFocused}
                  options={options}
                  route={route}
                />
              </Center>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}

const Tab = createBottomTabNavigator();

const PageStart = () => {
  const {BlurScreen} = useSelector((state: RootState) => state.counter);
  return (
    <Box safeArea w={'100%'} h={'100%'} bg={COLOR.BackGroundDocuSign}>
      <Box h={'100%'}>
        {BlurScreen && (
          <Box
            bg={'black'}
            opacity={0.8}
            h={'100%'}
            w={'100%'}
            position={'absolute'}
            top={'0%'}
            zIndex={10}
          />
        )}

        <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
          <Tab.Screen
            name="Home"
            component={PageHomeDocusign}
            options={{
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Inbox"
            component={PageInboxDocusign}
            options={{
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </Box>
    </Box>
  );
};

export default PageStart;
