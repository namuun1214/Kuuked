import _ from 'lodash';
import React, { useContext, useState } from 'react';
import { Alert, Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Border, Button, RemoteImage, Shadow, Text } from '../../core';
import { Header } from '../../header';
import { Center, Margin, Padding, Queue, Spacer, Stack } from '../../layout';
import { CatalogContext } from '../category/categoryProvider';
import EventCalendar from 'react-native-events-calendar';
import { SafeAreaScreen } from '..';
import { useFirestoreCollection } from '../../../firebase';
import { USERS_HOME, useUserUID } from '../../../authentication';
import moment from 'moment';
import { cos } from 'react-native-reanimated';
const MonthResult = () => {
  const { catalog } = useContext(CatalogContext);
  return (
    <Margin size={[3, 5, 3, 5]}>
      <Stack size={3}>
        <Pressable>
          <Shadow>
            <Border backgroundRole="light" radius="large">
              <Padding size={[3, 3, 3, 5]}>
                <Queue alignItems="center" size={4}>
                  <Text type="headline2">1</Text>
                  <Border
                    leftWidth="medium"
                    role="info"
                    backgroundRole="yellow"
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignContent: 'space-between',
                      flexWrap: 'wrap',
                    }}>
                    {catalog &&
                      catalog.map(item => {
                        return (
                          <Queue
                            justifyContent="space-between"
                            alignItems="center">
                            <Padding size={[2, 0, 2, 0]}>
                              <Border
                                role="light"
                                lineWidth="light"
                                radius="large"
                                backgroundRole="lightYellow">
                                <RemoteImage
                                  width={30}
                                  resizeMode="contain"
                                  url={item.image}
                                />
                              </Border>
                            </Padding>
                            <Spacer horizintal={false} size={2} />
                            <Text>2цаг 30 ми</Text>
                          </Queue>
                        );
                      })}
                  </View>
                </Queue>
              </Padding>
            </Border>
          </Shadow>
        </Pressable>
        <Text>hah</Text>
        <Text>hah</Text>
        <Text>hah</Text>
        <Text>hah</Text>
      </Stack>
    </Margin>
  );
};
const DayResult = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  const uid = useUserUID();
  const { data: routineData } = useFirestoreCollection([
    USERS_HOME,
    uid,
    'routine',
  ]);
  const eventuud = [{}];

  routineData &&
    routineData.map(item => {
      const date = moment
        .unix(item.createdAt.seconds)
        .format('YYYY-MM-DD')
        .toString();
      const startTime =
        date + ' ' + item.startTime.hour + ':' + item.startTime.minute + ':00';

      const endTime =
        date + ' ' + item.endTime.hour + ':' + item.endTime.minute + ':00';

      eventuud.push({
        start: startTime,
        end: endTime,
        title: item.catalog,
        summary: item.note,
      });
    });

  const eventClicked = event => {
    //On Click of event showing alert from here
    Alert.alert(JSON.stringify(event));
  };
  let { width } = Dimensions.get('window');
  return (
    // <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <EventCalendar
        eventTapped={eventClicked}
        events={eventuud}
        width={width}
        size={60}
        initDate={'2021-04-11'}
        // scrollToFirst={false}
      />
    </View>
    // </SafeAreaView>
  );
};
export const LogResultScreen = () => {
  const [selectedName, setSelectedName] = useState('month');
  const isSelected = (name: any) => _.isEqual(selectedName, name);
  return (
    <SafeAreaScreen>
      <Header withBack={true} headerText="Үр дүн" />
      <Margin size={[5, 5, 5, 5]}>
        <Stack size={2}>
          <Queue justifyContent="space-around" alignItems="center">
            <Button
              backgroundRole={isSelected('day') ? 'info' : 'transparent'}
              textRole={isSelected('day') ? 'light' : 'tertiary'}
              size={[3, 3, 3, 3]}
              radius="xlarge"
              onPress={() => {
                setSelectedName('day');
              }}>
              Өдрөөр
            </Button>
            <Button
              size={[3, 3, 3, 3]}
              radius="xlarge"
              backgroundRole={isSelected('month') ? 'info' : 'transparent'}
              textRole={isSelected('month') ? 'light' : 'tertiary'}
              onPress={() => {
                setSelectedName('month');
              }}>
              Сараар
            </Button>
            <Button
              size={[3, 3, 3, 3]}
              radius="xlarge"
              backgroundRole={isSelected('week') ? 'info' : 'transparent'}
              textRole={isSelected('week') ? 'light' : 'tertiary'}
              onPress={() => {
                setSelectedName('week');
              }}>
              7 хоногоор
            </Button>
          </Queue>
        </Stack>
      </Margin>

      {selectedName === 'month' ? (
        <ScrollView>
          <MonthResult />
        </ScrollView>
      ) : selectedName === 'day' ? (
        <DayResult />
      ) : (
        <Text>hah</Text>
      )}
    </SafeAreaScreen>
  );
};
