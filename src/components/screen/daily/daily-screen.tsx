import React, { useState } from 'react';
import { Pressable, Route, SafeAreaView, ScrollView } from 'react-native';
import { Margin, Padding, Queue, Stack, Text } from '../../index';
import { Header } from '../../header';
import { useRoute } from '@react-navigation/native';
import { Border } from '../../core';
import _ from 'lodash';
import { MemoryLog } from './memory-log';
import { RoutineLog } from './routine-log';

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
            <Pressable
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
            </Pressable>
            <Pressable
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
            </Pressable>
          </Queue>
          <Padding bottom={11}>
            <ScrollView>
              {isMemoryClicked && <MemoryLog />}
              {isRoutineClicked && <RoutineLog name={name} />}
            </ScrollView>
          </Padding>
        </Stack>
      </Margin>
    </SafeAreaView>
  );
};

export default DailyScreen;
