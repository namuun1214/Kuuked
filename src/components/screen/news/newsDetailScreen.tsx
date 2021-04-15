import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Pressable,
  useWindowDimensions,
  View,
} from 'react-native';
import { Border, Margin, Stack, Text } from '../../index';
import { Header } from '../../header';
import { Center, Queue, Spacer } from '../../layout';
import { RemoteImage } from '../../core';
import { useRoute } from '@react-navigation/core';
import { Route } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { ItemizeIcon, SaveIcon } from '../../../assets';
import moment from 'moment';
import { useFirestoreCollection } from '../../../firebase';
import { USERS_HOME, useUserUID } from '../../../authentication';
import { SuccessPopUp } from '../../pop-up';
import { delay } from '../../../utils';

const NewsDetailScreen = () => {
  const window = useWindowDimensions().width;
  const router = useRoute<Route<string, any>>();
  const { item, isSaved } = router.params || {};
  const isRecipe = item?.ingredient;
  const [saved, setSaved] = useState();
  const uid = useUserUID();
  const { createRecord } = useFirestoreCollection([
    USERS_HOME,
    uid,
    isRecipe ? 'savedRecipes' : 'savedNews',
  ]);
  const [isDone, setDone] = useState(false);
  useEffect(async () => {
    if (saved) {
      createRecord(item);
      setDone(true);
      await delay(1000);
      setDone(false);
    } else {
      console.log('ustgalaa');
    }
  }, [saved]);
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
                  setSaved(!saved);
                }}>
                {!!!isSaved && <SaveIcon saved={saved} />}
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
            {isRecipe && <Text>Орц</Text>}
            {isRecipe &&
              isRecipe.map(a => {
                return (
                  <Queue>
                    <ItemizeIcon />
                    <Spacer horizontal={false} size={3} />
                    <Text role="info">{a}</Text>
                  </Queue>
                );
              })}
            {isRecipe && <Text>Хийх арга</Text>}
            {item?.content &&
              item?.content.map(value => {
                return (
                  <Text textAlign="justify" type="paragraph" role="paragraph">
                    {value}
                  </Text>
                );
              })}
          </Stack>
        </Margin>
      </ScrollView>
      {isDone && <SuccessPopUp description="Амжилттай хадгалагдлаа" />}
    </SafeAreaView>
  );
};

export default NewsDetailScreen;
