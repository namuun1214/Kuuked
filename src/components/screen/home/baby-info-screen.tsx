import React from 'react';
import LottieView from 'lottie-react-native';
import { NavigationRoutes } from '../../navigation/navigation-param';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../header';
import { Text } from 'react-native-animatable';
import { Margin, Stack } from '../../layout';
import { Button } from '../..';
import { AddImageIcon } from '../../../assets';

export const BabyInfoScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Header withBack={true} headerText="Хүүхэд бүртгэл" />
      <Margin size={[5, 5, 5, 5]}>
        <Stack size={5}>
          <Button
            radius="xlarge"
            backgroundRole="light"
            leftIcon={<AddImageIcon />}>
            Зураг оруулах
          </Button>
        </Stack>
      </Margin>
    </SafeAreaView>
  );
};
