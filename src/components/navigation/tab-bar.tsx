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
          tabBarIcon: ({ color }) => <HomeIconBar color={color} />,
        }}
      />
      <Tab.Screen
        name={'Health'}
        component={HealthStack}
        options={{
          tabBarLabel: 'Эрүүл мэнд',
          tabBarIcon: ({ color }) => <HospitalIllustration color={color} />,
        }}
      />
      <Tab.Screen
        name={'Daily'}
        component={DailyStack}
        options={{
          tabBarLabel: 'Өдөр тутам',
          tabBarIcon: ({ color }) => <ClockIllustration color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
