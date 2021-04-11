import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import React, { useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { TickIconInBubble } from '../../../assets';
import { Center, Stack, Text } from '../..';
import { NavigationRoutes } from '../../navigation/navigation-param';
import { delay } from '../../../utils';
import LottieView from 'lottie-react-native';
import { AuthContext } from '../../../authentication';

export const PhoneRegistrationSuccessScreen = () => {
  const { navigate } = useNavigation();
  const { user } = useContext(AuthContext);
  const waitAndNavigate = _.debounce(async () => {
    await delay(3000);
    navigate(NavigationRoutes.MainRoot);
  }, 300);
  useEffect(() => {
    waitAndNavigate();
  }, [user]);
  return (
    <SafeAreaView style={{ backgroundColor: '#FFFFFFF', flex: 1 }}>
      <LottieView
        source={require('../../../assets/confetti.json')}
        autoPlay
        loop={false}
      />
      <Center flex={1}>
        <Stack size={6}>
          <Center>
            <TickIconInBubble />
          </Center>
          <Stack size={4} width="100%">
            <Text textAlign="center" role="info">
              Баяр хүргэе!
            </Text>
            <Text textAlign="center" role="info">
              Та амжилттай бүртгүүллээ.
            </Text>
          </Stack>
        </Stack>
      </Center>
    </SafeAreaView>
  );
};
