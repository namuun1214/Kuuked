import { useNavigation } from '@react-navigation/core';
import React, { FC } from 'react';
import { Pressable, useWindowDimensions } from 'react-native';
import { Queue } from '..';
import {
  ChartIcon,
  ChatIcon,
  EmergencyIcon,
  HeartIcon,
  MemoryIcon,
  NewsIcon,
  ProfileIcon,
} from '../../assets';
import { AnimatedFadeInView } from '../animated';
import { Border, Text } from '../core';
import { Overlay, Padding, Stack } from '../layout';
import { NavigationRoutes } from '../navigation/navigation-param';
const SideMenuItems = ({ text, icon, navigate }) => {
  const navigation = useNavigation();
  const isSaved = true;
  return (
    <Pressable
      onPress={() => {
        navigate === 'SavedScreen'
          ? navigation.navigate(NavigationRoutes.NewsScreen, { isSaved })
          : navigation.navigate(NavigationRoutes[navigate]);
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
    </Pressable>
  );
};
export const SideMenu: FC = () => {
  return (
    <AnimatedFadeInView visible={true}>
      <Overlay
        width={useWindowDimensions().width / 2}
        height={useWindowDimensions().height}
        zIndex={99}
        right={0}
        role="info">
        <Stack size={3}>
          <SideMenuItems
            text="Профайл"
            icon={<ProfileIcon />}
            navigate={'BabyInfoScreen'}
          />
          <SideMenuItems
            text="Мэдээлэл"
            icon={<NewsIcon />}
            navigate={'NewsScreen'}
          />
          <SideMenuItems
            text="Яаралтай тусламж"
            icon={<EmergencyIcon />}
            navigate={'EmergencyListScreen'}
          />
          <SideMenuItems
            text="Дурсамж"
            icon={<MemoryIcon />}
            navigate={'MemoryListScreen'}
          />
          <SideMenuItems
            text="Хадгалсан"
            icon={<HeartIcon />}
            navigate={'SavedScreen'}
          />
          <SideMenuItems
            text="Үр дүн"
            icon={<ChartIcon />}
            navigate={'NewsScreen'}
          />
        </Stack>
      </Overlay>
    </AnimatedFadeInView>
  );
};
