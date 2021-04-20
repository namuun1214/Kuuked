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
import {
  useFirestoreCollection,
  useFirestoreDocument,
} from '../../../firebase';
import { USERS_HOME, useUserUID } from '../../../authentication';
import moment from 'moment';
import { useNavigation } from '@react-navigation/core';
import { PopUp } from '../../pop-up';
import { UserContext } from '../home/userProvider';
const MonthResult = () => {
  const uid = useUserUID();
  const { data: routineData } = useFirestoreCollection([
    USERS_HOME,
    uid,
    'routine',
  ]);
  const { catalog } = useContext(CatalogContext);
  let routineDateList = [];
  routineData &&
    routineData.map(item => {
      routineDateList.push(
        moment.unix(item?.createdAt.seconds).format('MM/DD').toString(),
      );
    });
  routineDateList = _.uniq(routineDateList);
  // const navigation = useNavigation();
  // const groupedData = _.mapValues(_.groupBy(routineData, 'catalog'), list =>
  //   list.map(item => _.omit(item, 'catalog')),
  // );
  routineData && console.log(JSON.stringify(routineData));
  const { userAge } = useContext(UserContext);
  const [isPopUpDisplay, setPopUpDisplay] = useState(false);
  const { data: modelData } = useFirestoreDocument([
    'modelData',
    'od8LHek9xy251Bi3BVzj',
  ]);
  const setCompareClicked = () => {
    setPopUpDisplay(true);
  };
  return (
    <Margin size={[3, 5, 3, 5]}>
      <Stack size={3}>
        {routineDateList.map(routine => {
          return (
            <Pressable
              onPress={() => {
                // navigation.navigate()
              }}>
              <Shadow>
                <Border backgroundRole="light" radius="large">
                  <Padding size={[3, 3, 3, 5]}>
                    <Queue alignItems="center" size={4}>
                      <Text type="headline2">{routine}</Text>
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
                              <View style={{ width: 100 }}>
                                <Queue
                                  justifyContent="flex-start"
                                  alignItems="center">
                                  <Padding size={[2, 0, 2, 0]}>
                                    <RemoteImage
                                      width={25}
                                      resizeMode="contain"
                                      url={item.image}
                                    />
                                  </Padding>
                                  <Spacer horizintal={false} size={2} />
                                  <Text type="secondaryBody1">2цаг</Text>
                                </Queue>
                              </View>
                            );
                          })}
                      </View>
                    </Queue>
                  </Padding>
                </Border>
              </Shadow>
            </Pressable>
          );
        })}
        <Button
          type="primaryBody2"
          backgroundRole="success"
          textRole="light"
          size={[3, 2, 3, 2]}
          onPress={() => {
            setCompareClicked();
          }}>
          Жишигтэй харьцуулах
        </Button>
      </Stack>
      {isPopUpDisplay && (
        <PopUp>
          <Padding size={[2, 3, 2, 3]}>
            <Stack size={3}>
              <Text>
                Таны хүүхдийн насны хүүхэд {modelData?.drinkSize[userAge][0]} -{' '}
                {modelData?.drinkSize[userAge][1]} хэмжээний юм уух ёстой.
              </Text>
              <Button
                backgroundRole="success"
                textRole="light"
                onPress={() => {
                  setPopUpDisplay(false);
                }}>
                Буцах
              </Button>
            </Stack>
          </Padding>
        </PopUp>
      )}
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
  const [isDetailClicked, setDetailClicked] = useState({});
  const eventClicked = event => {
    setDetailClicked(event);
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
      {!_.isEmpty(isDetailClicked) && (
        <PopUp>
          <Stack size={4}>
            <Text role="success" textAlign="center">
              {isDetailClicked.title}
            </Text>
            <Queue justifyContent="space-between">
              <Text role="tertiary"> Эхэлсэн цаг</Text>
              <Text>{isDetailClicked.start}</Text>
            </Queue>
            <Queue justifyContent="space-between">
              <Text role="tertiary"> Дууссан цаг</Text>
              <Text>{isDetailClicked.end}</Text>
            </Queue>
            <Queue justifyContent="space-between">
              <Text role="tertiary"> Тэмдэглэл</Text>
              <Text>{isDetailClicked.summary}</Text>
            </Queue>
            <Button
              backgroundRole="success"
              textRole="light"
              onPress={() => {
                setDetailClicked({});
              }}>
              Буцах
            </Button>
          </Stack>
        </PopUp>
      )}
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
