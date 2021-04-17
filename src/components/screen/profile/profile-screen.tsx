import React, { useContext } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Margin } from '../../index';
import { Header } from '../../header';
import { ScrollView } from 'react-native-gesture-handler';
import { UserContext } from '../home/userProvider';
import { Center, Queue, Spacer, Stack } from '../../layout';
import { Circle } from 'react-native-svg';
import { Border, Button, RemoteImage, Text } from '../../core';
import { AuthContext } from '../../../authentication';
import { CatalogContext } from '../category/categoryProvider';
import { DailyRoutine } from '../home/home-screen';
import { useNavigation } from '@react-navigation/core';
import { NavigationRoutes } from '../../navigation/navigation-param';
const ProfileScreen = () => {
  const { userInfo, userAge } = useContext(UserContext);
  const { user, signOut } = useContext(AuthContext);
  const { catalog } = useContext(CatalogContext);
  // const { phoneNumber } = user;
  const navigation = useNavigation();
  const gotoCategoryScreen = () => {
    navigation.navigate(NavigationRoutes.SelectCategoryScreen);
  };
  const { bornDate, height, image, name, nickname, sex, weight } = userInfo;
  return (
    <SafeAreaView>
      <Header withBack={true} headerText="Профайл" />
      <ScrollView>
        <Margin size={[4, 5, 0, 5]}>
          <Stack size={5}>
            <Queue justifyContent="space-between" alignItems="center">
              <Stack size={2}>
                <Text type="headline3">
                  {name}
                  {' ( '} {nickname}
                  {' ) '}
                </Text>
                <Text type="primaryBody2" role="tertiary">
                  {userAge} {' сартай'}
                </Text>
              </Stack>
              <Border radius="large">
                <RemoteImage
                  url="https://firebasestorage.googleapis.com/v0/b/babytracker-c9194.appspot.com/o/newsImages%2Fnathan-dumlao-rUsi-dLgC_4-unsplash.jpg?alt=media&token=178ee742-375d-4597-b7cc-b1e81a8409ce"
                  width={80}
                />
              </Border>
            </Queue>
            <Border role="light" topWidth="light" />
            <Stack size={3}>
              <Text type="headline3" role="success">
                Хэрэглэгчийн бүртгэл
              </Text>
              <Queue justifyContent="space-between">
                <Text>Утасны дугаар</Text>
                <Text role="tertiary">{user?.phoneNumber}</Text>
              </Queue>
            </Stack>
            <Border role="light" topWidth="light" />
            <Stack size={3}>
              <Text type="headline3" role="success">
                Хүүхдийн бүртгэл
              </Text>
              <Queue justifyContent="space-between">
                <Text role="tertiary">Нэр</Text>
                <Text>{name}</Text>
              </Queue>
              <Queue justifyContent="space-between">
                <Text role="tertiary">Хоч</Text>
                <Text>{nickname}</Text>
              </Queue>
              <Queue justifyContent="space-between">
                <Text role="tertiary">Төрсөн жин</Text>
                <Text>
                  {weight} {' кг'}
                </Text>
              </Queue>
              <Queue justifyContent="space-between">
                <Text role="tertiary">Төрсөн өндөр</Text>
                <Text>
                  {height}
                  {' см'}
                </Text>
              </Queue>
              <Queue justifyContent="space-between">
                <Text role="tertiary">Хүйс</Text>
                <Text>{sex}</Text>
              </Queue>
              <Queue justifyContent="space-between">
                <Text role="tertiary">Төрсөн өдөр</Text>
                <Text>{bornDate}</Text>
              </Queue>
            </Stack>
            <Border role="light" topWidth="light" />
            <Text type="headline3" role="success">
              Өдөр тутмын бүртгэл
            </Text>
          </Stack>
        </Margin>
        <Margin size={[0, 0, 8, 0]}>
          <Center>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {catalog &&
                catalog.map(category => {
                  let { image, name } = category;
                  return <DailyRoutine url={image} name={name} />;
                })}
            </View>
          </Center>
          <Margin size={[3, 3, 3, 3]}>
            <Stack size={3}>
              <Button
                backgroundRole="success"
                radius="xmedium"
                // size={[4, 0, 4, 0]}
                onPress={gotoCategoryScreen}
                textRole="light">
                Категори Сонгох
              </Button>

              <Button
                backgroundRole="info"
                radius="xmedium"
                // size={[4, 0, 4, 0]}
                onPress={() => {
                  signOut();
                  navigation.navigate(NavigationRoutes.WelcomeScreen);
                }}
                textRole="light">
                Logout
              </Button>
            </Stack>
          </Margin>
        </Margin>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
