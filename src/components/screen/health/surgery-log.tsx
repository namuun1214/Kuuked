import React, { useContext, useState } from 'react';
import { Button, Input, Text } from '../..';
import { Center, Queue, Stack } from '../../layout';
import DatePicker from 'react-native-datepicker';
import { StyleSheet, Platform } from 'react-native';
import { DoctorCallIcon, DoctorIcon } from '../../../assets';
import { PermissionContext } from '../../../permission/photoPermission';
export const SurgeryLog = () => {
  const [date, setDate] = useState('2020-05-15');
  const [data, setData] = useState({
    date: '',
    height: '',
    width: '',
    head: '',
    symptom: '',
  });
  const styles = StyleSheet.create({
    imageStyle: {
      width: 100,
      height: 100,
      margin: 5,
      borderRadius: 5,
    },
  });
  return (
    <Stack size={4}>
      <Stack size={2}>
        <Text type="secondaryBody1" role="tertiary">
          Он сар өдөр
        </Text>
        <Center>
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
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
                borderColor: '#FFFFFF',
              },
            }}
          />
        </Center>
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
      <Stack size={2}>
        <Text type="secondaryBody1" role="tertiary">
          Зовиур
        </Text>
        <Input
          height={80}
          multiline={true}
          radius="large"
          backgroundRole="light"
          size={Platform.OS === 'ios' ? [4, 0, 4, 4] : [2, 0, 2, 4]}
          role="info"
          onChangeText={value => {
            setData({ ...data, symptom: value });
          }}
        />
      </Stack>
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
            // setNewMemory({ ...newMemory, note: value });
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
            // setNewMemory({ ...newMemory, note: value });
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
            // setNewMemory({ ...newMemory, note: value });
          }}
        />
        <Input
          alignment="right"
          leftIcon={<DoctorCallIcon />}
          radius="large"
          backgroundRole="light"
          size={Platform.OS === 'ios' ? [4, 0, 4, 4] : [2, 0, 2, 4]}
          role="info"
          onChangeText={value => {
            // setNewMemory({ ...newMemory, note: value });
          }}
        />
      </Stack>
      <Button
        backgroundRole="success"
        radius="xlarge"
        size={[4, 7, 4, 7]}
        textRole="light"
        // onPress={saveRoutine}
      >
        Бүртгэх
      </Button>
      {/* {isDone && <SuccessPopUp />} */}
    </Stack>
  );
};
