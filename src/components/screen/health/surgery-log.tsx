import React, { useContext, useEffect, useState } from 'react';
import { Border, Button, Input, SuccessPopUp, Text } from '../..';
import { Center, Overlay, Padding, Queue, Stack } from '../../layout';
import DatePicker from 'react-native-datepicker';
import { StyleSheet, Platform, Pressable, View } from 'react-native';
import { DoctorCallIcon, DoctorIcon } from '../../../assets';
import { PermissionContext } from '../../../permission/photoPermission';
import { useNavigation } from '@react-navigation/core';
import { NavigationRoutes } from '../../navigation/navigation-param';
import { USERS_HOME, useUserUID } from '../../../authentication';
import { useFirestoreCollection } from '../../../firebase';
import { DropDown } from '../../dropdown';
import _ from 'lodash';
export const SurgeryLog = () => {
  const [date, setDate] = useState('2020-05-15');
  const [data, setData] = useState({});
  const [isDone, setDone] = useState(false);
  const uid = useUserUID();
  const [selectedName, setSelectedName] = useState();
  const { createRecord } = useFirestoreCollection([USERS_HOME, uid, 'surgery']);
  const { data: symptomData } = useFirestoreCollection([
    USERS_HOME,
    uid,
    'symptoms',
  ]);
  const saveSurgery = async () => {
    await createRecord(data);
    setDone(true);
    navigation.navigate(NavigationRoutes.HealthScreen);
  };
  useEffect(() => {
    setData({ ...data, symptom: selectedName });
  }, [selectedName]);

  const navigation = useNavigation();
  return (
    <Stack size={4}>
      <Stack size={2}>
        <Text type="secondaryBody1" role="tertiary">
          Он сар өдөр
        </Text>
        <DatePicker
          date={date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2016-05-01"
          maxDate="2016-06-01"
          confirmBtnText="Болсон"
          cancelBtnText="Болих"
          onDateChange={value => {
            setDate(value);
            setData({ ...data, date: value });
          }}
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
              borderRadius: 12,
              backgroundColor: '#FFFFFF',
              borderColor: '#FFFFFF',
            },
          }}
        />
      </Stack>
      <Queue size={3} justifyContent="space-between" alignItems="center">
        <Stack size={2}>
          <Queue>
            <Text type="secondaryBody1" role="tertiary">
              Өндөр
            </Text>
            <Text> / см</Text>
          </Queue>
          <Input
            width={80}
            radius="large"
            backgroundRole="light"
            size={Platform.OS === 'ios' ? [4, 0, 4, 4] : [2, 0, 2, 4]}
            role="info"
            keyboardType="numeric"
            onChangeText={text => {
              setData({ ...data, height: text });
            }}
          />
        </Stack>

        <Stack size={2}>
          <Queue>
            <Text type="secondaryBody1" role="tertiary">
              Жин
            </Text>
            <Text> / кг</Text>
          </Queue>
          <Input
            width={80}
            radius="large"
            backgroundRole="light"
            size={Platform.OS === 'ios' ? [4, 0, 4, 4] : [2, 0, 2, 4]}
            role="info"
            keyboardType="numeric"
            onChangeText={text => {
              setData({ ...data, width: text });
            }}
          />
        </Stack>
        <Stack size={2}>
          <Queue>
            <Text type="secondaryBody1" role="tertiary">
              Т.тойрог
            </Text>
            <Text> / см</Text>
          </Queue>
          <Input
            width={80}
            radius="large"
            backgroundRole="light"
            size={Platform.OS === 'ios' ? [4, 0, 4, 4] : [2, 0, 2, 4]}
            role="info"
            keyboardType="numeric"
            onChangeText={text => {
              setData({ ...data, head: text });
            }}
          />
        </Stack>
      </Queue>
      <View style={{ flexDirection: 'column' }}>
        <Text type="secondaryBody1" role="tertiary">
          Зовиур
        </Text>
        <DropDown.Provider>
          <DropDown.Trigger width={340}>{selectedName}</DropDown.Trigger>
          <DropDown.Content width={340}>
            <Stack size={3}>
              {!_.isEmpty(symptomData) ? (
                symptomData.map(item => {
                  return (
                    <Border bottomWidth="xlight" role="secondary">
                      <Padding size={[0, 2, 2, 2]}>
                        <Pressable
                          onPress={() => {
                            setSelectedName(item.symptom);
                          }}>
                          <Text role="tertiary">{item.symptom}</Text>
                        </Pressable>
                      </Padding>
                    </Border>
                  );
                })
              ) : (
                <Text role="tertiary">Одоогоор бүртгэл байхгүй байна</Text>
              )}
            </Stack>
          </DropDown.Content>
        </DropDown.Provider>
      </View>
      <Stack size={2}>
        <Text type="secondaryBody1" role="tertiary">
          Үзлэгийн тэмдэглэл
        </Text>
        <Input
          height={80}
          multiline={true}
          radius="large"
          backgroundRole="light"
          size={Platform.OS === 'ios' ? [4, 0, 4, 4] : [2, 0, 2, 4]}
          role="info"
          onChangeText={value => {
            setData({ ...data, note: value });
          }}
        />
      </Stack>
      <Stack size={2}>
        <Text type="secondaryBody1" role="tertiary">
          Бичсэн эмчилгээ
        </Text>
        <Input
          height={80}
          multiline={true}
          radius="large"
          backgroundRole="light"
          size={Platform.OS === 'ios' ? [4, 0, 4, 4] : [2, 0, 2, 4]}
          role="info"
          onChangeText={value => {
            setData({ ...data, treatment: value });
          }}
        />
      </Stack>
      <Stack size={2}>
        <Text type="secondaryBody1" role="tertiary">
          Эмчийн нэр утас
        </Text>
        <Input
          alignment="right"
          leftIcon={<DoctorIcon />}
          radius="large"
          backgroundRole="light"
          size={Platform.OS === 'ios' ? [4, 0, 4, 4] : [2, 0, 2, 4]}
          role="info"
          onChangeText={value => {
            setData({ ...data, doctorName: value });
          }}
        />
        <Input
          alignment="right"
          leftIcon={<DoctorCallIcon />}
          radius="large"
          backgroundRole="light"
          size={Platform.OS === 'ios' ? [4, 0, 4, 4] : [2, 0, 2, 4]}
          role="info"
          keyboardType="numeric"
          onChangeText={value => {
            setData({ ...data, doctorPhone: value });
          }}
        />
      </Stack>
      <Button
        backgroundRole="success"
        radius="xlarge"
        size={[4, 7, 4, 7]}
        textRole="light"
        onPress={() => {
          saveSurgery();
        }}>
        Бүртгэх
      </Button>
      {isDone && <SuccessPopUp />}
    </Stack>
  );
};
