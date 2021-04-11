import React, { useContext, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Route,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import {
  Button,
  Margin,
  Padding,
  Queue,
  Spacer,
  Stack,
  Text,
} from '../../index';
import { Header } from '../../header';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Border, Input, MaskedInput } from '../../core';
import { DropDown } from '../../dropdown';
import { CatalogContext } from '../category/categoryProvider';
import _ from 'lodash';
import { AddImageIcon } from '../../../assets';
import { SuccessPopUp } from '../../pop-up';
import { useFirestoreCollection } from '../../../firebase';
import { USERS_HOME, useUserUID } from '../../../authentication';
import { NavigationRoutes } from '../../navigation/navigation-param';
import { delay } from '../../../utils';
const MemoryLog = () => {
  const articles = [
    'Шинэ зүйл сурлаа',
    'Хөгжилтэй агшин',
    'Хөөрхөн шүү',
    'Ээжтэйгээ',
    'Ганганаа',
  ];
  const [selectedArticles, setSelectedArticles] = useState(['']);
  const isSelected = name => _.indexOf(selectedArticles, name) > -1;
  const addArticle = newArticle => {
    if (isSelected(newArticle)) {
      setSelectedArticles(_.without(selectedArticles, newArticle));
      return;
    }
    setSelectedArticles(_.uniq([...selectedArticles, newArticle]));
  };
  return (
    <Stack size={5}>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-around',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        {articles.map(article => {
          const selected = isSelected(article);
          return (
            <Margin size={[2, 0, 2, 0]}>
              <Border
                role={selected ? 'success' : 'info'}
                lineWidth="thick"
                radius="xlarge">
                <Button
                  size={[1, 2, 1, 2]}
                  onPress={() => {
                    addArticle(article);
                  }}>
                  {article}
                </Button>
              </Border>
            </Margin>
          );
        })}
      </View>
      <Button
        radius="xlarge"
        backgroundRole="light"
        leftIcon={<AddImageIcon />}>
        Зураг оруулах
      </Button>
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
        />
      </Stack>
      <Button
        backgroundRole="success"
        radius="xlarge"
        size={[4, 7, 4, 7]}
        textRole="light">
        Бүртгэх
      </Button>
    </Stack>
  );
};
const RoutineLog = ({ name }) => {
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
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedMeasurement(type);
                        }}>
                        <Text role="tertiary">{type}</Text>
                      </TouchableOpacity>
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
const TimePicker = ({ time, setTime }) => {
  const [startTime, setStartTime] = useState('AM');
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
          <TouchableOpacity
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
          </TouchableOpacity>
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
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedName(item.name);
                    }}>
                    <Text role="tertiary">{item.name}</Text>
                  </TouchableOpacity>
                </Padding>
              </Border>
            );
          })}
        </Stack>
      </DropDown.Content>
    </DropDown.Provider>
  );
};
const DailyScreen = () => {
  const router = useRoute<Route<string, any>>();
  const { name } = router?.params || {};
  const [isRoutineClicked, setRoutineClicked] = useState(true);
  const [isMemoryClicked, setMemoryClicked] = useState(false);
  return (
    <SafeAreaView>
      <Header withBack={true} headerText="Өдөр тутмын бүртгэл" />
      <Margin size={[5, 5, 5, 5]}>
        <Stack size={5}>
          <Queue justifyContent="space-between">
            <TouchableOpacity
              onPress={() => {
                setRoutineClicked(!isRoutineClicked);
                setMemoryClicked(isRoutineClicked);
              }}>
              <Border
                radius="large"
                backgroundRole={isRoutineClicked ? 'info' : 'light'}>
                <Padding size={[4, 4, 4, 4]}>
                  <Text
                    type="primaryBody1"
                    role={isRoutineClicked ? 'light' : 'info'}>
                    Үйлдэл бүртгэх
                  </Text>
                </Padding>
              </Border>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setMemoryClicked(!isMemoryClicked);
                setRoutineClicked(isMemoryClicked);
              }}>
              <Border
                radius="large"
                backgroundRole={isMemoryClicked ? 'info' : 'light'}>
                <Padding size={[4, 4, 4, 4]}>
                  <Text
                    type="primaryBody1"
                    role={isMemoryClicked ? 'light' : 'info'}>
                    Дурсамж бүртгэх
                  </Text>
                </Padding>
              </Border>
            </TouchableOpacity>
          </Queue>
          <ScrollView>
            <KeyboardAvoidingView>
              {isMemoryClicked && <MemoryLog />}
              {isRoutineClicked && <RoutineLog name={name} />}
            </KeyboardAvoidingView>
          </ScrollView>
        </Stack>
      </Margin>
    </SafeAreaView>
  );
};

export default DailyScreen;
