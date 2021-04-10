import React, { useContext, useState } from 'react';
import { Route, SafeAreaView } from 'react-native';
import {
  Button,
  Center,
  Margin,
  Padding,
  Queue,
  Stack,
  Text,
} from '../../index';
import { Header } from '../../header';
import { useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Border } from '../../core';
import { DropDown } from '../../dropdown';
import { CatalogContext } from '../category/categoryProvider';
export const TimePicker = () => {
  return (
    <Queue size={5} justifyContent="space-between" alignItems="center">
      <DropDown.Provider>
        <DropDown.Trigger width={90}>12</DropDown.Trigger>
        <DropDown.Content width={90}>
          <Stack size={4}>
            <Border bottomWidth="xlight" role="secondary">
              <TouchableOpacity
                onPress={() => {
                  // setSelectedName(item.name);
                }}>
                <Text>1</Text>
              </TouchableOpacity>
            </Border>
          </Stack>
        </DropDown.Content>
      </DropDown.Provider>
      <DropDown.Provider>
        <DropDown.Trigger width={90}>34</DropDown.Trigger>
        <DropDown.Content width={90}>
          <Stack size={4}>
            <Border bottomWidth="xlight" role="secondary">
              <TouchableOpacity
                onPress={() => {
                  // setSelectedName(item.name);
                }}>
                <Text>1</Text>
              </TouchableOpacity>
            </Border>
          </Stack>
        </DropDown.Content>
      </DropDown.Provider>
      <DropDown.Provider>
        <DropDown.Trigger width={90}>AM</DropDown.Trigger>
        <DropDown.Content width={90}>
          <Stack size={4}>
            <Border bottomWidth="xlight" role="secondary">
              <TouchableOpacity
                onPress={() => {
                  // setSelectedName(item.name);
                }}>
                <Text>PM</Text>
              </TouchableOpacity>
            </Border>
          </Stack>
        </DropDown.Content>
      </DropDown.Provider>
    </Queue>
  );
};
const DailyScreen = () => {
  const router = useRoute<Route<string, any>>();
  const { name } = router?.params || {};
  const [isRoutineClicked, setRoutineClicked] = useState(true);
  const [isMemoryClicked, setMemoryClicked] = useState(false);
  const { catalog: categoryData } = useContext(CatalogContext);
  const [selectedName, setSelectedName] = useState(name);
  return (
    <SafeAreaView>
      <Header withBack={true} headerText="Өдөр тутмын бүртгэл" />
      <Margin size={[5, 3, 4, 3]}>
        <Stack size={5}>
          <Queue justifyContent="space-around">
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
          <Center>
            <DropDown.Provider>
              <DropDown.Trigger width={330}>{selectedName}</DropDown.Trigger>
              <DropDown.Content width={330}>
                <Stack size={4}>
                  {categoryData.map(item => {
                    return (
                      <Border bottomWidth="xlight" role="secondary">
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedName(item.name);
                          }}>
                          <Text>{item.name}</Text>
                        </TouchableOpacity>
                      </Border>
                    );
                  })}
                </Stack>
              </DropDown.Content>
            </DropDown.Provider>
            <Text> Эхэлсэн цаг</Text>
            <TimePicker />
            <Button
              backgroundRole="success"
              radius="xlarge"
              size={[4, 7, 4, 7]}
              textRole="light">
              Болсон
            </Button>
          </Center>
        </Stack>
      </Margin>
    </SafeAreaView>
  );
};

export default DailyScreen;
