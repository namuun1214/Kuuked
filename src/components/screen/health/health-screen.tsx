import React, { useState } from 'react';
import { Pressable, Route, SafeAreaView, ScrollView } from 'react-native';
import { Margin, Padding, Queue, Stack, Text } from '../../index';
import { Header } from '../../header';
import { useRoute } from '@react-navigation/native';
import { Border } from '../../core';
import _ from 'lodash';
import { SymptomLog } from './symptom-log';
import { SurgeryLog } from './surgery-log';
const HealthScreen = () => {
  const [isSurgeryClicked, setSurgeryClicked] = useState(true);
  const [isSymptomClicked, setSymptomClicked] = useState(false);
  return (
    <SafeAreaView>
      <Header withBack={true} headerText="Өдөр тутмын бүртгэл" />
      <Margin size={[5, 5, 5, 5]}>
        <Stack size={5}>
          <Queue justifyContent="space-between">
            <Pressable
              onPress={() => {
                setSurgeryClicked(!isSurgeryClicked);
                setSymptomClicked(isSurgeryClicked);
              }}>
              <Border
                radius="large"
                backgroundRole={isSurgeryClicked ? 'info' : 'light'}>
                <Padding size={[4, 4, 4, 4]}>
                  <Text
                    type="primaryBody1"
                    role={isSurgeryClicked ? 'light' : 'info'}>
                    Шинэ үзлэг
                  </Text>
                </Padding>
              </Border>
            </Pressable>
            <Pressable
              onPress={() => {
                setSymptomClicked(!isSymptomClicked);
                setSurgeryClicked(isSymptomClicked);
              }}>
              <Border
                radius="large"
                backgroundRole={isSymptomClicked ? 'info' : 'light'}>
                <Padding size={[4, 4, 4, 4]}>
                  <Text
                    type="primaryBody1"
                    role={isSymptomClicked ? 'light' : 'info'}>
                    Шинж тэмдэг
                  </Text>
                </Padding>
              </Border>
            </Pressable>
          </Queue>
          <Padding bottom={11}>
            <ScrollView>
              {isSymptomClicked && <SymptomLog />}
              {isSurgeryClicked && <SurgeryLog />}
            </ScrollView>
          </Padding>
        </Stack>
      </Margin>
    </SafeAreaView>
  );
};

export default HealthScreen;
