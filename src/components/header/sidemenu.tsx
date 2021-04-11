import { useNavigation } from '@react-navigation/core';
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
import { AnimatedFadeInView } from '../animated';
import { Border, Text } from '../core';
import { Overlay, Padding, Stack } from '../layout';
import { NavigationRoutes } from '../navigation/navigation-param';
const SideMenuItems = ({ text, icon, navigate }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(NavigationRoutes[navigate]);
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
            navigate={'NewsScreen'}
          />
          <SideMenuItems
            text="Мэдээлэл"
            icon={<NewsIcon />}
            navigate={'NewsScreen'}
          />
          <SideMenuItems
            text="Яаралтай тусламж"
            icon={<EmergencyIcon />}
            navigate={'NewsScreen'}
          />
          <SideMenuItems
            text="Дурсамж"
            icon={<MemoryIcon />}
            navigate={'NewsScreen'}
          />
          <SideMenuItems
            text="Хадгалсан"
            icon={<HeartIcon />}
            navigate={'NewsScreen'}
          />
        </Stack>
      </Overlay>
    </AnimatedFadeInView>
  );
};
