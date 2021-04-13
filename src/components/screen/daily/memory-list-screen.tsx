import { useNavigation } from '@react-navigation/core';
import _ from 'lodash';
import moment from 'moment';
import React, { memo, useContext, useState } from 'react';
import { StyleSheet, Platform, Image, View, ImageBase } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Border,
  Button,
  Input,
  Margin,
  Stack,
  SuccessPopUp,
  Text,
} from '../..';
import { AddImageIcon } from '../../../assets';
import { USERS_HOME, useUserUID } from '../../../authentication';
import { useFirestoreCollection } from '../../../firebase';
import { PermissionContext } from '../../../permission/photoPermission';
import { delay } from '../../../utils';
import { Header } from '../../header';
import { Padding, Queue } from '../../layout';
import { NavigationRoutes } from '../../navigation/navigation-param';
const Memory = ({ item }) => {
  const styles = StyleSheet.create({
    imageStyle: {
      width: 100,
      height: 100,
      margin: 5,
      borderRadius: 5,
    },
  });
  return (
    <Border backgroundRole="light" radius="large">
      <Padding size={[3, 3, 3, 3]}>
        <Queue justifyContent="flex-start" size={3}>
          {item?.articles.map(item => {
            return (
              <Border backgroundRole="lightYellow" radius="large">
                <Padding size={[2, 3, 2, 3]}>
                  <Text>{item}</Text>
                </Padding>
              </Border>
            );
          })}
        </Queue>
        <Queue>
          {item?.images &&
            item?.images.map(value => {
              return (
                <Image source={{ uri: value.uri }} style={styles.imageStyle} />
              );
            })}
        </Queue>
        <Border topWidth="thick">
          <Queue justifyContent="space-between">
            <Text>{item?.note}</Text>
            <Text role="tertiary">
              {moment
                .unix(item?.createdAt.seconds)
                .format('MM/DD/YYYY dd')
                .toString()}
            </Text>
          </Queue>
        </Border>
      </Padding>
    </Border>
  );
};
export const MemoryListScreen = () => {
  const navigation = useNavigation();
  const uid = useUserUID();
  const { data: memeoryList } = useFirestoreCollection([
    USERS_HOME,
    uid,
    'memory',
  ]);
  return (
    <SafeAreaView>
      <Header withBack={true} headerText="Дурсамжууд" />
      <ScrollView>
        <Margin size={[5, 5, 5, 5]}>
          <Stack size={4}>
            {memeoryList &&
              memeoryList.map(item => {
                return <Memory item={item} />;
              })}
          </Stack>
        </Margin>
      </ScrollView>
    </SafeAreaView>
  );
};
