import React, { useState } from 'react';
import { Linking, Pressable, View } from 'react-native';
import { Button, Margin, Stack, Text } from '../../index';
import { Border, RemoteImage } from '../../core';
import _ from 'lodash';
import { PhoneIcon } from '../../../assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../header';
import { useFirestoreCollection } from '../../../firebase';
import { Padding, Queue } from '../../layout';
import { useNavigation } from '@react-navigation/core';
import { NavigationRoutes } from '../../navigation/navigation-param';
const HospitalInfo = ({ item }) => {
  const navigation = useNavigation();
  const onCallPhone = () => {
    console.log('hoho');
    Linking.openURL(`tel:+976${item?.phone}`);
  };
  const gotoDetail = (item: object | undefined) => {
    navigation.navigate(NavigationRoutes.EmergencyDetailScreen, item);
  };
  return (
    <Pressable
      onPress={() => {
        gotoDetail(item);
      }}>
      <Border topWidth="medium" bottomWidth="medium" role="secondary">
        <Padding size={[3, 2, 3, 2]}>
          <Queue justifyContent="space-between" alignItems="center">
            <RemoteImage url={item?.image} width={40} />
            <Stack size={3}>
              <Text type="primaryBody1">{item?.name}</Text>
              <Text type="paragraph">{item?.address}</Text>
            </Stack>
            <Pressable
              onPress={() => {
                onCallPhone();
              }}>
              <PhoneIcon />
            </Pressable>
          </Queue>
        </Padding>
      </Border>
    </Pressable>
  );
};
export const EmergencyListScreen = () => {
  const articles = [
    'Хүүхэд',
    'Эмэгтэйчүүд',
    'Шүд',
    'Харшил',
    'Гэмтэл',
    'Нярай',
    'Бусад',
  ];
  const [selectedArticles, setSelectedArticles] = useState(['']);
  const isSelected = name => _.indexOf(selectedArticles, name) > -1;
  const addArticle = newArticle => {
    if (isSelected(newArticle)) {
      setSelectedArticles(_.without(selectedArticles, newArticle));
      return;
    }
    setSelectedArticles(_.uniq([...selectedArticles, newArticle]));
  };
  const { data: hospitalList } = useFirestoreCollection(['hospitals']);
  return (
    <SafeAreaView>
      <Header withBack={true} headerText="Яаралтай тусламж" />
      <Margin size={[5, 5, 5, 5]}>
        <Stack size={5}>
          <Text>Эмнэлэгийн чиглэлүүд</Text>
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'space-around',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            {articles.map(article => {
              const selected = isSelected(article);
              return (
                <Margin size={[2, 0, 2, 0]}>
                  <Border
                    role={selected ? 'success' : 'info'}
                    lineWidth="thick"
                    radius="xlarge">
                    <Button
                      size={[1, 2, 1, 2]}
                      onPress={() => {
                        addArticle(article);
                      }}>
                      {article}
                    </Button>
                  </Border>
                </Margin>
              );
            })}
          </View>
          {hospitalList &&
            hospitalList.map(item => {
              return <HospitalInfo item={item} />;
            })}
        </Stack>
      </Margin>
    </SafeAreaView>
  );
};
