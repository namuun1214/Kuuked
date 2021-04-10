import React, { useContext } from 'react';
import { Dimensions, Pressable, SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Border, Button, Margin, RemoteImage, Stack, Text } from '../../index';
import { Header } from '../../header';
import { ScrollView } from 'react-native-gesture-handler';
import { Center, Padding } from '../../layout';
import { NavigationRoutes } from '../../navigation/navigation-param';
import { CatalogContext } from '../category/categoryProvider';
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
  // const { uid } = useUserUID();
  const navigation = useNavigation();
  const { catalog: categoryData } = useContext(CatalogContext);
  const gotoCategoryScreen = () => {
    navigation.navigate(NavigationRoutes.SelectCategoryScreen);
  };
  categoryData && console.log(categoryData, 'egeg');
  return (
    <SafeAreaView>
      <Header withBack={true} headerText="Нүүр хуудас" />
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
                  let { url, name } = category;
                  return <DailyRoutine url={url} name={name} />;
                })}
            </View>
            <Button
              backgroundRole="info"
              radius="xmedium"
              size={[4, 0, 4, 0]}
              onPress={gotoCategoryScreen}
              textRole="light">
              Категори Сонгох
            </Button>
          </Stack>
        </Margin>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
