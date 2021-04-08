import React from 'react';
import LottieView from 'lottie-react-native';
import { NavigationRoutes } from '../../navigation/navigation-param';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

export const SplashScreen = () => {
  const navigation = useNavigation();
  return (
    <LottieView
      source={require('../../../assets/splashVideo.json')}
      autoPlay={true}
      loop={false}
      onAnimationFinish={() => {
        navigation.dispatch(
          StackActions.replace(NavigationRoutes.WelcomeScreen),
        );
      }}
    />
  );
};
