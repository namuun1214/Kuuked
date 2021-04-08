import React from 'react';
import { SafeAreaView } from 'react-native';
import { HomeIllustration, KuukedLogo } from '../../../assets';
import { Box, Button, Center, Margin, Stack, Text } from '../../index';
import { Header } from '../../header';
import { useNavigation } from '@react-navigation/native';
import { NavigationRoutes } from '../../navigation/navigation-param';
import { ScrollView } from 'react-native-gesture-handler';
import { Queue } from '../../layout';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const gotoRegistration = () => {
    navigation.navigate(NavigationRoutes.MainRoot);
  };
  return (
    <SafeAreaView>
      <Header withBack={false} headerText="Нүүр хуудас" menu={false} />
      <ScrollView>
        <Margin size={[2, 3, 0, 3]}>
          <HomeIllustration />
          <Stack size={4}>
            <Queue justifyContent="center">
              <Text role="default" type="primaryBody2">
                {/* Та энэхүү аппликейшнийг ашиглан өөрийн хүүхдийн өсөлт хөгжил, өдөр
              тутам хийж байгаа зүйлс, эрүүл мэнд зэргийг бүртгэн тэдгээрт
              харьцуулалт хийх боломжтой болно. */}
                Kuuked системд тавтай морил
              </Text>
            </Queue>
            <Button
              backgroundRole="info"
              radius="xmedium"
              size={[4, 0, 4, 0]}
              onPress={gotoRegistration}
              textRole="light">
              Нэвтрэх
            </Button>
          </Stack>
        </Margin>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
