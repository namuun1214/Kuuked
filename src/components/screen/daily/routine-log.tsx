import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Platform, Pressable, View } from 'react-native';
import {
  Border,
  Button,
  DropDown,
  Input,
  Margin,
  MaskedInput,
  Padding,
  Queue,
  Spacer,
  Stack,
  SuccessPopUp,
  Text,
} from '../..';
import { useUserUID, USERS_HOME } from '../../../authentication';
import { useFirestoreCollection } from '../../../firebase';
import { delay } from '../../../utils';
import { NavigationRoutes } from '../../navigation/navigation-param';
import { CatalogContext } from '../category/categoryProvider';

const TimePicker = ({ time, setTime }) => {
  return (
    <Queue size={5} justifyContent="space-between" alignItems="center">
      <Queue justifyContent="space-between" alignItems="center">
        <MaskedInput
          width={20}
          radius="large"
          backgroundRole="light"
          size={Platform.OS === 'ios' ? [3, 6, 3, 6] : [2, 0, 2, 4]}
          role="info"
          mask="00"
          keyboardType="numeric"
          onChangeText={value => {
            setTime({ ...time, hour: value });
          }}
        />
        <Margin size={[0, 0, 0, 5]}>
          <Text type="secondaryBody1" role="tertiary">
            :
          </Text>
        </Margin>
      </Queue>
      <MaskedInput
        width={20}
        radius="large"
        backgroundRole="light"
        size={Platform.OS === 'ios' ? [3, 6, 3, 6] : [2, 0, 2, 4]}
        role="info"
        mask="00"
        keyboardType="numeric"
        onChangeText={value => {
          setTime({ ...time, minute: value });
        }}
      />

      <DropDown.Provider>
        <DropDown.Trigger width={90}>{time.am ? 'AM' : 'PM'}</DropDown.Trigger>
        <DropDown.Content width={90}>
          <Pressable
            onPress={() => {
              time.am === true
                ? setTime({ ...time, am: false })
                : setTime({ ...time, am: true });
            }}>
            {time.am === true ? (
              <Text role="tertiary">PM</Text>
            ) : (
              <Text role="tertiary">AM</Text>
            )}
          </Pressable>
        </DropDown.Content>
      </DropDown.Provider>
    </Queue>
  );
};
const CategorySelect = ({ selectedName, setSelectedName }) => {
  const { catalog: categoryData } = useContext(CatalogContext);

  return (
    <DropDown.Provider>
      <DropDown.Trigger width={340}>{selectedName}</DropDown.Trigger>
      <DropDown.Content width={340}>
        <Stack size={4}>
          {categoryData.map(item => {
            return (
              <Border bottomWidth="xlight" role="secondary">
                <Padding size={[0, 2, 2, 2]}>
                  <Pressable
                    onPress={() => {
                      setSelectedName(item.name);
                    }}>
                    <Text role="tertiary">{item.name}</Text>
                  </Pressable>
                </Padding>
              </Border>
            );
          })}
        </Stack>
      </DropDown.Content>
    </DropDown.Provider>
  );
};
export const RoutineLog = ({ name }) => {
  const navigation = useNavigation();
  const uid = useUserUID();
  const { createRecord } = useFirestoreCollection([USERS_HOME, uid, 'routine']);
  const [newRoutine, setNewRoutine] = useState({
    catalog: '',
    startTime: {},
    endTime: {},
    size: '',
    measurement: '',
    note: '',
  });
  const [startTime, setStartTime] = useState({
    hour: '',
    minute: '',
    am: true,
  });
  const [endTime, setEndTime] = useState({
    hour: '',
    minute: '',
    am: true,
  });
  const [selectedName, setSelectedName] = useState(name);
  const measurementTypes = ['мл', 'гр'];
  const [selectedMeasurement, setSelectedMeasurement] = useState('мл');
  const [validateInput, setValidateInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDone, setDone] = useState(false);
  const saveRoutine = async () => {
    setNewRoutine({
      ...newRoutine,
      measurement: selectedMeasurement,
      catalog: selectedName,
      startTime: startTime,
      endTime: endTime,
    });
    if (newRoutine.catalog === '' || newRoutine.startTime === '') {
      setValidateInput(true);
      return;
    }
    setLoading(true);
    await createRecord(newRoutine);
    setLoading(false);
    setDone(true);
    await delay(1500);
    navigation.navigate(NavigationRoutes.Home);
  };
  return (
    <View style={{ flexDirection: 'column' }}>
      <CategorySelect
        selectedName={selectedName}
        setSelectedName={setSelectedName}
      />
      <Spacer horizontal={true} size={5} />
      <Stack size={2}>
        <Text type="secondaryBody1" role="tertiary">
          Эхэлсэн цаг
        </Text>
        <TimePicker time={startTime} setTime={setStartTime} />
      </Stack>
      <Spacer horizontal={true} size={5} />
      <Stack size={2}>
        <Text type="secondaryBody1" role="tertiary">
          Дууссан цаг
        </Text>
        <TimePicker time={endTime} setTime={setEndTime} />
      </Stack>
      <Spacer horizontal={true} size={5} />
      <Stack size={2}>
        <Text type="secondaryBody1" role="tertiary">
          Хэмжээ
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
              setNewRoutine({ ...newRoutine, size: text });
            }}
          />

          <DropDown.Provider>
            <DropDown.Trigger width={90}>
              {selectedMeasurement}
            </DropDown.Trigger>
            <DropDown.Content width={90}>
              <Stack size={4}>
                {measurementTypes.map(type => {
                  return (
                    <Border bottomWidth="xlight" role="secondary">
                      <Pressable
                        onPress={() => {
                          setSelectedMeasurement(type);
                        }}>
                        <Text role="tertiary">{type}</Text>
                      </Pressable>
                    </Border>
                  );
                })}
              </Stack>
            </DropDown.Content>
          </DropDown.Provider>
        </Queue>
      </Stack>
      <Spacer horizontal={true} size={5} />
      <Stack size={2}>
        <Text type="secondaryBody1" role="tertiary">
          Тэмдэглэл
        </Text>
        <Input
          height={80}
          multiline={true}
          radius="large"
          backgroundRole="light"
          size={Platform.OS === 'ios' ? [4, 0, 4, 4] : [2, 0, 2, 4]}
          role="info"
          onChangeText={text => {
            setNewRoutine({ ...newRoutine, note: text });
          }}
        />
      </Stack>
      <Spacer horizontal={true} size={5} />
      {validateInput && <Text role="error">Мэдээлэл дутуу байна</Text>}
      <Button
        backgroundRole="success"
        radius="xlarge"
        size={[4, 7, 4, 7]}
        textRole="light"
        onPress={saveRoutine}>
        Бүртгэх
      </Button>
      {isDone && <SuccessPopUp />}
    </View>
  );
};
