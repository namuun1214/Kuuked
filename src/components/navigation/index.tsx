import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';
import React from 'react';
import { Easing } from 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CommonErrorDialog, ResendCodeDialog } from '../dialog';
import { SideMenu } from '../header/sidemenu';
import SelectCategoryScreen from '../screen/category/select-category-screen';
import DailyScreen from '../screen/daily/daily-screen';
import { MemoryListScreen } from '../screen/daily/memory-list-screen';
import EmergencyDetailScreen from '../screen/emergency/emergency-detail-screen';
import { EmergencyListScreen } from '../screen/emergency/emergency-list-screen';
import { HealthDetailScreen } from '../screen/health/health-detail-screen';
import HealthLogScreen from '../screen/health/health-log-screen';
import HealthScreen from '../screen/health/health-screen';
import SurgeryScreen from '../screen/health/health-screen';
import { BabyInfoScreen } from '../screen/home/baby-info-screen';
import HomeScreen from '../screen/home/home-screen';
import { SplashScreen } from '../screen/home/splash-screen';
import WelcomeScreen from '../screen/home/welcome-screen';
import NewsScreen from '../screen/news/news-list-screen';
import NewsDetailScreen from '../screen/news/newsDetailScreen';
import {
  CodeVerificationScreen,
  PhoneNumberRegistrationScreen,
  PhoneRegistrationSuccessScreen,
} from '../screen/phone-verification-stack';
import { NavigationRoutes, NavigatorParamList } from './navigation-param';
import { MainRoot } from './tab-bar';

const RootStack = createStackNavigator<NavigatorParamList>();
const modalDialogOverlayTransitionConfig: TransitionSpec = {
  animation: 'timing',
  config: {
    duration: 350,
    easing: Easing.inOut(Easing.poly(2)),
  },
};
const ModalScreenOptions: StackNavigationOptions = {
  cardStyle: { backgroundColor: 'transparent' },
  cardOverlayEnabled: true,
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress,
    },
  }),
  transitionSpec: {
    open: modalDialogOverlayTransitionConfig,
    close: modalDialogOverlayTransitionConfig,
  },
};
export const RootNavigationContainer = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NavStack.Navigator headerMode="none">
          <RootStack.Screen
            name={NavigationRoutes.Splash}
            component={SplashScreen}
            options={{ headerShown: false, gestureEnabled: true }}
          />
          <RootStack.Screen
            name={NavigationRoutes.MainRoot}
            component={MainRoot}
            options={{ headerShown: false, gestureEnabled: true }}
          />
          <RootStack.Screen
            name={NavigationRoutes.WelcomeScreen}
            component={WelcomeScreen}
            options={{ headerShown: true, gestureEnabled: true }}
          />
          <RootStack.Screen
            name={NavigationRoutes.PhoneNumberRegistrationScreen}
            component={PhoneNumberRegistrationScreen}
            options={{ headerShown: false, gestureEnabled: true }}
          />
          <RootStack.Screen
            name={NavigationRoutes.PhoneRegistrationSuccessScreen}
            component={PhoneRegistrationSuccessScreen}
            options={{ headerShown: false, gestureEnabled: true }}
          />
          <RootStack.Screen
            name={NavigationRoutes.CodeVerificationScreen}
            component={CodeVerificationScreen}
            options={{ headerShown: false, gestureEnabled: true }}
          />
          <RootStack.Screen
            name={NavigationRoutes.BabyInfoScreen}
            component={BabyInfoScreen}
            options={{ headerShown: false, gestureEnabled: true }}
          />
          <RootStack.Screen
            name={NavigationRoutes.SelectCategoryScreen}
            component={SelectCategoryScreen}
            options={{ headerShown: false, gestureEnabled: true }}
          />
          <RootStack.Screen
            name={NavigationRoutes.ResendCodeDialog}
            component={ResendCodeDialog}
            options={ModalScreenOptions}
          />
          <RootStack.Screen
            name={NavigationRoutes.CommonErrorDialog}
            component={CommonErrorDialog}
            options={ModalScreenOptions}
          />
          <RootStack.Screen
            name={NavigationRoutes.SideMenu}
            component={SideMenu}
            options={ModalScreenOptions}
          />
        </NavStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const NavStack = createStackNavigator();

export const HomeStack = () => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen
      name={NavigationRoutes.Home}
      component={HomeScreen}
      options={{ headerShown: false, gestureEnabled: true }}
    />
    <RootStack.Screen
      name={NavigationRoutes.DailyScreen}
      component={DailyScreen}
      options={{ headerShown: false, gestureEnabled: true }}
    />
    <RootStack.Screen
      name={NavigationRoutes.SelectCategoryScreen}
      component={SelectCategoryScreen}
      options={{ headerShown: false, gestureEnabled: true }}
    />
    <RootStack.Screen
      name={NavigationRoutes.ResendCodeDialog}
      component={ResendCodeDialog}
      options={{ headerShown: false, gestureEnabled: false }}
    />
    <RootStack.Screen
      name={NavigationRoutes.CommonErrorDialog}
      component={CommonErrorDialog}
      options={{ headerShown: false, gestureEnabled: false }}
    />
    <RootStack.Screen
      name={NavigationRoutes.NewsScreen}
      component={NewsScreen}
      options={{ headerShown: false, gestureEnabled: true }}
    />
    <RootStack.Screen
      name={NavigationRoutes.NewsDetailScreen}
      component={NewsDetailScreen}
      options={{ headerShown: false, gestureEnabled: true }}
    />
    <RootStack.Screen
      name={NavigationRoutes.BabyInfoScreen}
      component={BabyInfoScreen}
      options={{ headerShown: false, gestureEnabled: true }}
    />
    <RootStack.Screen
      name={NavigationRoutes.EmergencyListScreen}
      component={EmergencyListScreen}
      options={{ headerShown: false, gestureEnabled: true }}
    />
    <RootStack.Screen
      name={NavigationRoutes.EmergencyDetailScreen}
      component={EmergencyDetailScreen}
      options={{ headerShown: false, gestureEnabled: true }}
    />

    <RootStack.Screen
      name={NavigationRoutes.MemoryListScreen}
      component={MemoryListScreen}
      options={{ headerShown: false, gestureEnabled: true }}
    />
  </RootStack.Navigator>
);
export const HealthStack = () => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen
      name={NavigationRoutes.HealthScreen}
      component={HealthScreen}
      options={{ headerShown: false, gestureEnabled: true }}
    />
    <RootStack.Screen
      name={NavigationRoutes.HealthLogScreen}
      component={HealthLogScreen}
      options={{ headerShown: false, gestureEnabled: true }}
    />
    <RootStack.Screen
      name={NavigationRoutes.HealthDetailScreen}
      component={HealthDetailScreen}
      options={{ headerShown: false, gestureEnabled: true }}
    />
  </RootStack.Navigator>
);

export const DailyStack = () => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen
      name={NavigationRoutes.DailyScreen}
      component={DailyScreen}
      options={{ headerShown: false, gestureEnabled: false }}
    />
  </RootStack.Navigator>
);
