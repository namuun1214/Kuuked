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
export const SurgeryList = () => {
  const uid = useUserUID();
  const navigation = useNavigation();
  const { data } = useFirestoreCollection([USERS_HOME, uid, 'surgery']);
  return (
    <Stack size={3}>
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
                      {item.doctorName} {' эмч'}
                    </Text>
                    <Text role="tertiary">
                      {/* {moment
                        .unix(item.createdAt.seconds)
                        .format('MM/DD/YYYY')
                        .toString()} */}
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
        textRole="light"
        onPress={() => {
          navigation.navigate(NavigationRoutes.HealthLogScreen);
        }}>
        Шинээр бүртгэх
      </Button>
    </Stack>
  );
};
