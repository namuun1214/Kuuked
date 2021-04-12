import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  Pressable,
  useWindowDimensions,
  View,
} from 'react-native';
import { Border, Margin, Stack, Text } from '../../index';
import { Header } from '../../header';
import { Center, Overlay, Padding, Queue } from '../../layout';
import { useFirestoreCollection } from '../../../firebase';
import { RemoteImage } from '../../core';
import { NavigationRoutes } from '../../navigation/navigation-param';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Route } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { CardIcon, ItemizeIcon, SaveIcon } from '../../../assets';
import moment from 'moment';

const NewsDetailScreen = () => {
  const window = useWindowDimensions().width;
  const router = useRoute<Route<string, any>>();
  const item = router.params || {};
  const [saved, setSaved] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header withBack={true} headerText="Мэдээ мэдээлэл" />
      <ScrollView>
        <Margin size={[5, 5, 5, 5]}>
          <Stack size={5}>
            <View style={{ maxHeight: 300 }}>
              <Center>
                <Border radius="large">
                  <RemoteImage url={item?.image} />
                </Border>
              </Center>
            </View>
            <Queue justifyContent="space-between" alignItems="center">
              <Text type="secondaryBody1" textAlign="left">
                {item?.title}
              </Text>
              <Pressable
                onPress={() => {
                  console.log(saved);
                  setSaved(!saved);
                }}>
                <SaveIcon saved={saved} />
              </Pressable>
            </Queue>
            <Queue justifyContent="space-between" alignItems="center">
              <Text role="tertiary">{item?.author || 'Эзэнгүй мэдээ'}</Text>
              <Text role="tertiary">
                {moment
                  .unix(item?.createdAt.seconds)
                  .format('MM/DD/YYYY dd')
                  .toString()}
              </Text>
            </Queue>

            <Border topWidth="medium" role="info" />
            {item?.ingredient && <Text>Орц</Text>}
            {item?.ingredient &&
              item?.ingredient.map(a => {
                return (
                  <Queue justifyContent="flex-start">
                    <ItemizeIcon />
                    <Text role="info">{a}</Text>
                  </Queue>
                );
              })}
            {item?.ingredient && <Text>Хийх арга</Text>}
            <Text textAlign="justify" type="paragraph" role="paragraph">
              {item?.content}
            </Text>
          </Stack>
        </Margin>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsDetailScreen;
