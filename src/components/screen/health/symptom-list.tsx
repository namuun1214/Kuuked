import { useNavigation } from '@react-navigation/core';
import moment from 'moment';
import React from 'react';
import { Pressable } from 'react-native';
import { USERS_HOME, useUserUID } from '../../../authentication';
import { useFirestoreCollection } from '../../../firebase';
import { Border, Button, Text } from '../../core';
import { Padding, Queue, Stack } from '../../layout';
import { NavigationRoutes } from '../../navigation/navigation-param';
import { SymptomLog } from './symptom-log';
export const SymptomList = () => {
  const uid = useUserUID();
  const navigation = useNavigation();
  const { data } = useFirestoreCollection([USERS_HOME, uid, 'symptoms']);
  return (
    <Stack size={3}>
      {data &&
        data.map(item => {
          console.log(
            moment.unix(item.createdAt.seconds).format('MM/DD/YYYY').toString(),
          );
          return (
            <Pressable
              onPress={() => {
                navigation.navigate(NavigationRoutes.HealthScreen);
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
                        .unix(item.createdAt.seconds)
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
        backgroundRole="success"
        onPress={() => {
          navigation.navigate(NavigationRoutes.HealthScreen);
        }}>
        Шинээр бүртгэх
      </Button>
    </Stack>
  );
};
