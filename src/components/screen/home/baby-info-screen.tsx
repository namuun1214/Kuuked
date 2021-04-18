import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../header';
import { Center, Margin, Queue, Stack } from '../../layout';
import { Button, SuccessPopUp } from '../..';
import {
  AddImageIcon,
  GenderFemaleIcon,
  GenderMaleIcon,
} from '../../../assets';
import { useFirestoreDocument } from '../../../firebase';
import { USERS_HOME, useUserUID } from '../../../authentication';
import { Border, Circle, Input, Text } from '../../core';
import { Image, StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { delay } from '../../../utils';
import { NavigationRoutes } from '../../navigation/navigation-param';
import { PermissionContext } from '../../../permission/photoPermission';
import { ScrollView } from 'react-native-gesture-handler';
import _ from 'lodash';
const Picker = ({ data, setData }) => {
  const [date, setDate] = useState('2020-05-15');
  return (
    <Stack size={2}>
      <Text type="secondaryBody1" role="tertiary">
        Төрсөн он сар өдөр
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

    // <Text>hh</Text>
  );
};
export const BabyInfoScreen = () => {
  const { filePath, chooseFile, captureImage, setFilePath } = useContext(
    PermissionContext,
  );
  const uid = useUserUID();
  const [loading, setLoading] = useState(false);
  const [isDone, setDone] = useState(false);
  const navigation = useNavigation();
  const { data: babyInfo, updateRecord } = useFirestoreDocument([
    USERS_HOME,
    uid,
  ]);
  const [newInfo, setNewInfo] = useState({
    name: '',
    nickname: '',
    image: '',
    sex: 'female',
    bornDate: '2020/12/12',
    weight: 3,
    height: 50,
  });
  const save = async () => {
    setLoading(true);
    await setNewInfo({ ...newInfo, image: filePath[0]?.uri });
    await updateRecord({ babyInformation: newInfo });
    setLoading(false);
    setDone(true);
    await delay(1500);
    if (babyInfo?.catalog) {
      navigation.navigate(NavigationRoutes.Home);
    } else {
      navigation.navigate(NavigationRoutes.SelectCategoryScreen);
    }
  };
  const [isMaleCliked, setMaleClicked] = useState(true);
  const styles = StyleSheet.create({
    imageStyle: {
      width: 200,
      height: 200,
    },
  });
  // const { name, nickname, image, sex, bornDate, weight, height } = babyInfo;

  return (
    <SafeAreaView>
      <Header withBack={true} headerText="Хүүхэд бүртгэл" menu={false} />
      <ScrollView>
        <Margin size={[5, 5, 5, 5]}>
          <Stack size={5}>
            {!_.isEmpty(filePath) && (
              <Center>
                <Margin size={[3, 3, 3, 3]}>
                  <Circle size={200}>
                    <Image
                      source={{ uri: filePath[0]?.uri }}
                      style={styles.imageStyle}
                    />
                  </Circle>
                </Margin>
              </Center>
            )}
            <Border role="info" radius="medium">
              <Button
                radius="xlarge"
                backgroundRole="light"
                leftIcon={<AddImageIcon />}
                onPress={() => {
                  chooseFile('photo');
                }}>
                Зураг оруулах
              </Button>
            </Border>
            <Stack size={2}>
              <Text type="secondaryBody1" role="tertiary">
                Хүүхдийн нэр
              </Text>
              <Input
                radius="large"
                backgroundRole="light"
                size={Platform.OS === 'ios' ? [4, 0, 4, 4] : [2, 0, 2, 4]}
                role="info"
                onChangeText={text => {
                  setNewInfo({ ...newInfo, name: text });
                }}
              />
            </Stack>
            <Stack size={2}>
              <Text type="secondaryBody1" role="tertiary">
                Хүүхдийн хоч/ дууддаг нэр
              </Text>
              <Input
                placeholder="Заавал байх шаардлагагүй"
                radius="large"
                backgroundRole="light"
                size={Platform.OS === 'ios' ? [4, 0, 4, 4] : [2, 0, 2, 4]}
                role="info"
                onChangeText={text => {
                  setNewInfo({ ...newInfo, nickname: text });
                }}
              />
            </Stack>
            <Stack size={1}>
              <Button
                rightIcon={<GenderMaleIcon color={isMaleCliked && '#1E319D'} />}
                backgroundRole="light"
                borderRole={isMaleCliked ? 'info' : 'light'}
                onPress={() => {
                  setMaleClicked(!isMaleCliked);
                  setNewInfo({ ...newInfo, sex: 'Male' });
                }}>
                Эрэгтэй
              </Button>
              <Button
                rightIcon={
                  <GenderFemaleIcon color={!isMaleCliked && '#FF80B0'} />
                }
                backgroundRole="light"
                borderRole={!isMaleCliked ? 'info' : 'light'}
                onPress={() => {
                  setMaleClicked(!isMaleCliked);
                  setNewInfo({ ...newInfo, sex: 'Female' });
                }}>
                Эмэгтэй
              </Button>
            </Stack>
            <Picker data={newInfo} setData={setNewInfo} />
            <Queue justifyContent="space-between">
              <Stack size={2}>
                <Text type="secondaryBody1" role="tertiary">
                  Өндөр / см
                </Text>
                <Input
                  width={120}
                  radius="xlarge"
                  backgroundRole="light"
                  size={Platform.OS === 'ios' ? [4, 0, 4, 4] : [2, 0, 2, 4]}
                  role="info"
                  keyboardType="numeric"
                  onChangeText={text => {
                    setNewInfo({ ...newInfo, height: parseInt(text) });
                  }}
                />
              </Stack>
              <Stack size={2}>
                <Text type="secondaryBody1" role="tertiary">
                  Жин / кг
                </Text>
                <Input
                  width={120}
                  radius="xlarge"
                  backgroundRole="light"
                  size={Platform.OS === 'ios' ? [4, 0, 4, 4] : [2, 0, 2, 4]}
                  role="info"
                  keyboardType="numeric"
                  onChangeText={text => {
                    setNewInfo({ ...newInfo, weight: parseInt(text) });
                  }}
                />
              </Stack>
            </Queue>
            <Button
              backgroundRole="success"
              radius="xlarge"
              size={[4, 7, 4, 7]}
              textRole="light"
              onPress={save}>
              Бүртгэх
            </Button>
          </Stack>
          {isDone && <SuccessPopUp />}
        </Margin>
      </ScrollView>
    </SafeAreaView>
  );
};
