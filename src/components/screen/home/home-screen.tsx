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
import { Shadow } from '../../core';
const window = Dimensions.get('window');

export const DailyRoutine = props => {
  const navigation = useNavigation();
  const { name, url } = props;
  return (
    <Pressable
      onPress={() => {
        navigation.navigate(NavigationRoutes.DailyScreen, { name });
      }}>
      <Margin size={[2, 2, 2, 2]}>
        <Shadow>
          <Border
            radius="large"
            role="primary"
            lineWidth="light"
            backgroundRole="light">
            <Padding size={[2, 2, 2, 2]}>
              <Stack size={2} width={window.width / 4}>
                <Center>
                  <RemoteImage width={65} resizeMode="contain" url={url} />
                </Center>
                <Text type="tertiaryBody2" numberOfLines={2} textAlign="center">
                  {name}
                </Text>
              </Stack>
            </Padding>
          </Border>
        </Shadow>
      </Margin>
    </Pressable>
  );
};

const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const { userInfo, userAge } = useContext(UserContext);
  const navigation = useNavigation();
  const { catalog: categoryData } = useContext(CatalogContext);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header withBack={false} headerText="???????? ????????????" />
      <ScrollView>
        <Margin size={[2, 3, 2, 3]}>
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
                    {userAge}
                    {' ????????????'}
                  </Text>
                </Queue>
              </Padding>
            </Border>
            <Text type="headline3">???????? ??????????</Text>
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
            <Text type="headline3">???????? ??????????</Text>
            <NewsList limit={3} isSaved={false} />
            <Button
              borderRole="info"
              backgroundRole="lightCyan"
              size={[2, 2, 2, 2]}
              onPress={() => {
                navigation.navigate(NavigationRoutes.NewsScreen);
              }}
              textRole="tertiary">
              ??????????????????????
            </Button>
          </Stack>
        </Margin>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
