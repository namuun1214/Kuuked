import React, { useContext, useEffect, useState } from 'react';
import { Button, Input, SuccessPopUp, Text } from '../..';
import { Center, Queue, Stack } from '../../layout';
import DatePicker from 'react-native-datepicker';
import { StyleSheet, Image, Platform, View } from 'react-native';
import { AddImageIcon } from '../../../assets';
import { PermissionContext } from '../../../permission/photoPermission';
import { useFirestoreCollection } from '../../../firebase';
import { USERS_HOME, useUserUID } from '../../../authentication';
import { useNavigation } from '@react-navigation/core';
import { NavigationRoutes } from '../../navigation/navigation-param';
export const SymptomLog = () => {
  const { filePath, chooseFile } = useContext(PermissionContext);
  const [date, setDate] = useState('2020-05-15');
  const [data, setData] = useState({});
  const [isDone, setDone] = useState(false);
  const uid = useUserUID();
  const navigation = useNavigation();
  const { createRecord } = useFirestoreCollection([
    USERS_HOME,
    uid,
    'symptoms',
  ]);
  const saveSymptom = async () => {
    await createRecord(data);
    setDone(true);
    navigation.navigate(NavigationRoutes.MainRoot);
  };
  useEffect(() => {
    setData({ ...data, images: filePath });
  }, [filePath]);
  const styles = StyleSheet.create({
    imageStyle: {
      width: 100,
      height: 100,
      margin: 5,
      borderRadius: 5,
    },
  });
  return (
    <>
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
        <Stack size={2}>
          <Text type="secondaryBody1" role="tertiary">
            Шинж тэмдэг
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
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {filePath &&
            filePath.map(file => {
              return (
                <Image source={{ uri: file.uri }} style={styles.imageStyle} />
              );
            })}
        </View>
        <Button
          radius="xlarge"
          backgroundRole="light"
          leftIcon={<AddImageIcon />}
          onPress={() => {
            chooseFile('photo');
          }}>
          Зураг оруулах
        </Button>
        <Stack size={2}>
          <Text type="secondaryBody1" role="tertiary">
            Хэзээнээс илэрсэн
          </Text>
          <Queue size={3} justifyContent="space-between" alignItems="center">
            <Input
              width={150}
              radius="large"
              backgroundRole="light"
              size={Platform.OS === 'ios' ? [4, 0, 4, 4] : [2, 0, 2, 4]}
              role="info"
              keyboardType="numeric"
              onChangeText={text => {
                setData({ ...data, when: text });
              }}
            />

            <Text> хоногийн өмнөөс</Text>
          </Queue>
        </Stack>
        <Stack size={2}>
          <Text type="secondaryBody1" role="tertiary">
            Авсан арга хэмжээ
          </Text>
          <Input
            height={80}
            multiline={true}
            radius="large"
            backgroundRole="light"
            size={Platform.OS === 'ios' ? [4, 0, 4, 4] : [2, 0, 2, 4]}
            role="info"
            onChangeText={value => {
              setData({ ...data, respond: value });
            }}
          />
        </Stack>
        <Button
          backgroundRole="success"
          radius="xlarge"
          size={[4, 7, 4, 7]}
          textRole="light"
          onPress={saveSymptom}>
          Бүртгэх
        </Button>
      </Stack>
      {isDone && <SuccessPopUp />}
    </>
  );
};
