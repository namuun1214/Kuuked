import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack, HealthStack, DailyStack } from './index';
import {
  ClockIllustration,
  HomeIconBar,
  HospitalIllustration,
} from '../../assets';

const Tab = createBottomTabNavigator();

export const MainRoot = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveBackgroundColor: '#5969BD',
        activeBackgroundColor: '#5969BD',
        activeTintColor: '#FFFFFF',
        showLabel: true,
        inactiveTintColor: '#BDC3E5',
        keyboardHidesTabBar: true,
        style: {
          position: 'relative',
        },
      }}>
      <Tab.Screen
        name={'HomeStack'}
        component={HomeStack}
        options={{
          tabBarLabel: 'Нүүр',
          tabBarIcon: ({ tintColor }) => <HomeIconBar color={tintColor} />,
        }}
      />
      <Tab.Screen
        name={'Health'}
        component={HealthStack}
        options={{
          tabBarLabel: 'Эрүүл мэнд',
          tabBarIcon: ({ tintColor }) => (
            <HospitalIllustration color={tintColor} />
          ),
        }}
      />
      <Tab.Screen
        name={'Daily'}
        component={DailyStack}
        options={{
          tabBarLabel: 'Өдөр тутам',
          tabBarIcon: ({ tintColor }) => (
            <ClockIllustration color={tintColor} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
