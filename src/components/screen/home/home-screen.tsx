import React, { useContext } from 'react';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Border, Button, Margin, RemoteImage, Stack, Text } from '../../index';
import { Header } from '../../header';
import { ScrollView } from 'react-native-gesture-handler';
import { Center, Padding, Queue } from '../../layout';
import { NavigationRoutes } from '../../navigation/navigation-param';
import { CatalogContext } from '../category/categoryProvider';
import { AuthContext } from '../../../authentication';
import { NewsList } from '../news/news-list-screen';
import { UserContext } from './userProvider';
import { Circle } from 'react-native-svg';
import { Image } from 'react-native-animatable';
import moment from 'moment';
const window = Dimensions.get('window');

const DailyRoutine = props => {
  const navigation = useNavigation();
  const { name, url } = props;
  return (
    <Pressable
      onPress={() => {
        navigation.navigate(NavigationRoutes.DailyScreen, { name });
      }}>
      <Margin size={[2, 2, 2, 2]}>
        <Border
          radius="large"
          role="primary"
          lineWidth="light"
          backgroundRole="light">
          <Padding size={[2, 2, 2, 2]}>
            <Stack size={2} width={window.width / 4}>
              <Center>
                <RemoteImage width={60} resizeMode="contain" url={url} />
              </Center>
              <Text type="tertiaryBody2" numberOfLines={2} textAlign="center">
                {name}
              </Text>
            </Stack>
          </Padding>
        </Border>
      </Margin>
    </Pressable>
  );
};

const HomeScreen = () => {
  const { signOut, user } = useContext(AuthContext);
  const { userInfo } = useContext(UserContext);
  const navigation = useNavigation();
  const { catalog: categoryData } = useContext(CatalogContext);
  const gotoCategoryScreen = () => {
    navigation.navigate(NavigationRoutes.SelectCategoryScreen);
  };
  let bornDateMoment = moment(userInfo.bornDate, 'YYYY/MM/DD');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header withBack={false} headerText="Нүүр хуудас" />
      <ScrollView>
        <Margin size={[2, 3, 0, 3]}>
          <Stack size={3}>
            <Border
              role="light"
              lineWidth="light"
              radius="large"
              backgroundRole="yellow">
              <Padding size={[2, 2, 2, 2]}>
                <Queue justifyContent="space-around" alignItems="center">
                  <Border radius="large">
                    <RemoteImage
                      url="https://firebasestorage.googleapis.com/v0/b/babytracker-c9194.appspot.com/o/newsImages%2Fnathan-dumlao-rUsi-dLgC_4-unsplash.jpg?alt=media&token=178ee742-375d-4597-b7cc-b1e81a8409ce"
                      width={50}
                    />
                  </Border>
                  <Text type="headline3" role="primary">
                    {userInfo.name}
                  </Text>
                  <Text type="primaryBody2" role="primary">
                    {moment().diff(bornDateMoment, 'months')}
                    {' сартай'}
                  </Text>
                </Queue>
              </Padding>
            </Border>
            <Text type="headline3">Өдөр тутам</Text>
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              {categoryData &&
                categoryData.map(category => {
                  let { image, name } = category;
                  return <DailyRoutine url={image} name={name} />;
                })}
            </View>
            <Border topWidth="medium" role="info" />
            <Text type="headline3">Шинэ мэдээ</Text>
            <NewsList limit={3} isSaved={false} />
            <Button
              backgroundRole="info"
              radius="xmedium"
              size={[4, 0, 4, 0]}
              onPress={gotoCategoryScreen}
              textRole="light">
              Категори Сонгох
            </Button>
            <Button
              backgroundRole="info"
              radius="xmedium"
              size={[4, 0, 4, 0]}
              onPress={() => {
                signOut();
                navigation.navigate(NavigationRoutes.WelcomeScreen);
              }}
              textRole="light">
              Logout {user?.phoneNumber}
            </Button>
          </Stack>
        </Margin>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
