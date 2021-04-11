import React, { useContext, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
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
import { useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Border, Input, MaskedInput } from '../../core';
import { DropDown } from '../../dropdown';
import { CatalogContext } from '../category/categoryProvider';
import _ from 'lodash';
import { AddImageIcon } from '../../../assets';
import { Center } from '../../layout';
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
    console.log(isSelected(newArticle));
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
  const measurementTypes = ['мл', 'гр'];
  const [selectedMeasurement, setSelectedMeasurement] = useState('мл');
  return (
    <View style={{ flexDirection: 'column' }}>
      <CategorySelect name={name} />
      <Spacer horizontal={true} size={5} />
      <Stack size={2}>
        <Text type="secondaryBody1" role="tertiary">
          Эхэлсэн цаг
        </Text>
        <TimePicker />
      </Stack>
      <Spacer horizontal={true} size={5} />
      <Stack size={2}>
        <Text type="secondaryBody1" role="tertiary">
          Дууссан цаг
        </Text>
        <TimePicker />
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
        />
      </Stack>
      <Spacer horizontal={true} size={5} />
      <Button
        backgroundRole="success"
        radius="xlarge"
        size={[4, 7, 4, 7]}
        textRole="light">
        Бүртгэх
      </Button>
    </View>
  );
};
const TimePicker = () => {
  const [startTime, setStartTime] = useState('AM');
  return (
    <Queue size={5} justifyContent="space-between" alignItems="center">
      <Queue justifyContent="space-between" alignItems="center">
        <MaskedInput
          width={15}
          radius="large"
          backgroundRole="light"
          size={Platform.OS === 'ios' ? [3, 6, 3, 6] : [2, 0, 2, 4]}
          role="info"
          mask="00"
          keyboardType="numeric"
        />
        <Margin size={[0, 0, 0, 5]}>
          <Text type="secondaryBody1" role="tertiary">
            :
          </Text>
        </Margin>
      </Queue>
      <MaskedInput
        width={15}
        radius="large"
        backgroundRole="light"
        size={Platform.OS === 'ios' ? [3, 6, 3, 6] : [2, 0, 2, 4]}
        role="info"
        mask="00"
        keyboardType="numeric"
      />

      <DropDown.Provider>
        <DropDown.Trigger width={90}>{startTime}</DropDown.Trigger>
        <DropDown.Content width={90}>
          <TouchableOpacity
            onPress={() => {
              startTime === 'AM' ? setStartTime('PM') : setStartTime('AM');
            }}>
            {startTime === 'AM' ? (
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
const CategorySelect = ({ name }) => {
  const { catalog: categoryData } = useContext(CatalogContext);
  const [selectedName, setSelectedName] = useState(name);
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
