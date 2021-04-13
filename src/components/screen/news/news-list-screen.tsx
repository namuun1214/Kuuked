import React, { useState } from 'react';
import { Dimensions, Pressable, SafeAreaView } from 'react-native';
import { Border, Margin, Stack, Text } from '../../index';
import { Header } from '../../header';
import { ScrollView } from 'react-native-gesture-handler';
import { Padding, Queue } from '../../layout';
import { useFirestoreCollection } from '../../../firebase';
import { RemoteImage } from '../../core';
import { NavigationRoutes } from '../../navigation/navigation-param';
import { useNavigation } from '@react-navigation/core';
import _ from 'lodash';
import { Route, useRoute } from '@react-navigation/native';
import { USERS_HOME, useUserUID } from '../../../authentication';
const window = Dimensions.get('window');
export const NewsList = ({ limit, isSaved }) => {
  const gotoDetail = (item: object | undefined) => {
    navigation.navigate(NavigationRoutes.NewsDetailScreen, { item, isSaved });
  };
  const uid = useUserUID();
  const navigation = useNavigation();
  const { data } = useFirestoreCollection(
    isSaved ? [USERS_HOME, uid, 'savedNews'] : ['news'],
  );
  let newsList;
  if (limit) {
    newsList = _.slice(data, 0, limit);
  } else {
    newsList = data;
  }
  return (
    <Stack size={5}>
      {newsList &&
        newsList.map(
          (item: {
            image: string | undefined;
            title: string | JSX.Element | JSX.Element[] | undefined;
            content: string;
            article: any[];
          }) => {
            return (
              <Pressable
                onPress={() => {
                  console.log('dad');
                  gotoDetail(item);
                }}>
                <Queue justifyContent="space-between">
                  <Padding size={[0, 4, 2, 0]}>
                    <Border radius="medium">
                      <RemoteImage url={item?.image} width={150} />
                    </Border>
                  </Padding>
                  <Stack size={3}>
                    <Text width={180}>{item?.title}</Text>
                    <Text width={180} role="tertiary">
                      {item?.content.slice(0, 80)}
                      {'...'}
                    </Text>
                    <Queue justifyContent="space-between">
                      {item?.article?.map(
                        (
                          a: string | JSX.Element | JSX.Element[] | undefined,
                        ) => {
                          return (
                            <Border
                              backgroundRole={
                                a === 'Ээжүүдэд'
                                  ? a === 'Зар суртчилгаа'
                                    ? 'success'
                                    : 'lightCyan'
                                  : 'lightYellow'
                              }
                              radius="xlarge">
                              <Padding size={[2, 3, 2, 3]}>
                                <Text type="price" textAlign="center">
                                  {a}
                                </Text>
                              </Padding>
                            </Border>
                          );
                        },
                      )}
                    </Queue>
                  </Stack>
                </Queue>
              </Pressable>
            );
          },
        )}
    </Stack>
  );
};
const RecipeList = ({ isSaved }) => {
  const gotoDetail = (item: object | undefined) => {
    navigation.navigate(NavigationRoutes.NewsDetailScreen, { item, isSaved });
  };
  const uid = useUserUID();
  const navigation = useNavigation();
  const { data: recipeList } = useFirestoreCollection(
    isSaved ? [USERS_HOME, uid, 'savedRecipes'] : ['recipes'],
  );
  return (
    <Stack size={5}>
      {recipeList &&
        recipeList.map(
          (item: {
            image: string | undefined;
            title: string | JSX.Element | JSX.Element[] | undefined;
            content: string;
            limit: string | number | JSX.Element | undefined;
          }) => {
            return (
              <Pressable
                onPress={() => {
                  gotoDetail(item);
                }}>
                <Queue justifyContent="space-between">
                  <Padding size={[0, 4, 2, 0]}>
                    <Border radius="large">
                      <RemoteImage url={item?.image} width={150} />
                    </Border>
                  </Padding>
                  <Stack size={3}>
                    <Text width={180}>{item?.title}</Text>
                    <Text width={180} role="tertiary">
                      {item?.content.slice(0, 80)}
                      {'...'}
                    </Text>
                    <Queue justifyContent="space-between">
                      <Border
                        backgroundRole={
                          item?.limit > 3
                            ? item?.limit > 6
                              ? 'success'
                              : 'lightCyan'
                            : 'lightYellow'
                        }
                        radius="xlarge">
                        <Padding size={[2, 2, 2, 2]}>
                          <Text type="price" textAlign="center">
                            {item?.limit}
                            {'+ сар'}
                          </Text>
                        </Padding>
                      </Border>
                    </Queue>
                  </Stack>
                </Queue>
              </Pressable>
            );
          },
        )}
    </Stack>
  );
};
const NewsScreen = () => {
  const router = useRoute<Route<string, any>>();
  const { isSaved } = router?.params || {};
  const [isNewsClicked, setNewsClicked] = useState(true);
  const [isRecipeClicked, setRecipeClicked] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        withBack={true}
        headerText={isSaved ? 'Хадгалсан' : 'Мэдээ мэдээлэл'}
      />
      <Margin size={[5, 5, 5, 5]}>
        <Stack size={5}>
          <Queue justifyContent="space-between">
            <Pressable
              onPress={() => {
                setNewsClicked(!isNewsClicked);
                setRecipeClicked(isNewsClicked);
              }}>
              <Border
                radius="large"
                backgroundRole={isNewsClicked ? 'info' : 'light'}>
                <Padding size={[4, 6, 4, 6]}>
                  <Text
                    type="primaryBody1"
                    role={isNewsClicked ? 'light' : 'info'}>
                    Мэдээ
                  </Text>
                </Padding>
              </Border>
            </Pressable>
            <Pressable
              onPress={() => {
                setRecipeClicked(!isRecipeClicked);
                setNewsClicked(isRecipeClicked);
              }}>
              <Border
                radius="large"
                backgroundRole={isRecipeClicked ? 'info' : 'light'}>
                <Padding size={[4, 4, 4, 4]}>
                  <Text
                    type="primaryBody1"
                    role={isRecipeClicked ? 'light' : 'info'}>
                    Хоолны жор
                  </Text>
                </Padding>
              </Border>
            </Pressable>
          </Queue>
          <ScrollView>
            {isNewsClicked ? (
              <NewsList isSaved={isSaved} />
            ) : (
              <RecipeList isSaved={isSaved} />
            )}
          </ScrollView>
        </Stack>
      </Margin>
    </SafeAreaView>
  );
};

export default NewsScreen;
