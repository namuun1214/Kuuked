import React, { useContext } from 'react';
import { Dimensions, Pressable, SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Border, Button, Margin, RemoteImage, Stack, Text } from '../../index';
import { Header } from '../../header';
import { ScrollView } from 'react-native-gesture-handler';
import { Center, Padding } from '../../layout';
import { NavigationRoutes } from '../../navigation/navigation-param';
import { CatalogContext } from '../category/categoryProvider';
import { AuthContext } from '../../../authentication';
import { NewsList } from '../news/news-list-screen';
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
              <Text type="secondaryBody2" numberOfLines={2} textAlign="center">
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
  const { setCatalog } = useContext(CatalogContext);
  const navigation = useNavigation();
  const { catalog: categoryData } = useContext(CatalogContext);
  const gotoCategoryScreen = () => {
    navigation.navigate(NavigationRoutes.SelectCategoryScreen);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header withBack={false} headerText="Нүүр хуудас" />
      <ScrollView>
        <Margin size={[2, 3, 0, 3]}>
          <Stack size={3}>
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
                setCatalog(null);
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
