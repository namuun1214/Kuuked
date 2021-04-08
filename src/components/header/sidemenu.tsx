import React, { FC } from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Queue } from '..';
import { Border, Text } from '../core';
import { Overlay, Padding, Stack } from '../layout';
import { SafeAreaScreen } from '../screen';
import { Header } from './header';
const SideMenuItems = ({ text }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('asd');
      }}>
      <Padding size={[4, 3, 2, 2]}>
        <Queue justifyContent="flex-start">
          <Padding size={[3]}>
            <Text textAlign="center" role="light">
              {text}
            </Text>
          </Padding>
        </Queue>
      </Padding>
    </TouchableOpacity>
  );
};
export const SideMenu: FC = () => {
  return (
    <SafeAreaView>
      <Header withBack={true} headerText={null} />
      <Overlay
        width={useWindowDimensions().width / 2}
        height={useWindowDimensions().height}
        top={8}
        right={0}
        role="info">
        <Stack size={3}>
          <SideMenuItems text="Профайл" />
          <SideMenuItems text="Мэдээлэл" />
          <SideMenuItems text="Яаралтай тусламж" />
          <SideMenuItems text="Дурсамж" />
          <SideMenuItems text="Хадгалсан" />
        </Stack>
      </Overlay>
    </SafeAreaView>
  );
};
