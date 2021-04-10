import React, { FC } from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { Queue } from '..';
import {
  EmergencyIcon,
  HeartIcon,
  MemoryIcon,
  NewsIcon,
  ProfileIcon,
} from '../../assets';
import { Border, Text } from '../core';
import { Overlay, Padding, Stack } from '../layout';
const SideMenuItems = ({ text, icon }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('asd');
      }}>
      <Border bottomWidth="xlight" role="primary">
        <Padding size={[3, 3, 3, 2]}>
          <Queue size={6} justifyContent="flex-start" alignItems="center">
            {icon}
            <Text textAlign="center" role="light">
              {text}
            </Text>
          </Queue>
        </Padding>
      </Border>
    </TouchableOpacity>
  );
};
export const SideMenu: FC = () => {
  return (
    <Overlay
      width={useWindowDimensions().width / 2}
      height={useWindowDimensions().height}
      zIndex={99}
      top={8}
      right={0}
      role="info">
      <Stack size={3}>
        <SideMenuItems text="Профайл" icon={<ProfileIcon />} />
        <SideMenuItems text="Мэдээлэл" icon={<NewsIcon />} />
        <SideMenuItems text="Яаралтай тусламж" icon={<EmergencyIcon />} />
        <SideMenuItems text="Дурсамж" icon={<MemoryIcon />} />
        <SideMenuItems text="Хадгалсан" icon={<HeartIcon />} />
      </Stack>
    </Overlay>
  );
};
