import { useNavigation } from '@react-navigation/core';
import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { Pressable } from 'react-native';
import { EmptyIcon } from '../../../assets';
import { USERS_HOME, useUserUID } from '../../../authentication';
import { useFirestoreCollection } from '../../../firebase';
import { Border, Button, Text } from '../../core';
import { Center, Padding, Queue, Stack } from '../../layout';
import { NavigationRoutes } from '../../navigation/navigation-param';
import { SymptomLog } from './symptom-log';
export const SymptomList = () => {
  const uid = useUserUID();
  const navigation = useNavigation();
  const { data } = useFirestoreCollection([USERS_HOME, uid, 'symptoms']);
  console.log(data);
  return (
    <Stack size={3}>
      {data && _.isEmpty(data) && (
        <Stack size={3}>
          <Center>
            <EmptyIcon />
            <Text textAlign="center">Одоогоор бүртгэл байхгүй байна</Text>
          </Center>
        </Stack>
      )}
      {data &&
        data.map(item => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate(NavigationRoutes.HealthDetailScreen, item);
              }}>
              <Border
                radius="large"
                backgroundRole="light"
                role="light"
                lineWidth="light">
                <Padding size={[5, 3, 5, 3]}>
                  <Queue justifyContent="space-between">
                    <Text>
                      {' '}
                      {item.symptom.slice(0, 30)}
                      {'...'}
                    </Text>
                    <Text role="tertiary">
                      {moment
                        .unix(item?.createdAt?.seconds)
                        .format('MM/DD/YYYY')
                        .toString()}
                    </Text>
                  </Queue>
                </Padding>
              </Border>
            </Pressable>
          );
        })}
      <Button
        radius="large"
        textRole="light"
        backgroundRole="success"
        onPress={() => {
          navigation.navigate(NavigationRoutes.HealthLogScreen);
        }}>
        Шинээр бүртгэх
      </Button>
    </Stack>
  );
};
