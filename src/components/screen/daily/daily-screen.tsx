import React, { useContext, useState } from 'react';
import { Route, SafeAreaView } from 'react-native';
import { KuukedLogo } from '../../../assets';
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
import {
  CategoryContext,
  CategoryProvider,
} from '../category/categoryProvider';
const DailyScreen = () => {
  const router = useRoute<Route<string, any>>();
  const { name } = router?.params || {};
  const [isRoutineClicked, setRoutineClicked] = useState(true);
  const [isMemoryClicked, setMemoryClicked] = useState(false);
  const { categoryList } = useContext(CategoryContext);
  console.log(categoryList, 'hahoho');
  return (
    <SafeAreaView>
      <Header withBack={true} headerText="Өдөр тутмын бүртгэл" />
      <Margin size={[5, 3, 4, 3]}>
        <Stack size={3}>
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
              <DropDown.Trigger width={340}>{name}</DropDown.Trigger>
              <DropDown.Content width={340}>
                {categoryList.map(item => {
                  return <Button>{item}</Button>;
                })}
              </DropDown.Content>
            </DropDown.Provider>
            {/* <Button
              backgroundRole="success"
              radius="xlarge"
              size={[4, 7, 4, 7]}
              textRole="light">
              Болсон
            </Button> */}
          </Center>
        </Stack>
      </Margin>
    </SafeAreaView>
  );
};

export default DailyScreen;
